class notGate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = color(255, 255, 255);
        this.name = "not";
        this.state = false;
        this.inputList = [];
        this.outputs = [];
    }


    addInput(input) {
        if (this.inputList.length == 1) {
            console.log("Max inputs reached");
            return;
        }
        this.inputList.push(input);
    }

    addOutput(wire) {
        this.outputs.push(wire);
    }

    update(){
        if (this.inputList.length == 1) {
            if (!this.inputList[0].state) {
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
        // add the name to the center of the circle
        fill(0, 0, 0);
        textSize(16);
        textAlign(CENTER, CENTER);
        text(this.name, this.x, this.y);
    };
}