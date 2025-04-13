let sim;

function setup() {
    createCanvas(windowWidth, windowHeight);
    sim = new Simulation(40, 20);    
}
  
function draw() {
    sim.run();
}