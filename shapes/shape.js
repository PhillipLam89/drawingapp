class Shape {
    constructor(options) {
        this.options = options
        this.selected = false
        this.idArr = generateID() //max number of colors
        this.id = this.idArr.join('')
    }
    applyHitRegionStyles(ctx) {
        const [red,green,blue] = this.idArr

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
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
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

function generateID() {
    return [~~(Math.random() * 256),~~(Math.random() * 256),~~(Math.random() * 256)]   
}

