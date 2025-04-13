class Simulation {
    constructor(height, offset) {
        this.height = height;
        this.offset = offset;
        this.background_color = color(100, 100, 100);
        this.wiring_mode = false;
        
        this.create_item_mode = false;
        this.create_item_type = null 

        this.gadget = new Gadget(height, offset, "Test Gadget");

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
        let offset = 50;
        this.createWiring = createButton('Wire');
        this.createWiring.position(this.offset, height - this.height + 10);

        this.createAdd = createButton('And');
        this.createAdd.position(this.offset + 1*offset, height - this.height + 10);

        this.createNot = createButton('Not');
        this.createNot.position(this.offset + + 2*offset, height - this.height + 10);
    }

    runButtons() {
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

        }
    }
}