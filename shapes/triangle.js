class Triangle extends Shape {
    constructor(corner1, type, options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = {}
        this.type = type
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    drawHitRegion(ctx) {
        ctx.beginPath()
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x, y)
        ctx.lineTo(this.corner2.x,y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(minX + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height) : (y+height) 
                  )
        ctx.lineTo(this.corner1.x , y )  
        super.applyHitRegionStyles(ctx)     
    }
    drawGizmo(ctx) {
        ctx.save()  
        ctx.lineWidth = 3
        ctx.beginPath()
        // ctx.setLineDash([this.options.strokeWidth,5])
       
        const startX = Math.min(this.corner1.x, this.corner2.x)- this.options.strokeWidth
        const width = Math.abs(this.corner1.x - this.corner2.x)
        const height = width * Math.cos(Math.PI / 6)
        const startY = this.corner1.y - this.options.strokeWidth

        const isDownwards = this.corner2.y > this.corner1.y

        ctx.rect(startX , startY - (isDownwards ? 0 : height), width + this.options.strokeWidth * 2 , height + this.options.strokeWidth * 2)
        ctx.strokeStyle = 'red' 
        ctx.setLineDash([this.options.strokeWidth,5])
        ctx.stroke()
        ctx.restore()

    }
    draw(ctx, type = null) {
        ctx.beginPath()
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x, y)
        ctx.lineTo(this.corner2.x,y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(minX + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height) : (y+height) 
                  )
        ctx.lineTo(this.corner1.x , y )
        super.handleOptions(ctx)
        if (this.selected) this.drawGizmo(ctx)       
    }
}