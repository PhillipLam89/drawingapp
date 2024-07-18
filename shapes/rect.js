class Rect extends Shape {
    constructor(corner1, type,options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = corner1
        this.type = type
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    
    drawHitRegion(ctx) {
        ctx.beginPath()

        const minX = Math.min(this.corner1.x, this.corner2.x)
        const minY = Math.min(this.corner1.y, this.corner2.y)
        const width = Math.abs(this.corner1.x - this.corner2.x)
        const height = this.type === 'square' ?
                       width : Math.abs(this.corner1.y - this.corner2.y)
        ctx.rect(minX,minY,width, height)
        super.applyHitRegionStyles(ctx) 
    }
    draw(ctx) {
        ctx.beginPath()

        const minX = Math.min(this.corner1.x, this.corner2.x)
        const minY = Math.min(this.corner1.y, this.corner2.y)
        const width = Math.abs(this.corner1.x - this.corner2.x)
        const height = this.type === 'square' ?
                       width : Math.abs(this.corner1.y - this.corner2.y)
        ctx.rect(minX,minY,width, height)
                    
        super.handleOptions(ctx)
        if (this.selected) this.drawGizmo(ctx)
    }
    drawGizmo(ctx) {
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const minY = Math.min(this.corner1.y, this.corner2.y)
        const maxX = Math.max(this.corner1.x, this.corner2.x)
        const maxY = Math.max(this.corner1.y, this.corner2.y)
        ctx.save()
        ctx.beginPath()
        ctx.rect(minX,minY, maxX-minX, this.type === 'square' ? maxX-minX : maxY - minY)
        ctx.strokeStyle = 'goldenrod'
        ctx.lineWidth = this.options.strokeWidth
        ctx.setLineDash([5,5])
        ctx.stroke()
        ctx.restore()
    }
}