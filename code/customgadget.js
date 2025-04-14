class CustomGadget{
    constructor(x, y, name, rule){
        this.x = x;
        this.y = y;
        this.size = 40;
        this.color = color(random(255), random(255), random(255));
        this.name = name;
        this.rule = rule;
        this.state = false;
        this.inputList = [];
        this.outputs = [];
    }
}

