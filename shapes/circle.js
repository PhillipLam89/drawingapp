class Circle extends Shape {
    constructor(corner1,options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = corner1   
        this.type ='circle'
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    getPoints() {
        return [this.corner1, this.corner2];
     }
     
     setPoints(points) {
        this.corner1 = points[0];
        this.corner2 = points[1];
     }  
    drawHitRegion(ctx) {
      
        ctx.beginPath()
        const center = this.center
        const startX = this.corner1.x
        const rad = Math.abs(this.corner1.x - this.corner2.x) / 2
        const startY = this.corner1.y       
        ctx.strokeStyle = this.options.strokeColor
        ctx.arc(startX + center.x, startY + center.y, rad, 0, 2* Math.PI,true);  
        super.applyHitRegionStyles(ctx)      
    }
    drawGizmo(ctx, diameter, startX, startY, pad) {       
        const center = this.center;
        ctx.save()
        
        ctx.lineWidth = 4
        ctx.beginPath()
        ctx.rect(startX - pad + center.x , startY + center.y - pad, diameter + pad * 2 , diameter + pad * 2)
        ctx.strokeStyle = 'red' 
        ctx.setLineDash([pad,5])
        ctx.stroke()

        ctx.restore()
    }
    setWidth(width) {
        const size = getSize(this.getPoints())
        const ratio = width / size.width

        for (const point of this.getPoints()) {
            point.x *= ratio
        }
        this.size.width = width
        heightInput.value = this.size.width
     }
    draw(ctx) {
       
        const center = this.center 
        const startX = this.corner1.x
        const rad = Math.abs(this.corner1.x - this.corner2.x) / 2
        const startY = this.corner1.y
        ctx.beginPath()
        ctx.strokeStyle = this.options.strokeColor
                //(x,y,radius,startAngle, endAngle)
        // ctx.arc(startX, startY, rad, Math.PI/2, 1.5* Math.PI,true);
        ctx.arc(startX + center.x, startY + center.y, rad, 0, 2* Math.PI,true);        
        super.handleOptions(ctx)
        if (this.selected) this.drawGizmo(ctx, rad*2, startX - rad, startY-rad, this.options.strokeWidth)
    }
}