class Simulation {
    constructor(height, offset) {
        this.height = height;
        this.offset = offset;
        this.background_color = color(100, 100, 100);
        this.wiring_mode = false;
        
        this.create_item_mode = false;
        this.create_item_type = null 

        this.gadgetData = [];
        this.gadgetArray = [];

        this.gadget = new Gadget(height, offset, "Test Gadget");

        this.loadGadgetData();
        this.setupButtons();
    }


    renderLayout() {
        stroke(0,0,0);
        fill(180, 180, 180);
        rect(0, 0, width, height - this.height);
        fill(this.background_color);
        rect(this.offset, this.offset, width-2*this.offset, height - this.height-2*this.offset);
        fill(180, 180, 180);
        rect(0, height - this.height, width, this.height);
    }
    

    setupButtons() {
        let offset = 65;
        
        this.createCreate = createButton('Create');
        this.createCreate.position(this.offset + 0*offset, height - this.height + 10);

        this.createWiring = createButton('Wire');
        this.createWiring.position(this.offset + 1*offset, height - this.height + 10);

        this.createInput = createButton('Input');
        this.createInput.position(this.offset + 2*offset, height - this.height + 10);

        this.createOutput = createButton('Output');
        this.createOutput.position(this.offset + 3*offset, height - this.height + 10);

        this.createLoad = createButton('Load');
        this.createLoad.position(this.offset + 4*offset, height - this.height + 10);

        this.createAdd = createButton('And');
        this.createAdd.position(this.offset + 5*offset, height - this.height + 10);

        this.createNot = createButton('Not');
        this.createNot.position(this.offset + + 6*offset, height - this.height + 10);
    }


    loadGadgetData() {
        loadStrings("gadgets.txt", this.processGadgetData.bind(this));
    }

    processGadgetData(data) {
        console.log("File loaded:", data);
        this.gadgetData = [];  // reset in case we reload
        sim.gadget.gadget_array = []; // reset the gadget array

        for (let i = 0; i < data.length; i++) {
            let line = data[i].trim().split(" ");
            let name = line[0];
            let output = line[1];
            // console.log(name, output);

            this.gadgetData.push({ name, output });
        }

        // OPTIONAL: Trigger anything now that data is ready
        this.onGadgetsLoaded();
    }

    onGadgetsLoaded() {
        // create an array of buttons for each gadget
        for (let i = 0; i < this.gadgetData.length; i++) {
            let gadget = this.gadgetData[i];
            let button = createButton(gadget.name);
            button.position(this.offset + i * 65+7 * 65, height - this.height + 10);
            // when mouse pressed, print name of the button
            button.mousePressed(() => {
                let name = button.html();
                this.create_item_mode = !this.create_item_mode;
                this.create_item_type = name;
            });


            // save the instructions to the gadget array
            // don't save all of the gadgets, just the ones that we need.
            let data = {name : gadget.name, output: gadget.output};
            sim.gadget.gadget_array.push(data);
        }
    }
    
    runButtons() {
        this.createInput.mousePressed(() => {
            this.gadget.placeInput();
        });

        this.createOutput.mousePressed(() => {
            this.gadget.placeOutput();
        });

        this.createCreate.mousePressed(() => {
            // prompt the user for the name of the gadget
            let name = prompt("Enter the name of the gadget:");

            let outputs = [];
            for (let i = 0; i < this.gadget.outputList.length; i++) {
                let output = sim.gadget.simplify(sim.gadget.outputList[i].inputList[0],"_");
                outputs.push(output);
            }
            
            let rule = "[";
            for (let i = 0; i < outputs.length; i++) {
                rule += outputs[i];
                if (i < outputs.length - 1) {
                    rule += ";";
                }
            }
            rule += "]";
            let data = name + " " + rule;

            // append the (name, output) to a text file gadgets.txt
            // display data
            alert(data);
        });

        this.createLoad.mousePressed(() => {
            this.loadGadgetData();
        
        });


        this.createWiring.mousePressed(() => this.wiring_mode = !this.wiring_mode);

        if (this.wiring_mode) {
            this.createWiring.style('background-color', '#44cc44'); // green
            this.createWiring.style('color', 'white');
        } else {
            this.createWiring.style('background-color', '');
            this.createWiring.style('color', '');
        }

        this.createAdd.mousePressed(() => {
            this.create_item_type = "and";
            this.create_item_mode = !this.create_item_mode;
        });

        this.createNot.mousePressed(() => {
            this.create_item_type = "not";
            this.create_item_mode = !this.create_item_mode;
        });

    }

    run() {
        this.renderLayout();
        this.runButtons();
        this.gadget.run();
    }
}



function mousePressed() {
    // wiring mode
    if (sim.wiring_mode){
        sim.gadget.checkWireStart(mouseX, mouseY);
    }
    
    // create item mode
    else{
        sim.gadget.toggleInputs(mouseX, mouseY);


        if (sim.gadget.create_item_mode) {
            if(sim.create_item_type == "and"){
                sim.gadget.placeAnd(mouseX, mouseY);
            }
            
            else if(sim.create_item_type == "not"){
                sim.gadget.placeNot(mouseX, mouseY);
            }
            
            // otherwise we are placing a custom gadget
            else{
                sim.gadget.placeCustomGadget(mouseX, mouseY, sim.create_item_type);
            }
        }
    }
}