class Triangle {
    constructor(corner1) {
        this.corner1 =  corner1
        this.corner2 = corner1
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    draw(ctx) {
        ctx.beginPath()
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const maxX = Math.max(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x, y)
        ctx.lineTo(this.corner2.x,y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(this.corner1.x, y - height)
        ctx.stroke()
    }
}