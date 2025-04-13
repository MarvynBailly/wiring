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
                this.wire_logic(item);
            }
        }
    }
    
    wire_logic(item) {        
        if (!this.wiring_mode) {
            console.log("Wiring mode active with item " + item.name);

            this.wiring_mode = true;
            this.wire_start = item;   
        }
        else{
            let wire = new Wire(this.wire_start, item)
            
            this.wires.push(wire);


            item.addInput(wire);
                        
            this.wiring_mode = false;
            sim.wiring_mode = false;
        }
    }

    item_clicked(item, mx, my) {
        const d = dist(mx, my, item.x, item.y);
        return d < item.size / 2;
    }

    renderWire(start, end) {
        stroke(0, 0, 0);
        line(start.x, start.y, end.x, end.y);
    }

    toggleInputs(mx, my) {
        for (let item of this.inputList) {
            if (item.clicked(mx, my)) {
                item.toggle();
            }
        }
    }

    renderPotentialAnd(pos) {
        fill(255, 255, 0);
        circle(pos.x, pos.y, 30);
    }

    placeAnd(mx, my) { 
        this.items.push(new andGate(mx, my));
        this.create_item_mode = false;
        sim.create_item_mode = false;
    }

    run() {
        // wire loop
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i].render();
        }
        
        
        // render loop
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].render();

            // update and gates
            if (this.items[i].name == "and") {
                this.items[i].update();
            }
        }

        // wire logic
        if (this.wiring_mode) {
            this.renderWire(this.wire_start, createVector(mouseX, mouseY));   
        }
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i].update();
        }
        
        // create item loop
        if (sim.create_item_mode) {
            if (mouseX > this.offset && mouseX < width - this.offset && mouseY > this.offset && mouseY < height - this.height - 2*this.offset) {
                this.create_item_mode = true;
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
        this.name = "input";
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
        stroke(0, 0, 0);
        fill(this.state ? this.color_on : this.color_off);
        circle(this.x, this.y, this.size);
    }
}

