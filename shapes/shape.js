class Shape {
    constructor(options) {
        this.options = options
        this.selected = false
        this.id = ~~(16777216 * Math.random()) //max number of colors
    }
    applyHitRegionStyles(ctx) {
        const red =  (this.id & 0xFF0000) >> 16
        const green =  (this.id & 0x00FF00) >> 8
        const blue =  this.id & 0x0000FF;
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
    drawGizmo(ctx) {
        throw new Error('not implemented')
    }
    drawHitRegion(ctx) {
        throw new Error('not implemented')
    }
    draw(ctx) {
        throw new Error('draw method hasnt been implemented on this class yet! do it noob')
    }
}