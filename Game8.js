let ansVet = [];
let startState = [];
let endState = [];
const directions = ["u", "d", "l", "r"];

function node(state, parent) {
    let children = [];
    const addChild = node => { children.push(node); };
    const addChildren = children => { 
        children && children.length > 0 && children.forEach(node => {
            children.push(node);
            ansVet.push(node.state);
        });
    };
    const removeChild = index => { children.splice(index, 1); };
    return {state: state, p: parent, children:children, addChild, addChildren, removeChild};
}

getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

createInitState = _ => {
    let startVector = [3,2,1,8,6,5,4,7,0];
    for(let i = 0; i < 3; i++) {
    	startState.push([]);
        endState.push([]);
        for(let j = 0; j < 3; j++) {
            startState[i].push(startVector[j+(i*3)]);
            endState[i].push((j+(i*3))+1);
        }
    }
    endState[2][2] = 0;

    // console.log("Init state: -- ");
    for(let i = 0; i < 3; i++) {
        console.log(startState[i][0] +" "+startState[i][1]+" "+startState[i][2]);
    }
}

createChildStates = (currNode) => {
    let newStates = [];
    let zeroIndex = [];
    let stateCurrent = currNode.state;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(stateCurrent[i][j] == 0) zeroIndex = [i, j];
        }
    }

    console.log("Current: ", stateCurrent);
    for(let i=0; i < directions.length; i++) {
        let stateChild = makeMove(stateCurrent, zeroIndex[0], zeroIndex[1], directions[i]);
        let exist = ansVet.find(state => {return statesAreEquals(state, stateChild)});
        if(stateChild != null && exist == null)
            newStates.push(node(stateCurrent, stateChild));
    }

    return newStates;
}

canMakeMove = (i, j, d) => {
    switch(d) {
        case "u": return (i > 0);
        case "d": return (i < 2);
        case "l": return (j > 0);
        case "r": return (j < 2);
    }
}

makeMove = (mat, i, j, d) => {
    if(canMakeMove(i, j, d)) {
        let movedNum = mat[i][j];
        let matCopy = Object.assign([], mat);
        switch(d) {
            case "u": 
                matCopy[i][j] = matCopy[i-1][j]; 
                matCopy[i-1][j] = 0; 
                break;
            case "d": 
                matCopy[i][j] = matCopy[i+1][j]; 
                matCopy[i+1][j] = 0; 
                break;
            case "l": 
                matCopy[i][j] = matCopy[i][j-1]; 
                matCopy[i][j-1] = 0; 
                break;
            case "r": 
                matCopy[i][j] = matCopy[i][j+1]; 
                matCopy[i][j+1] = 0; 
                break;
        }
        return matCopy;
    } else {
        return null;
    }
}

statesAreEquals = (state1, state2) => {
    // console.log("State 1: ", state1, "\nState 2: ", state2);
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            if(state1[i][j] != state2[i][j])
                return false;
        }
    }
    return true;
}

dfs = node => {
    //Testa se ganha 
    if(statesAreEquals(node.state, endState)) {
        let aux = node;
        let answer = [];
        console.log("RESPOSTA: ");
        
        while(aux != null) {
            aux && answer.push(aux);
            aux = aux.p;
        }

        for(let i=(answer.length-1); i >= 0; i--) {
            aux = answer[i];
            console.log("Passo " + (answer.length-i+1));
            aux && console.log(aux.state[0], aux.state[1], aux.state[2]);
        }
        return 0;
    }
    //cria nós
    let children = createChildStates(node);
    if(children.length <= 0) {
        node = null;
    } else {
        node.addChildren(children);
        console.log(node);
        while(node.children.length > 0) {
            console.log("Try Child: ", node.children[0]);
            if(dfs(node.children[0]) == 0) {
                return 0;
            } else {
                node.removeChild(0);
                let index = ansVet.length;
                ansVet.find((ele, i) => {
                    if(statesAreEquals(node.state, ele))
                        index = i;
                });
                ansVet.splice(index, 1);
            }
        }
    }
    return 1;
}

start = _ => {
    createInitState();
    dfs(node(startState, null));
}