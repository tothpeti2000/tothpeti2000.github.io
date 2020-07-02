export class Vector{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    magnitude(){
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
    }
}