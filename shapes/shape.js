class Shape {
    constructor(options) {
        this.options = options
    }
    handleOptions(ctx) {
        ctx.strokeStyle = this.options.strokeColor
        ctx.fillStyle = this.options.fillColor
        ctx.strokeStyle && this.options.stroke && ctx.stroke()      
        ctx.fillStyle && this.options.fill && ctx.fill()
    }
    draw(ctx) {
        throw new Error('draw method hasnt been implemented on this class yet! do it noob')
    }
}