class Simulation {
    constructor(height, offset) {
        this.height = height;
        this.offset = offset;
        this.background_color = color(100, 100, 100);
        this.wiring_mode = false;


        this.gadget = new Gadget(height, offset, "Test Gadget");

        this.setupButtons();
    }

    renderLayout() {
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
            this.gadget.addItem();
        });
    }

    run() {
        this.renderLayout();
        this.runButtons();
        this.gadget.run();
    }
}



function mousePressed() {
    if (sim.wiring_mode){
        sim.gadget.checkItemClick(mouseX, mouseY);
    }
    else {
        sim.gadget.checkInputClick(mouseX, mouseY);
    }
}