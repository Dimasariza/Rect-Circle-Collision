import Vector from "./vector.js"
export default class Circle {
    /**
    *  @param { number } x 
    *  @param { number } y
    *  @param { number } radius
    * */
    constructor(x, y, radius, color){
        this.pos = new Vector(x, y)
        this.vel = new Vector(0, 0) 
        this.acc = new Vector(0, 0)
        this.friction = 0.1
        this.acceleration = 0.5
        this.radius = radius
        this.color = color
        this.keyPress = []
        this.distance = 0
        this.pointOnRect = new Vector(0, 0)
        window.addEventListener('keydown', (e)=>{
            if(!this.keyPress.includes(e.key)) this.keyPress.push(e.key)
        })
        window.addEventListener('keyup', (e)=>{
            const index = this.keyPress.indexOf(e.key)
            this.keyPress.splice(index, 1)
        })
    }
    /** @param { CanvasRenderingContext2D } ctx */
    draw(ctx){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI)
        ctx.fill()
    }
    /** @param { CanvasRenderingContext2D } ctx */
    drawCenterPoint(ctx){
        ctx.strokeStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, 10, 0, 2 * Math.PI)
        ctx.stroke()
    }
    update(){
        this.acc = this.acc.unit().mult(this.acceleration);
        this.vel = this.vel.add(this.acc)
        this.vel = this.vel.mult(1 - this.friction)
        this.pos = this.pos.add(this.vel)

        if(this.distance < this.radius) this.color = 'blue'
        else this.color = 'green'
        this.movement()
    }
    movement(){
        if(this.keyPress.includes('ArrowLeft')) this.acc.x = -this.acceleration
        else if(this.keyPress.includes('ArrowRight')) this.acc.x = this.acceleration
        else this.acc.x = 0

        if(this.keyPress.includes('ArrowUp')) this.acc.y = -this.acceleration
        else if(this.keyPress.includes('ArrowDown')) this.acc.y = this.acceleration
        else this.acc.y = 0
    }
    /** 
     * @param { number } width
     * @param { number } height 
     * */
    boundaries(width, height){
        if(this.pos.x - this.radius < 0) this.pos.x = this.radius
        if(this.pos.x + this.radius > width) this.pos.x = width - this.radius

        if(this.pos.y - this.radius < 0) this.pos.y = this.radius
        if(this.pos.y + this.radius > height) this.pos.y = height - this.radius
    }
    detectRect(obj){
        const pointX = this.clamp(obj.pos.x, obj.pos.x + obj.width, this.pos.x),
              pointY = this.clamp(obj.pos.y, obj.pos.y + obj.height, this.pos.y)

        this.pointOnRect = new Vector(pointX, pointY)
        this.distance = this.pos.subs(this.pointOnRect).mag()
    } 
    /** @param { CanvasRenderingContext2D } ctx */
    drawLine(ctx){
        ctx.strokeStyle = 'white'   
        ctx.lineWidth = 3
        ctx.beginPath()
        // ctx.moveTo(this.pos.x + this.width / 2, this.pos.y + this.height / 2)
        ctx.moveTo(this.pointOnRect.x, this.pointOnRect.y)
        ctx.lineTo(this.pos.x, this.pos.y)
        ctx.stroke()
    }
    /** 
     * @param { number } min 
     * @param { number } max 
     * @param { number } value */
    clamp(min, max, value){
        return Math.max(min, Math.min(max, value))
    }
}