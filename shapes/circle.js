class Circle extends Shape {
    constructor(corner1,options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = corner1   
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    draw(ctx) {
        
        const startX = this.corner1.x
        const rad = Math.abs(this.corner1.x - this.corner2.x) / 2
        const startY = this.corner1.y
        ctx.beginPath()
        ctx.strokeStyle = this.options.strokeColor
                //(x,y,radius,startAngle, endAngle)
        // ctx.arc(startX, startY, rad, Math.PI/2, 1.5* Math.PI,true);
        ctx.arc(startX, startY, rad, 0, 2* Math.PI,true);        
        super.handleOptions(ctx)
    }
}