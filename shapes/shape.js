class Shape {
    constructor(options) {
        this.options = options
        this.colorId = ~~(16777216 * Math.random()) //max number of colors
    }
    applyHitRegionStyles(ctx) {
        const red =  (this.colorId & 0xFF0000) >> 16
        const green =  (this.colorId & 0x00FF00) >> 8
        const blue =  this.colorId & 0x0000FF;
        ctx.fillStyle = `rgb(${red},${green},${blue})`
        ctx.strokeStyle = `rgb(${red},${green},${blue})`
        ctx.lineWidth = this.options.strokeWidth + 5
        if (this.options.fill) {
            ctx.fill()
        }
        if (this.options.stroke) {
            ctx.stroke()
        }
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