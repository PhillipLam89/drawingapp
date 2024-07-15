class Circle {
    constructor(corner1) {
        this.corner1 =  corner1
        this.corner2 = corner1
     
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    draw(ctx) {
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const rad = Math.abs(this.corner1.x - this.corner2.x) / 2
        const y = this.corner1.y
        ctx.beginPath()
                //(x,y,radius,startAngle, endAngle)
        ctx.arc(minX, y, rad, 0, 2 * Math.PI);
                    
        ctx.stroke()
    }
}