///////////////////////////
// Gadget Class
// handles the logic for placing gates and wires within the gadget
// the run function is called from simulation.js
///////////////////////////

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
        this.wire_start_item;
        this.wire_start_pos;

        this.gadget_array = [];

        this.create_item_mode = false;

        this.inputOffset = 40;

        this.ignore_list = ["input", "output", "not", "and"];

        // call the default setup function
        this.setupDefaultSetup();
    }

    // function to load the default setup: 2 inputs and 1 output
    setupDefaultSetup() {
        this.inputList.push(new Input(this.offset, windowHeight/2-this.inputOffset, 0));
        this.items.push(this.inputList[0]);
        this.inputList.push(new Input(this.offset, windowHeight/2+this.inputOffset, 1));
        this.items.push(this.inputList[1]); 

        this.outputList.push(new Output(width - this.offset, 400));
        this.items.push(this.outputList[0]);
    }

    
    //////////////////////
    // Wire Creation
    //////////////////////
    
    // handles the initial placement for the wire
    checkWireStart(mx, my) {
        // actives when wring_mode is on
        // loops over the items and checks if the mouse is over an item
        // for creating a wire start for an item with outputs, we should check if the mouse is over the output area of the item rather than the item itself
        for (let item of this.items) {
            if (this.item_clicked(item, mx, my)) {
                const pos = item.getActiveCoords(mx, my);
                this.create_wire(item, pos);
            }
        }
    }

    // handles the creation of the wire from the start item to the end item
    create_wire(item, pos) {        
        if (!this.wiring_mode) {
            // save wire info for the start of the wire
            this.wiring_mode = true;
            this.wire_start_item = item;
            this.wire_start_pos = pos;   
        }
        // create a wire between the two items
        else{
            let id = this.wire_start_item.outputs.length
            // wire goes only this direction
            // could cause potential issue or confusion
            console.log("Creating wire from: ", this.wire_start_item.name, " to: ", item.name);
            let wire = new Wire(this.wire_start_item, this.wire_start_pos, item, pos, id)
            
            // add the wire to the wires array
            this.wires.push(wire);

            // add the wire to the input of the end item
            item.addInput(wire);
            // add the wire to the output of the start item
            this.wire_start_item.addOutput(wire);
            
            this.wiring_mode = false;
            sim.wiring_mode = false;
        }
    }

    // a function to handle placing the end of the wire
    checkWireEnd(mx, my) {
        for (let gadget of this.items) {
            if (gadget instanceof CustomGadget) { 
                if(gadget.checkToggle(mx, my)){
                    let pos = gadget.getActiveCoords();


                    /// Next thing to do is add the same logic to the outputs. This process will be slightly different since we need to check the starting position. This could be done by modifying the function that gets called when the gadget is clicked. Now we only add a wire when one of the output_hover is true. Then we can use the same process as the inputs.
                    this.create_wire(gadget, pos);
                }
            }
        }
    }

    // check if item is clicked. 
    // if the item is a custom gadget, we need to check if the mouse is over the input/output area of the gadget
    item_clicked(item, mx, my) {
        // if item has outputs, check output
        if (item instanceof CustomGadget) {
            // check if mouse is over the input area of the gadget
            if (item.checkInput(mx, my)) {
                console.log("Input clicked");
                return true;
            }
            // check if mouse is over the output area of the gadget
            if (item.checkOutput(mx, my)) {
                console.log("Output clicked");
                return true;
            }
        }else{
            const d = dist(mx, my, item.x, item.y);
            return d < item.size / 2;
        }
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
        let output = new Output(x, y);
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
        let gadget = new CustomGadget(mx, my, gadget_rule, gadget_name);
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
            this.renderWire(this.wire_start_pos, createVector(mouseX, mouseY));   
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