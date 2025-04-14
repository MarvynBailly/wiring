# Wiring
I spend everyday working on telling computers how to solve problem and I would like to better understand how these machines work. To do so, I want to explore logic gates and their applications without having to buy a large bread board and wait for shipping if I need a piece that I don't have. So let's code a simulation to work on. 
## Idea
Create a simulation to work with logic gates. I want ot be able to save the layout as a module that can be used later on, for example a `and` gate. This will allow me to build complex ideas and better understand the core concepts behind computers.
## Interactive Visualization
Let's use good old Javascript. Let's set up a basic layout for us to work in. It's been a while since I've done this. I have a class called `Simulation` which will render the layout of the simulation. I want two boxes, one for the simulation to place in and a small box below it to have buttons. Next, I want a class `Gadget` which will be the information within each block. In each `Gadget`, I want to have a default layout with two inputs on the right and one output on the left. Next, I want these inputs to be clickable such that we can manually toggle the input of the gadget for testing. 

![alt text](images/image.png)

Great we have something working and is somewhat nice looking. Now let's go on a side quest and look into how to place nice wires.

## Wiring
I find it very satisfying to create clean and organized wiring. I want to have the same effect in the simulation. Let's look into this more later.
### Basic Wiring
A very basic way to visualize this is to place a straight line between the input and the output of the wire. The wire's state matches the state of it's input. 


## Gates
### Basic "and" and "not" gates
The only initial gates I'm going to give myself are "and" and "not" gates since these can be made with only signals on a bread board. Added "and" and "not" gates to the simulation with working logic. 

We have a working "or" gate use with a nand gate and not:

<video controls src="images/20250413-2020-24.3106461.mp4" title="Title"></video>


## Saving Gadgets
I want to be able to save gates as modules that I can later use. I need a way to store the information of the gates compactly. 

Let's work on this "nand" gate example:

![alt text](images/image-1.png)

### Saving Gadget Format
We have two inputs -> and -> not -> output. Let's chase the path from input to output for each input. I want this to be saved as `[*, *] > AND > NOT > [*]` or what if we do something like `AND[*, *]`? Let's try the second one. For now, let's assume that there is only one output. Let's start at the output, and on each step, look back. So for an `OR` gate:

```
1. OUTPUT
2. AND -> OUTPUT : "AND[_,_]"
3. [NOT[_], _] -> AND -> OUTPUT : "AND[NOT[ ],_]"
4. [NOT[INPUT1], _] -> AND -> OUTPUT : "AND[NOT[INPUT1],_]"
5. [NOT[INPUT1], NOT[_]] -> AND -> OUTPUT : "AND[NOT[INPUT1],NOT[_]]"
6. [NOT[INPUT1], NOT[INPUT2]] -> AND -> OUTPUT : "AND[NOT[INPUT1],NOT[INPUT2]]"
```

So this is a recursive function with the termination condition checking if the type of the item is `input`.

```
1. OUTPUT
2. AND -> OUTPUT : "AND[_,_]"
- 1. [NOT[_], _] -> AND -> OUTPUT : "AND[NOT[ ],_]"
- - 1. [NOT[INPUT1], _] -> AND -> OUTPUT : "AND[NOT[INPUT1],_]"
- 2 [NOT[INPUT1], NOT[_]] -> AND -> OUTPUT : "AND[NOT[INPUT1],NOT[_]]"
- - 1 [NOT[INPUT1], NOT[INPUT2]] -> AND -> OUTPUT : "AND[NOT[INPUT1],NOT[INPUT2]]"
```

Let's  write some pseudocode
```
simplify(output, code){
    let guy_before = output.start
    let name_of_guy_before = guy_before.name;

    console.log("name_of_guy_before: " + name_of_guy_before);
    console.log("code: " + code);

    if (name_of_guy_before == "input") {
        console.log("input found: " );
        code = code.replace("_", "input" + guy_before.id);
        console.log("replaced code: " + code);
        
        return code;
    }

    if (name_of_guy_before == "not") {
        console.log("not found: " );
        code = code.replace("_", "NOT[_]");
    }

    if (name_of_guy_before == "and") {
        console.log("and found: " );
        code = code.replace("_", "AND[_,_]");
    }
    console.log("replaced code: " + code);

    for (let i = 0; i < guy_before.inputList.length; i++) {
        let input = output.start.inputList[i];
        code = this.simplify(input, code);
    }
    return code;
}
```
Not the cleanest but gets the trick done! Now clicking 'Create' for the `NAND` get gives `NOT[AND[input1,input0]]`. Wonderful. Now let's add it to a `.txt` containing functions. 

### Loading Gadget Format
Okay I've added the logic to load the gadgets in. How it works is when the user presses the `Load` button, the simulation reads the `gadgets.txt` file and loads in the `(gadget_name, gadget_rule)` pair. The simulation also gives all the details to the current gadget module. Now the simulation also creates now buttons for the user to click. I've also added a new class called `CustonGadget` which takes in the custom name and custom rule. Now we need to write function that takes the rule and returns a `0` or `1`.

![alt text](images/image-2.png)

### Running Gadget
Let's create a function that updates the state of the custom gadget depending on its input values and the rule. 




## TODO
Okay I'm leaving off at a point where I can click on a button that actives wiring mode. Once in wiring mode, the user can clikcon on itmes to begin a wire. The logic for this cascades from the simulation to the gadget. The next step would than be to:
- [ ] Allow the user to click on not an item to add a intermediate step in the wire.
- [ ] When the user clicks a wire, remove it
- [ ] Annoying to keep pressing wire mode.
- [ ] Remove the hard corners
- [ x ] Add an `and` gate. For now lets just add a gate that will take two inputs. We will add the actual logic later. This is just to be at a spot of basic wiring.
- [ x ] If the user clicks on another item, complete the wire. This means, turn wiring_mode off for both the simulation and the gadget and add a new wire to the gadget. The logic for this should all be stored within the gadget class. 
- [ x ] Add an output for the `and` gate.
- [ x ] Add correct logic for inputs, `and` gates, and outputs.