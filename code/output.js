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

        this.input_hover = false;
    }
    
    update(){
        this.checkHover();

        if (this.inputList.length == 1) {
            if (this.inputList[0].state) {
                this.state = true;
            }else {
                this.state = false;
            }
        }
    }
    
    checkHover(){
        // inputs loop
        let h = this.size;
        let xOffset = this.x - this.size;
        let yOffset = this.y - this.size / 2;
        // rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
        let input_rect_top_left_x =  xOffset;
        let input_rect_top_left_y =  yOffset + h/2 - this.size/8;
        if (mouseX > input_rect_top_left_x && mouseX < input_rect_top_left_x + this.size / 2 && mouseY > input_rect_top_left_y && mouseY < input_rect_top_left_y + this.size / 4) {
            // return i;
            this.input_hover = true;
        }else {
            this.input_hover = false;
        }
    }


    checkInput(mx, my) {
        return this.input_hover;
    }

    checkOutput(mx, my) {
        return false;
    }

    getActiveCoords() {
        if (this.input_hover) {
            let xOffset = this.x - this.size;
            let yOffset = this.y - this.size / 2;
            return createVector(xOffset, yOffset + this.size / 2);
        }
        return null;
    }

    checkToggle(mx, my) { 
        return this.input_hover; 
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

        const h = this.size;

        let xOffset = this.x - this.size;
        let yOffset = this.y - this.size / 2;


        if (this.input_hover) {
            fill(255, 0, 0);
        }
        else {
            fill(200, 200, 200);
        }
        rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
    }
}

