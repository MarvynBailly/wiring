class Wire { 
    constructor(start, start_pos, end, end_pos, id) {
        this.start = start;
        this.end = end;
        this.color_off = color(0, 0, 0);
        this.color_on = color(0, 255, 0);
        this.state = false;
        this.stateId = id;
        this.start_pos = start_pos;
        this.end_pos = end_pos;
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
        line(this.start_pos.x, this.start_pos.y, this.end_pos.x, this.end_pos.y);
    }
}