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

        this.gadget_array = [];

        this.create_item_mode = false;

        this.setupDefaultSetup();
    }
    
    setupDefaultSetup() {
        this.inputList.push(new Input(this.offset, 200, 0));
        this.items.push(this.inputList[0]);
        this.inputList.push(new Input(this.offset, 600, 1));
        this.items.push(this.inputList[1]); 

        this.outputList.push(new Output(width - this.offset, 400));
        this.items.push(this.outputList[0]);
    }

    checkWireStart(mx, my) {
        // actives when wring_mode is on
        for (let item of this.items) {
            if (this.item_clicked(item, mx, my)) {
                this.wire_logic(item);
            }
        }
    }
    
    wire_logic(item) {        
        if (!this.wiring_mode) {
            this.wiring_mode = true;
            this.wire_start = item;   
        }
        // create a wire between the two items
        else{
            let wire = new Wire(this.wire_start, item)
            
            this.wires.push(wire);

            item.addInput(wire);
            this.wire_start.addOutput(wire);
            
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

    renderPotentialItem(pos) {
        fill(255, 255, 0);
        circle(pos.x, pos.y, 30);
    }

    simplify(output, code){
        let guy_before = output.start
        let name_of_guy_before = guy_before.name;

        console.log("name_of_guy_before: " + name_of_guy_before);
        console.log("code: " + code);

        if (name_of_guy_before == "input") {
            console.log("input found: " );
            code = code.replace("_", "input" + guy_before.id);
            console.log("replaced code: " + code);
            
            return code;
        }

        if (name_of_guy_before == "not") {
            console.log("not found: " );
            code = code.replace("_", "NOT[_]");
        }

        if (name_of_guy_before == "and") {
            console.log("and found: " );
            code = code.replace("_", "AND[_,_]");
        }
        console.log("replaced code: " + code);

        for (let i = 0; i < guy_before.inputList.length; i++) {
            let input = output.start.inputList[i];
            code = this.simplify(input, code);
        }
        return code;
    }

    placeAnd(mx, my) { 
        this.items.push(new andGate(mx, my));
        this.create_item_mode = false;
        sim.create_item_mode = false;
    }

    placeNot(mx, my) { 
        this.items.push(new notGate(mx, my));
        this.create_item_mode = false;
        sim.create_item_mode = false;
    }

    run() {
        // wire loop
        for (let i = 0; i < this.wires.length; i++) {
            this.wires[i].render();
            this.wires[i].update();
        }
        
        // wire logic
        if (this.wiring_mode) {
            this.renderWire(this.wire_start, createVector(mouseX, mouseY));   
        }
        
        // render loop
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].render();

            // update and gates
            if (this.items[i].update != undefined) {
                this.items[i].update();
            }
        }

        
        // create item loop
        if (sim.create_item_mode) {
            if (mouseX > this.offset && mouseX < width - this.offset && mouseY > this.offset && mouseY < height - this.height - 2*this.offset) {
                this.create_item_mode = true;
                this.renderPotentialItem(createVector(mouseX, mouseY));
            }
        }

    }
}