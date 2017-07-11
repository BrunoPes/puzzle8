let ansVet = [];
let startState = [];
let endState = [];
let ja = 0;
const directions = ["u", "d", "l", "r"];

function node(state, parent) {
    let children = [];
    const addChild = node => { children.push(node); ansVet.push(node.state);};
    const addChildren = newChildren => {
        newChildren && newChildren.length > 0 && newChildren.forEach(node => {
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
    let startVector = [1,3,5,4,2,6,7,0,8];
    for(let i = 0; i < 3; i++) {
    	startState.push([]);
        endState.push([]);
        for(let j = 0; j < 3; j++) {
            startState[i].push(startVector[j+(i*3)]);
            endState[i].push((j+(i*3))+1);
        }
    }
    endState[2][2] = 0;
}

logMatrix = mat => {
    for(var i = 0; i < 3; i++) {
        console.log(mat[i][0] +" "+mat[i][1]+" "+mat[i][2]);
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

    for(let i=0; i < directions.length; i++) {
        let stateChild = makeMove(stateCurrent, zeroIndex[0], zeroIndex[1], directions[i]);
        let exist = stateChild && ansVet.find(state => {return statesAreEquals(state, stateChild)});
        if(stateChild && !exist)
            newStates.push(node(stateChild, currNode));
    }

    return newStates;
}

cloneMatrix = mat => {
    let auxMat = [];
    mat.forEach((line, i) => {
        auxMat.push([]);
        line.forEach((el, j) => {
            auxMat[i].push(el);
        });
    });
    return auxMat;
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
        let matCopy = cloneMatrix(mat);
        switch(d) {
            case "u":
                matCopy[i][j] = mat[i-1][j];
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

checkLine = (lineA, lineB) => {
    if(lineA[0]==lineB[0] && lineA[1]==lineB[1] && lineA[2]==lineB[2]) return 2;
    else if(lineA[0]==lineB[0] && lineA[1]==lineB[1]) return 1;
    else if(lineA[0]==lineB[0]) return 0;
    else return -1;
}

chooseNode = (nodes) => {
    let best;
    nodes.forEach(el => {
        if(!best) {
            best = el;
        } else {
            let state = el.state;
            let bState = best.state;
            let b1 = checkLine(bState[0], endState[0]);
            let b2 = checkLine(bState[1], endState[1]);
            let s1 = checkLine(state[0], endState[0]);
            let s2 = checkLine(state[1], endState[1]);

            if(b1 < s1 || (b1 == s1 && b2 < s2) || statesAreEquals(state, endState)) {
                best = el;
            }
        }
    });
    return best;
}

statesAreEquals = (state1, state2) => {
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
            aux && logMatrix(aux.state);
        }
        return 0;
    }

    //cria nós
    let children = createChildStates(node);
    children && children.length > 0 && node.addChildren(children);
    for(let i=0; i<node.children.length; i++) {
        let best = chooseNode(node.children);
        if(dfs(best) == 0) {
            return 0;
        } else {
            node.removeChild(node.children.indexOf(best));
        }
    }
    return 1;
}

start = _ => {
    createInitState();
    dfs(node(startState, null));
}
