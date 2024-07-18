class Path extends Shape {
    constructor(startPoint, options) {
        super(options) //can be put on parent class since all shapes use options from color picker
        this.points = [startPoint]
    }
    addPoint(point) {
        this.points.push(point)
    }
    drawHitRegion(ctx) {
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x, this.points[i].y)
        }       
 
      super.applyHitRegionStyles(ctx)       
    }
    draw(ctx) {
        ctx.beginPath()

        ctx.moveTo(this.points[0].x, this.points[0].y)
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x, this.points[i].y)
        }       
 
     super.handleOptions(ctx)
     if (this.selected) this.drawGizmo(ctx)
    }
    drawGizmo(ctx) {
        console.log('gizmo')
        const minX = Math.min(...this.points.map(p=>p.x))
        const minY = Math.min(...this.points.map(p=>p.y))
        const maxX = Math.max(...this.points.map(p=>p.x))
        const maxY = Math.max(...this.points.map(p=>p.y))

        ctx.save()
        ctx.strokeStyle = 'red'
        ctx.lineWidth = this.options.strokeWidth   
        ctx.beginPath()
     
        ctx.moveTo(this.points[0].x, this.points[0].y)
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x, this.points[i].y)

            if (i === this.points.length -1) {
                ctx.lineTo(this.points[0].x, this.points[0].y)
            }
        }  
        ctx.setLineDash([3,13])
        ctx.stroke()       
        ctx.restore()
        
        // ctx.save()
        // ctx.beginPath()
        // ctx.rect(minX,minY, maxX-minX, maxY - minY)
        // ctx.strokeStyle = 'black'
        // ctx.lineWidth = 8
        // ctx.setLineDash([5,5])
        // ctx.stroke()
        // ctx.restore()
    }
}