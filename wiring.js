class Wire { 
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.color = color(0, 0, 0);
    }

    render() {
        stroke(this.color);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}