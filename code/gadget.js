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

        this.inputOffset = 40;

        this.setupDefaultSetup();
    }
    
    setupDefaultSetup() {
        this.inputList.push(new Input(this.offset, windowHeight/2-this.inputOffset, 0));
        this.items.push(this.inputList[0]);
        this.inputList.push(new Input(this.offset, windowHeight/2+this.inputOffset, 1));
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

        if (name_of_guy_before == "input") {
            code = code.replace("_", "input" + guy_before.id);
            return code;
        }

        else if (name_of_guy_before == "not") {
            code = code.replace("_", "NOT[_]");
        }

        else if (name_of_guy_before == "and") {
            code = code.replace("_", "AND[_,_]");
        }
        // hit a custom gadget
        else {
            // find the number of inputs in the gadget
            let num_inputs = guy_before.inputList.length;
            console.log("Number of inputs", num_inputs);
            let rule = guy_before.rule;
            // replace the inputs with "_"
            for (let i = 0; i < num_inputs; i++) {
                let input = "input" + i;
                console.log(input);
                rule = rule.replace(input, "_");
            }
            code = code.replace("_", rule);
        }

        for (let i = 0; i < guy_before.inputList.length; i++) {
            let input = output.start.inputList[i];
            code = this.simplify(input, code);
        }
        return code;
    }

    placeInput() {
        let x = this.offset;
        let y = windowHeight / 2 + this.inputList.length * this.inputOffset;
        let input = new Input(x, y, this.inputList.length);
        this.items.push(input);
        this.inputList.push(input);
        this.create_item_mode = false;
        sim.create_item_mode = false;
    }

    placeOutput() {
        let x = windowWidth - this.offset;
        let y = windowHeight / 2 + this.outputList.length * this.inputOffset;
        let output = new Input(x, y);
        this.items.push(output);
        this.outputList.push(output);
        this.create_item_mode = false;
        sim.create_item_mode = false;
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

    placeCustomGadget(mx, my, gadget_name){
        // use gadget_name to loop up the gadget in the gadget array
        // save gadget rule
        let gadget_rule = this.gadget_array.find(g => g.name == gadget_name).output;
        let gadget = new CustomGadget(mx, my, gadget_name, gadget_rule);
        this.items.push(gadget);

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