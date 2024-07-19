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
    drawGizmo(ctx) {
        ctx.save()
        ctx.lineWidth = 3
        ctx.beginPath()
        // ctx.setLineDash([this.options.strokeWidth,5])
        const diameter = Math.abs(this.corner1.x - this.corner2.x) 
        const startX = this.corner1.x - diameter / 2
        
        const startY = this.corner1.y  - diameter / 2
        ctx.rect(startX - this.options.strokeWidth , startY - this.options.strokeWidth, diameter + this.options.strokeWidth * 2 , diameter + this.options.strokeWidth * 2)
        ctx.strokeStyle = 'red' 
        ctx.setLineDash([this.options.strokeWidth,5])
        // ctx.beginPath()
        // ctx.strokeStyle = 'goldenrod'
        // ctx.lineWidth = this.options.strokeWidth
        // ctx.arc(startX, startY, rad, 0, 2* Math.PI,true);
        // ctx.setLineDash([3,13])
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
        if (this.selected) this.drawGizmo(ctx)
    }
}