class Gadget {
    constructor(offset, height, name) {
        this.inputList = [];
        this.outputList = [];
        this.items = [];
        this.offset = offset/2;
        this.height = height;
        this.name = name;

        this.wiring_mode = false;
        this.wires = [];

        this.create_item_mode = false;

        this.setupDefaultSetup();
    }
    
    setupDefaultSetup() {
        this.inputList.push(new Input(this.offset, 200));
        this.items.push(this.inputList[0]);
        this.inputList.push(new Input(this.offset, 600));
        this.items.push(this.inputList[1]); 

        this.outputList.push(new Output(width - this.offset, 400));
        this.items.push(this.outputList[0]);
    }

    checkItemClick(mx, my) {
        // actives when wring_mode is on
        for (let item of this.items) {
            if (this.item_clicked(item, mx, my)) {
                if (!this.wiring_mode) {
                    this.createWire(mx, my); 
                }                
            }
        }
    }

    item_clicked(item, mx, my) {
        const d = dist(mx, my, item.x, item.y);
        return d < item.size / 2;
    }

    createWire(mx, my) {
        this.wire_start = createVector(mx, my); 
        this.wiring_mode = true;        
    }

    checkInputClick(mx, my) {
        for (let i = 0; i < this.inputList.length; i++) {
            if (this.inputList[i].clicked(mx, my)) {
                this.createWire(mx, my); 
            }
        }
    }

    checkInputClick(mx, my) {
        for (let i = 0; i < this.inputList.length; i++) {
            if (this.inputList[i].clicked(mx, my)) {
                this.inputList[i].toggle(); 
            }
        }
    }

    renderWire(start, end) {
        stroke(0, 0, 0);
        line(start.x, start.y, end.x, end.y);
    }

    addItem(item) { 
        this.create_item_mode = true;
    }

    renderPotentialAnd(pos) {
        fill(255, 255, 0);
        circle(pos.x, pos.y, 30);
    }

    run() {
        // input loop 
        for (let i = 0; i < this.inputList.length; i++) {
            this.inputList[i].render();
        }
        // output loop
        for (let i = 0; i < this.outputList.length; i++) {
            this.outputList[i].render();
        }
        // wire logic
        if (this.wiring_mode) {
            this.renderWire(this.wire_start, createVector(mouseX, mouseY));   
        }

        // item loop
        if (this.create_item_mode) {
            if (mouseX > this.offset && mouseX < width - this.offset && mouseY > this.offset && mouseY < height - this.height - 2*this.offset) {
                this.renderPotentialAnd(createVector(mouseX, mouseY));
            }
        }
    }
}

class Input {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.state = false;
        this.color_on = color(0, 255, 0);
        this.color_off = color(255, 0, 0);
    }
    
    clicked(mx, my) {
        const d = dist(mx, my, this.x, this.y);
        return d < this.size / 2;
    }

    toggle() {
        this.state = !this.state;
    }

    render() {
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);
    }
}

class Output {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.state = false;
        this.color_on = color(0, 255, 0);
        this.color_off = color(255, 0, 0);
    }

    render() {
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);
    }
}

class andGate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.color = color(255, 255, 0);
    };

    render() {
        fill(this.color);
        circle(this.x, this.y, this.size);
    };
}