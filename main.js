let sim;

let exp = "NOT[AND[NOT[AND[NOT[input0],input1]],NOT[AND[input0,NOT[input1]]]]]";
let inputList = [1,0];

function evaluateRule(exp, inputList) {
    if (inputList.length != 2) {
        return;
    }

    // replace 0 and 1 with true and false
    let input0 = inputList[0] == 1 ? true : false;
    let input1 = inputList[1] == 1 ? true : false;   
    
    // replace this.rule input0 and input1 with the actual values
    let rule = exp.replace(/input0/g, input0).replace(/input1/g, input1);

    // Recursively evaluate the expression
    function parse(expr) {
        // Evaluate NOT
        if (expr.startsWith('NOT')) {
            let inner = expr.slice(4, -1); // Remove NOT[ and ]
            return !parse(inner);
        }

        // Evaluate AND
        if (expr.startsWith('AND')) {
            let inner = expr.slice(4, -1); // Remove AND[ and ]
            let parts = splitArgs(inner);
            return parts.every(parse);
        }
        // Base case: just return the boolean
        if (expr.trim() === 'true') return true;
        if (expr.trim() === 'false') return false;
    }

    // Split arguments on comma, but respect nested brackets
    function splitArgs(s) {
        let args = [], depth = 0, current = '';
        for (let c of s) {
            if (c === '[') depth++;
            if (c === ']') depth--;
            if (c === ',' && depth === 0) {
                args.push(current.trim());
                current = '';
            } else {
                current += c;
            }
        }
        if (current) args.push(current.trim());
        return args;
    }

    return parse(rule);
}



function setup() {
    createCanvas(windowWidth, windowHeight);
    sim = new Simulation(40, 20);    

    evaluateRule(exp, inputList);
}
  
function draw() {
    sim.run();
}