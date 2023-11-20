import Rectangle from "./rectangle.js"
import Circle from "./circle.js"

const canvas = /** @type { HTMLCanvasElement } */ (document.getElementById('canvas1'))
const ctx = /** @type { CanvasRenderingContext2D } */ (canvas.getContext('2d'))
const CANVAS_WIDTH = canvas.width = 800
const CANVAS_HEIGHT = canvas.height = 800

const   rectWidth = 200, 
        rectHeight = 100, 
        rectX = (CANVAS_WIDTH - rectWidth) / 2, 
        rectY = (CANVAS_HEIGHT - rectHeight) / 2
const   rect = new Rectangle(rectX, rectY, rectWidth, rectHeight, 'red')

const   radius = 50,
        circX = (Math.random() * (CANVAS_WIDTH - 2 * radius)) + radius,
        circY = (Math.random() * (CANVAS_HEIGHT - 2 * radius)) + radius
const   circle = new Circle(circX, circY, radius, 'green')
 
function handleCircle(){
    const point = circle.pos.angle(circle.pointOnRect)
    const outerCircleX = circle.pointOnRect.x + point.x * (circle.radius + 1)
    const outerCircleY = circle.pointOnRect.y + point.y * (circle.radius + 1)
    ctx.strokeRect(outerCircleX - 5, outerCircleY - 5, 10, 10)
    if(circle.distance > circle.radius) return
    circle.pos.x = outerCircleX
    circle.pos.y = outerCircleY
}

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    
    rect.draw(ctx)
    
    circle.draw(ctx)
    circle.drawLine(ctx)
    circle.drawCenterPoint(ctx)
    circle.boundaries(CANVAS_WIDTH, CANVAS_HEIGHT)
    circle.detectRect(rect)
    circle.update()

    handleCircle()
    requestAnimationFrame(animate)
}
animate()

