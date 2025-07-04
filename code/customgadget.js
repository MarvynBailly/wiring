///////////////////////////
// Custom Gadget Class
// handles the logic for placing user defined gadgets
// the update function is called from gadget.js
///////////////////////////

class CustomGadget{
    constructor(x, y, rules, name){
        this.x = x;
        this.y = y;
        this.color = color(random(255), random(255), random(255));
        this.name = name;
        this.rules = [];
        this.states = [];
        this.inputList = [];
        this.outputs = [];
        
        this.numberOfOutputs = 0;
        this.numberOfInputs = 0;

        this.input_hover = [];
        this.output_hover = [];
        
        this.setupRules(rules);
        
        this.size = 40 + this.numberOfInputs * 3.5 + this.numberOfOutputs * 3.5;
        this.size = constrain(this.size, 40, 80);
    }

    addInput(input) {
        // change this in the future to allow more than 2 inputs
        if (this.inputList.length == this.numberOfInputs) {
            console.log("Max inputs reached");
            return;
        }
        
        this.inputList.push(input);
    }

    addOutput(wire) {
        this.outputs.push(wire);
    }

    getInputStates() {
        let states = [];
        for (let i = 0; i < this.inputList.length; i++) {
            states.push(this.inputList[i].state);
        }
        return states;
    }

    setupRules(rulesData) { 
        let rules = rulesData.substring(1, rulesData.length - 1).split(";");
        this.numberOfOutputs = rules.length;

        // count the number of inputs in the rules
        this.numberOfInputs = 0;
        for (let i = 0; i < rules.length; i++) {
            let rule = rules[i].trim();
            console.log("rule: " + rule);
            let input_name = "input" + this.numberOfInputs;
            while (rule.includes(input_name)) {
                this.numberOfInputs++;
                input_name = "input" + this.numberOfInputs;
            }
        }   
        for (let i = 0; i < this.numberOfInputs; i++) {
            this.input_hover.push(false);
        }


        console.log("Number of inputs: " + this.numberOfInputs);
        

        for (let i = 0; i < rules.length; i++) {
            this.rules.push(rules[i]);
            this.states.push(false);
            this.output_hover.push(false);
        }
    }
    
    evaluateRule() {
        if (this.inputList.length != this.numberOfInputs || this.outputs.length != this.numberOfOutputs) { 
            console.error("CustomGadget: Incorrect number of inputs or outputs. Inputs: " + this.inputList.length + ", Outputs: " + this.outputs.length);
            return;
        }

        // Recursively evaluate the expression
        function parse(expr) {
            // Evaluate NOT
            if (expr.startsWith('NOT')) {
                let inner = expr.slice(4, -1); // Remove NOT[ and ]
                return !parse(inner);
            }

            // Evaluate AND
            if (expr.startsWith('AND')) {
                let inner = expr.slice(4, -1); // Remove AND[ and ]
                let parts = splitArgs(inner);
                return parts.every(parse);
            }
            // Base case: just return the boolean
            if (expr.trim() === 'true') return true;
            if (expr.trim() === 'false') return false;
        }

        // Split arguments on comma, but respect nested brackets
        function splitArgs(s) {
            let args = [], depth = 0, current = '';
            for (let c of s) {
                if (c === '[') depth++;
                if (c === ']') depth--;
                if (c === ',' && depth === 0) {
                    args.push(current.trim());
                    current = '';
                } else {
                    current += c;
                }
            }
            if (current) args.push(current.trim());
            return args;
        }

        for (let i = 0; i < this.rules.length; i++) {
            // replace 0 and 1 with true and false
            let input0 = this.inputList[0].state == 1 ? true : false;
            let input1 = this.inputList[1].state == 1 ? true : false;   
            
            // replace this.rule input0 and input1 with the actual values
            let rule = this.rules[i].replace(/input0/g, input0).replace(/input1/g, input1);
            this.states[i] = parse(rule);
            // this.state = parse(rule);
        }
    }


    // check if the mouse is hovering over any of the inputs
    // loops over inputs and outputs and checks if the mouse is hovering over any of them
    // changes the *_hover array to be true if the mouse is hovering over the input or output
    checkHover(){
        // inputs loop
        let n = this.numberOfInputs;
        let h = this.size / (n);
        for (let i = 0; i < n; i++) {
            let xOffset = this.x - this.size;
            let yOffset = this.y - this.size / 2 + h * i;
            // rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
            let input_rect_top_left_x =  xOffset;
            let input_rect_top_left_y =  yOffset + h/2 - this.size/8;
            if (mouseX > input_rect_top_left_x && mouseX < input_rect_top_left_x + this.size / 2 && mouseY > input_rect_top_left_y && mouseY < input_rect_top_left_y + this.size / 4) {
                // return i;
                this.input_hover[i] = true;
            }else {
                this.input_hover[i] = false;
            }
        }

        // output loop
        n = this.numberOfOutputs;
        h = this.size / (n);
        for (let i = 0; i < n; i++) {
            let xOffset = this.x + this.size / 2;
            let yOffset = this.y - this.size / 2 + h * i;
            // rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
            // rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
            let output_rect_top_left_x =  xOffset;
            let output_rect_top_left_y =  yOffset + h/2 - this.size/8;
            if (mouseX > output_rect_top_left_x && mouseX < output_rect_top_left_x + this.size / 2 && mouseY > output_rect_top_left_y && mouseY < output_rect_top_left_y + this.size / 4) {
                // return i;
                this.output_hover[i] = true;
            } else {
                this.output_hover[i] = false;
            }
        }
    }

    // function to loop through the inputs and outputs and return the id of the active input or output
    getActiveHoverId(){
        // check the inputs first
        for (let i = 0; i < this.input_hover.length; i++) {
            if (this.input_hover[i]) {
                return i
            }
        }

        // check the outputs
        for (let i = 0; i < this.output_hover.length; i++) {
            if (this.output_hover[i]) {
                return i;
            }
        }

        return null; // no active input or output
    }    
    
    
    // check if the mouse is hovering over any of the inputs
    // returns true if the mouse is hovering over any of the inputs
    checkToggle(mx, my) { 
        if (this.checkInput(mx, my)){
            return true 
        }
    }
    
    checkInput(mx, my) {
        for (let input of this.input_hover) {
            if (input) {
                return true;
            }
        }
    }

    checkOutput(mx, my) {
        for (let output of this.output_hover) {
            if (output) {
                return true;
            }
        }
    }


    
    // function to get the active coords 
    // it will check for either the inputs or the outputs
    // returns the x,y coords of the left middle of the input box corresponding to the index of the active input
    // returns the x,y coords of the output if that is active
    getActiveCoords() {
        // check the inputs first
        for (let i = 0; i < this.input_hover.length; i++) {
            if (this.input_hover[i]) {
                let xOffset = this.x - this.size;
                let yOffset = this.y - this.size / 2 + (this.size / this.numberOfInputs) * i;
                return createVector(xOffset, yOffset + (this.size / this.numberOfInputs) / 2);
            }
        }

        for (let i = 0; i < this.output_hover.length; i++) {
            if (this.output_hover[i]) {
                let xOffset = this.x + this.size;
                let yOffset = this.y - this.size / 2 + (this.size / this.numberOfOutputs) * i;
                return createVector(xOffset, yOffset + (this.size / this.numberOfOutputs) / 2);
            }
        }

        return null;
    }




    update(){
        this.evaluateRule();
        this.checkHover();
    }


    // render the gadget, inputs, and outputs
    // we have that inputs and outputs are colored differently when the mouse is hovering over them
    // we should make this only happen when we are in wiring mode.
    render() {
        stroke(0, 0, 0);
        fill(this.color);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        // circle(this.x, this.y, this.size);
        fill(200, 200, 200);
        stroke(0, 0, 0);

        let n = this.numberOfOutputs;
        let h = this.size / (n);

        for (let i = 0; i < n; i++) {
            let xOffset = this.x + this.size / 2;
            let yOffset = this.y - this.size / 2 + h * i;
            if (this.output_hover[i]) {
                fill(255, 0, 0);
            }
            else {
                fill(200, 200, 200);
            }
            rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
        }

        n = this.numberOfInputs;
        h = this.size / (n);

        for (let i = 0; i < n; i++) {
            let xOffset = this.x - this.size;
            let yOffset = this.y - this.size / 2 + h * i;
            if (this.input_hover[i]) {
                fill(255, 0, 0);
            }
            else {
                fill(200, 200, 200);
            }
            rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
        }
        


        // rect(xOffset, yOffset + this.size/2, this.size / 2  , this.size / 4);
        // rect(xOffset, yOffset + this.size, this.size / 2  , this.size / 4);
        // rect(xOffset, yOffset + this.size/2, this.size / 2  , this.size / 4);



        fill(0, 0, 0);
        // add the name to the center
        textSize(12);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    }
}

