class Wire { 
    constructor(start, end, id, pos_end, pos_start) {
        this.start = start;
        this.end = end;
        this.color_off = color(0, 0, 0);
        this.color_on = color(0, 255, 0);
        this.state = false;
        this.stateId = id;
        this.pos_end = pos_end; 
        this.pos_start = pos_start; 
    }


    update(){
        if(this.start.state != undefined){
            if(this.start.state){
                this.state = true; 
            // }else if(!this.state.state){
            }else{
                this.state = false;
            }
        }else{
            if(this.start.states[this.stateId]){
                this.state = true; 
            }else{
                this.state = false;
            }
        }
    }

    render() {
        stroke(this.state ? this.color_on : this.color_off);
        line(this.start.x, this.start.y, this.pos_end.x, this.pos_end.y);
    }
}