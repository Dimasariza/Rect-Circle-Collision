import Vector from "./vector.js"
export default class Rectangle {
    /**
    *  @param { number } x 
    *  @param { number } y
    *  @param { number } width
    *  @param { number } height
    *  @param { string } color
    * */
    constructor(x, y, width, height, color){
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, 0)
        this.acc = new Vector(0, 0)
        this.friction = 0.1
        this.width = width
        this.height = height
        this.color = color
    }
    /** @param { CanvasRenderingContext2D } ctx */
    draw(ctx){
        ctx.strokeStyle = this.color
        ctx.lineWidth = 3
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height)
    }
    update(){
    } 
}