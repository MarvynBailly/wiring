class Simulation {
    constructor(height, offset) {
        this.height = height;
        this.offset = offset;
        this.background_color = color(100, 100, 100);
        this.wiring_mode = false;
        this.create_item_mode = false;

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
        this.createWiring = createButton('Wire');
        this.createWiring.position(20, height - this.height + 10);

        this.createAdd = createButton('And');
        this.createAdd.position(70, height - this.height + 10);
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
        // // once wiring mode is active, check for end value
        // if (sim.gadget.wiring_mode) {

        // }
        // else{
            sim.gadget.checkItemClick(mouseX, mouseY);
        // }
    }
    
    // create item mode
    else{
        sim.gadget.toggleInputs(mouseX, mouseY);


        if (sim.gadget.create_item_mode) {
            sim.gadget.placeAnd(mouseX, mouseY);
        }
    }
}