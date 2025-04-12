# Wiring
I spend everyday working on telling computers how to solve problem and I would like to better understand how these machines work. To do so, I want to explore logic gates and their applications without having to buy a large bread board and wait for shipping if I need a piece that I don't have. So let's code a simulation to work on. 
## Idea
Create a simulation to work with logic gates. I want ot be able to save the layout as a module that can be used later on, for example a `and` gate. This will allow me to build complex ideas and better understand the core concepts behind computers.
## Interactive Visualization
Let's use good old Javascript. Let's set up a basic layout for us to work in. It's been a while since I've done this. I have a class called `Simulation` which will render the layout of the simulation. I want two boxes, one for the simulation to place in and a small box below it to have buttons. Next, I want a class `Gadget` which will be the information within each block. In each `Gadget`, I want to have a default layout with two inputs on the right and one output on the left. Next, I want these inputs to be clickable such that we can manually toggle the input of the gadget for testing. 

![alt text](images/image.png)

Great we have something working and is somewhat nice looking. Now let's go on a side quest and look into how to place nice wires.

## Wiring
I find it very satisfying to create clean and organized wiring. I want to have the same effect in the simulation.

## Gates
The only initial gates I'm going to give myself are "and" and "not" gates since these can be made with only signals on a bread board.

# TODO
Okay I'm leaving off at a point where I can click on a button that actives wiring mode. Once in wiring mode, the user can clikcon on itmes to begin a wire. The logic for this cascades from the simulation to the gadget. The next step would than be to:
- [ ] Allow the user to click on not an item to add a intermediate step in the wire.
- [ ] Add an `and` gate. For now lets just add a gate that will take two inputs. We will add the actual logic later. This is just to be at a spot of basic wiring.
- [ ] If the user clicks on another item, complete the wire. This means, turn wiring_mode off for both the simulation and the gadget and add a new wire to the gadget. The logic for this should all be stored within the gadget class. 
- [ ] Add an output for the `and` gate.
- [ ] Add correct logic for inputs, `and` gates, and outputs.
- [ ] Remove the hard corners