class CustomGadget{
    constructor(x, y, name, rule){
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = color(random(255), random(255), random(255));
        this.name = name;
        this.rule = rule;
        this.state = false;
        this.inputList = [];
        this.outputs = [];
    }

    addInput(input) {
        // change this in the future to allow more than 2 inputs
        if (this.inputList.length == 2) {
            console.log("Max inputs reached");
            return;
        }
        
        this.inputList.push(input);
    }

    addOutput(wire) {
        this.outputs.push(wire);
    }

    evaluateRule() {
        if (this.inputList.length != 2) {
            return;
        }

        // replace 0 and 1 with true and false
        let input0 = this.inputList[0].state == 1 ? true : false;
        let input1 = this.inputList[1].state == 1 ? true : false;   
        
        // replace this.rule input0 and input1 with the actual values
        let rule = this.rule.replace(/input0/g, input0).replace(/input1/g, input1);

        // Recursively evaluate the expression
        function parse(expr) {
            // Evaluate NOT
            expr = expr.replace(/NOT/g, (_, inner) => {
                return !parse(inner);
            });

            // Evaluate AND
            expr = expr.replace(/AND/g, (_, inner) => {
                const parts = splitArgs(inner);
                return parts.every(parse);
            });

            // Base case: just return the boolean
            if (expr.trim() === 'true') return true;
            if (expr.trim() === 'false') return false;

            throw new Error("Invalid expression: " + expr);
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

        let res = parse(rule);
        console.log("Rule: " + rule);
        console.log("Result: " + res);
    }

    update(){
        this.evaluateRule();
    }



    render() {
        stroke(0, 0, 0);
        fill(this.color);
        circle(this.x, this.y, this.size);
        // add the name to the center of the circle
        fill(0, 0, 0);
        textSize(12);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    }
}

