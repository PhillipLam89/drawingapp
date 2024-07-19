class Circle extends Shape {
    constructor(corner1,options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = corner1   
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    drawHitRegion(ctx) {
        const startX = this.corner1.x
        const rad = Math.abs(this.corner1.x - this.corner2.x) / 2
        const startY = this.corner1.y
        ctx.beginPath()
        ctx.strokeStyle = this.options.strokeColor
        ctx.arc(startX, startY, rad, 0, 2* Math.PI,true);  
        super.applyHitRegionStyles(ctx)      
    }
    drawGizmo(ctx, diameter, startX, startY, pad) {
        ctx.save()

        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.rect(startX - pad , startY - pad, diameter + pad * 2 , diameter + pad * 2)
        ctx.strokeStyle = 'red' 
        ctx.setLineDash([pad,5])
        ctx.stroke()

        ctx.restore()
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
        if (this.selected) this.drawGizmo(ctx, rad*2, startX - rad, startY-rad, this.options.strokeWidth)
    }
}