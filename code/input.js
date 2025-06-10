
class Input {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.state = false;
        this.name = "input";
        this.id = id;
        this.color_on = color(0, 255, 0);
        this.color_off = color(255, 0, 0);
        this.outputs = [];

        this.output_hover = false; 
    }
    
    getActiveHoverId(){
        // check the outputs
        if (this.output_hover) {
            return 0;
        }

        return null; // no active input or output
    }    

    clicked(mx, my) {
        const d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }

    toggle() {
        this.state = !this.state;
    }
    
    addOutput(wire) {
        this.outputs.push(wire);
    }

    checkHover(){
        // output loop
        const h = this.size;
        let xOffset = this.x + this.size / 2;
        let yOffset = this.y - this.size / 2;

        let output_rect_top_left_x =  xOffset;
        let output_rect_top_left_y =  yOffset + h/2 - this.size/8;

        if (mouseX > output_rect_top_left_x && mouseX < output_rect_top_left_x + this.size / 2 && mouseY > output_rect_top_left_y && mouseY < output_rect_top_left_y + this.size / 4) {
            this.output_hover = true;
        } else {
            this.output_hover = false;
        }
    }

    getActiveCoords() {
        if (this.output_hover) {
            let xOffset = this.x + this.size;
            let yOffset = this.y - this.size / 2;
            return createVector(xOffset, yOffset + this.size / 2);
        }
        return null;
    }

    checkToggle(mx, my) { 
        return false; 
    }

    checkInput(mx, my) {
        return false;
    }

    checkOutput(mx, my) {
        return this.output_hover;
    }

    update() { 
        this.checkHover()
    }

    render() {
        stroke(0, 0, 0);
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);

        let h = this.size;

        let xOffset = this.x + this.size / 2;
        let yOffset = this.y - this.size / 2;
        if (this.output_hover) {
            fill(255, 0, 0);
        }
        else {
            fill(200, 200, 200);
        }

        rect(xOffset,yOffset + h/2 - this.size/8, this.size / 2, this.size / 4);
    }
}