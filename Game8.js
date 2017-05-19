let answerVet = [];
let startState = [];
let endState = [];
const directions = ["u", "d", "l", "r"];

getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

createInitState = _ => {
    for(let i = 0; i < 3; i++) {
    	this.startState.push([]);
        for(let j = 0; j < 3; j++) {
    		this.startState[i].push([j+(i*3)]);
            this.endState[i].push([j+(i*3)]);
        }
    }

    for(let i = 0; i < 3; i++) {
        console.log(this.mat[i][0] +" "+this.mat[i][1]+" "+this.mat[i][2]);
    }
}

createChildState = (mat) => {
    let newStates = [];
    let zeroIndex = [];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(mat[i][j] == 0) zeroIndex = [i, j];
        }
    }

    for(let i=0; i < this.directions.length; i++)
        newStates.push(this.makeMove(mat, zeroIndex[0], zeroIndex[1], this.directions[i]));

    return newStates;
}

canMakeMove = (mat, i, j, d) => {
    switch(d) {
        case "u": return (i > 0 && mat[i-1][j] == -1) ? [-1,0] : [0,0];
        case "d": return (i < 2 && mat[i+1][j] == -1) ? [1,0]  : [0,0];
        case "l": return (j > 0 && mat[i][j-1] == -1) ? [0,-1] : [0,0];
        case "r": return (j < 2 && mat[i][j+1] == -1) ? [0,1]  : [0,0];
    }
}

makeMove = (mat, i, j, d) => {
    if(this.canMakeMove(mat, i, j, d)) {
        let movedNum = mat[i][j];
        let matCopy = Object.assign([], mat);
        matCopy[i][j] = -1;
        switch(d) {
            case "u": matCopy[i-1][j] = movedNum; break;
            case "d": matCopy[i+1][j] = movedNum; break;
            case "l": matCopy[i][j-1] = movedNum; break;
            case "r": matCopy[i][j+1] = movedNum; break;
        }
        return matCopy;
    } else {
        return null;
    }
}
