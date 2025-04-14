
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


    render() {
        stroke(0, 0, 0);
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);
    }
}