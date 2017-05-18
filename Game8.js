class Game {
    constructor() {
        this.mat = [];
        let vector = [1,2,3,4,5,6,7,8];
        for(let i = 0; i < 3; i++) {
        	this.mat.push([]);
            for(let j = 0; j < 3; j++) {
                let rand = this.getRandomInt(0, vector.length);
        		this.mat[i].push(vector[rand] != null ? vector[rand] : -1);
                vector.splice(rand, 1);
            }
        }
        
        for(let i = 0; i < 3; i++) {
            console.log(this.mat[i][0] +" "+this.mat[i][1]+" "+this.mat[i][2]);
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    canMakeMove(i, j, d) {
        if(d == "u") {
            return (this.i > 0 && mat[i-1][j] == -1) ? [-1,0] : [0,0];
        } else if(d == "d") {
            return (this.i < 2 && mat[i+1][j] == -1) ? [1,0]  : [0,0];
        } else if(d == "l") {
            return (this.j > 0 && mat[i][j-1] == -1) ? [0,-1] : [0,0];
        } else {
            return (this.j < 2 && mat[i][j+1] == -1) ? [0,1]  : [0,0];
        }
    }

    makeMove(i, j, d) {
        if(this.canMakeMove(i, j, d)) {
            let movedNum = this.mat[i][j];
            this.mat[i][j] = -1;
            switch(d) {
                case "u": mat[i-1][j] = movedNum; break;
                case "d": mat[i+1][j] = movedNum; break;
                case "l": mat[i][j-1] = movedNum; break;
                case "r": mat[i][j+1] = movedNum; break;
            }
        }
    }
}