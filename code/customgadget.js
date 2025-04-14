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

    evaluateGlobalRule() {
        if (this.inputList.length != 2) {
            return;
        }

        let input0 = this.inputList[0].state;
        let input1 = this.inputList[1].state;

        this.evaluateLocalRule([input0, input1], this.rule);
    }

    evaluateLocalRule(inputs, rule) {
        let name = rule.slice(0, 3);
        let value = rule.slice(4, rule.length-1);
        let inner_inputs = value.split(",");

        let count = (rule.match(/\[/g) || []).length;
        
        // console.log("rule: " + rule);
        // console.log("name: " + name);
        // console.log("value: " + value);
        // console.log("inner_inputs: " + inner_inputs);
        // console.log("Count: " + count);
        
        
    }

    update(){
        this.evaluateGlobalRule();
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

