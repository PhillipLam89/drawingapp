class Triangle {
    constructor(corner1, type) {
        this.corner1 =  corner1
        this.corner2 = {}
        this.type = type
    }

    setCorner2(corner2) {
        this.corner2 = corner2
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
        ctx.stroke()
    }
}