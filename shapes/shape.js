class Shape {
    constructor(options) {
        this.options = options
    }
    handleOptions(ctx) {
        ctx.lineWidth = this.options.strokeWidth
        ctx.strokeStyle = this.options.strokeColor
        ctx.fillStyle = this.options.fillColor
        ctx.fillStyle && this.options.fill && ctx.fill()
        ctx.strokeStyle && this.options.stroke && ctx.stroke()      
    }
    draw(ctx) {
        throw new Error('draw method hasnt been implemented on this class yet! do it noob')
    }
}