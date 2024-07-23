class Path extends Shape {
    constructor(startPoint, options) {
        super(options) //can be put on parent class since all shapes use options from color picker
        this.points = [startPoint]
    }
    addPoint(point) {
        this.points.push(point)
    }
    getPoints() {
        return this.points;
     }
     
     setPoints(points) {
        this.points = points;
     }
    drawHitRegion(ctx) {
        const center = this.center ? this.center : { x: 0, y: 0 };
        ctx.beginPath()

        ctx.moveTo(this.points[0].x + center.x, this.points[0].y + center.y);
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x + center.x, this.points[i].y + center.y);
        }    
      super.applyHitRegionStyles(ctx)       
    }
    draw(ctx) {
        const center = this.center ? this.center : { x: 0, y: 0 };
        ctx.beginPath()

        ctx.moveTo(this.points[0].x + center.x, this.points[0].y + center.y);
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x + center.x, this.points[i].y + center.y);
        }       
 
     super.handleOptions(ctx)
     if (this.selected) this.drawGizmo(ctx)
    }
    drawGizmo(ctx) {
     
        const center = this.center;
        const points = this.getPoints(); 
        const minX = Math.min(...this.points.map(p=>p.x))
        const minY = Math.min(...this.points.map(p=>p.y))
        const maxX = Math.max(...this.points.map(p=>p.x))
        const maxY = Math.max(...this.points.map(p=>p.y))

        ctx.save()
        ctx.beginPath()
        
        ctx.rect(minX + center.x - this.options.strokeWidth,minY + center.y - this.options.strokeWidth, maxX-minX + this.options.strokeWidth * 2, maxY - minY+ this.options.strokeWidth * 2)
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
        ctx.setLineDash([this.options.strokeWidth,5])
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.restore()
    }
}