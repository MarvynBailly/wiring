class Wire { 
    constructor(start, end, id) {
        this.start = start;
        this.end = end;
        this.color_off = color(0, 0, 0);
        this.color_on = color(0, 255, 0);
        this.state = false;
        this.stateId = id;
    }


    update(){
        if(this.start.state){
            this.state = true; 
        }else if(!this.state.state){
            this.state = false;
        }else{
            
            console.log("here");
        }
    }

    render() {
        stroke(this.state ? this.color_on : this.color_off);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}