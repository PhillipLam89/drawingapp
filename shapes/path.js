class Path extends Shape {
    constructor(startPoint, options) {
        super(options) //can be put on parent class since all shapes use options from color picker
        this.points = new Array(startPoint)
    }
    static load(data) {
        const path = new Path()
        path.idArr = data.idArr
        path.id = data.id
        path.type = 'path'
        path.options = data.options
        path.center  = Vector.load(data.center)
        path.size = data.size
        path.selected = data.selected
        path.points = data.points.map(p => Vector.load(p))
        return path
    }
    serialize() {
        return {
            type: 'path',
            idArr: this.idArr,
            id: this.id,
            options: this.options,
            center: this.center,
            size: this.size,
            selected: this.selected,
            points: this.points
        }
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
     setWidth(width) {
        const size = getSize(this.points)
        const ratio = width / size.width

        for (const point of this.points) {
            point.x *= ratio
        }
        this.size.width = width
     }
     setHeight(height) {
        const size = getSize(this.points)
        const ratio = height / size.height

        for (const point of this.points) {
            point.y *= ratio
        }
        this.size.height = height
     }
    drawHitRegion(ctx) {
        const center = this.center
        ctx.beginPath()
        ctx.moveTo(this.points[0].x + center.x, this.points[0].y + center.y);
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x + center.x, this.points[i].y + center.y);
        }    
      super.applyHitRegionStyles(ctx)       
    }
    draw(ctx) {
        const center = this.center
        ctx.beginPath()

        ctx.moveTo(this.points[0].x + center.x, this.points[0].y + center.y);
        
        for(let i = 1; i < this.points.length;i++) { //start at index 1 since we have initial positions of index 0 already
            ctx.lineTo(this.points[i].x + center.x, this.points[i].y + center.y);
        }       
 
        const minX = Math.min(...this.points.map(p=>p.x))
        const minY = Math.min(...this.points.map(p=>p.y))
        const maxX = Math.max(...this.points.map(p=>p.x))
        const maxY = Math.max(...this.points.map(p=>p.y))
        const collisionObj = {
            x:minX + center.x - this.options.strokeWidth,
            y:minY + center.y - this.options.strokeWidth,
            w:maxX-minX + this.options.strokeWidth * 2,
            h:maxY - minY+ this.options.strokeWidth * 2
        }
        this.collisionObj = collisionObj
       
     super.handleOptions(ctx)
     if (this.selected) {
        this.drawGizmo(ctx, collisionObj)
        // super.handleCollisions(ctx,collisionObj)
   } 
 }
    drawGizmo(ctx, collisionObj) {
     
        const center = this.center;
    
        ctx.save()
        ctx.beginPath()
        
        ctx.rect(collisionObj.x,collisionObj.y,collisionObj.w,collisionObj.h)

        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
        ctx.setLineDash([this.options.strokeWidth,5])
        ctx.stroke()
        ctx.beginPath()

        ctx.stroke()
        ctx.restore()
    }
}