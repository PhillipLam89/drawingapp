class Rect extends Shape {
    constructor(corner1, type,options) {
        super()
        this.corner1 =  corner1
        this.corner2 = corner1
        this.type = type
        this.options = options
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = this.options.strokeColor
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const minY = Math.min(this.corner1.y, this.corner2.y)
        const width = Math.abs(this.corner1.x - this.corner2.x)
        const height = this.type === 'square' ?
                       width : Math.abs(this.corner1.y - this.corner2.y)
        ctx.rect(minX,minY,width, height)
                    
        ctx.stroke()
    }
}