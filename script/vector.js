export default class Vector {
    /**
    *  @param { number } x 
    *  @param { number } y
    * */
    constructor(x, y){
        this.x = x
        this.y = y
    }
    add(v){
        return new Vector(this.x + v.x, this.y + v.y)
    }
    subs(v){
        return new Vector(this.x - v.x, this.y - v.y)
    }
    mag(){
        return Math.hypot(this.x, this.y)
    }
    mult(n){
        return new Vector(this.x * n, this.y * n)
    }
    normal(){
        return new Vector(-this.y, this.x).unit();
    }
    unit(){
        if(this.mag() === 0) return new Vector(0,0);
        return new Vector(this.x/this.mag(), this.y/this.mag());
    }
    angle(v){
        const angle = Math.atan2(this.subs(v).y, this.subs(v).x)
        return {
            x : Math.cos(angle),
            y : Math.sin(angle)
        }
    }
}