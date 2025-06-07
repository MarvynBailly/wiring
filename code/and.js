class andGate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = color(255, 255, 0);
        this.name = "and";
        this.state = false;
        
        this.inputList = [];
        this.outputs = [];

        this.numberOfOutputs = 1;
        this.numberOfInputs = 2;

        this.input_hover = [];
        this.output_hover = [];

    };

    addInput(input) {
        if (this.inputList.length == 2) {
            console.log("Max inputs reached");
            return;
        }
        
        this.inputList.push(input);
    }

    addOutput(wire) {
        this.outputs.push(wire);
    }

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
        this.checkHover();

        if (this.inputList.length == 2) {
            if (this.inputList[0].state && this.inputList[1].state) {
                this.state = true;
            }else {
                this.state = false;
            }
        }
    }


    render() {
        stroke(0, 0, 0);
        fill(this.color);
        circle(this.x, this.y, this.size);
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        
        // add the name to the center of the circle
        fill(0, 0, 0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);

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
    };
}