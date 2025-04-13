class Output {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.state = false;
        this.name = "output";
        this.color_on = color(0, 255, 0);
        this.color_off = color(255, 0, 0);
        this.state = false;
        this.inputList = [];
    }
    
    update(){
        if (this.inputList.length == 1) {
            if (this.inputList[0].state) {
                this.state = true;
            }else {
                this.state = false;
            }
        }
    }

    addInput(input) {
        if (this.inputList.length == 1) {
            console.log("Max inputs reached");
            return;
        }

        console.log("Input added to output: " + input.name);
        this.inputList.push(input);
    }


    render() {
        stroke(0, 0, 0);
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);
    }
}

