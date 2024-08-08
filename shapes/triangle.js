class Triangle extends Shape {
    constructor(corner1, type, options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = {}
        this.type = type
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
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        const center=this.center
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x + center.x, y + center.y)
        ctx.lineTo(this.corner2.x + center.x,y + center.y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(minX + center.x + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height + center.y) : (y+height + center.y) 
                  )
        ctx.lineTo(this.corner1.x + center.x , y + center.y)
        super.applyHitRegionStyles(ctx)     
    }
    drawGizmo(ctx, startX, width, height, startY, newY,pad) {
        const center = this.center;
       
        ctx.save()  

        ctx.lineWidth = 3
        ctx.beginPath()
        const isDownwards = newY > this.corner1.y

        ctx.rect(startX + center.x, 
                startY  - (isDownwards ? 0 : height)  + center.y,
                width + pad * 2 ,
                height + pad * 2)
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

         const height = this.size.width* Math.cos(Math.PI / 6)
         heightInput.value = ~~height
     }

    draw(ctx, type = null) {
        const center = this.center
        const pad = this.options.strokeWidth
        ctx.beginPath()
        const minX = Math.min(this.corner1.x, this.corner2.x)
        const y = this.corner1.y
        const newY = this.corner2.y
        const width = Math.abs(this.corner1.x - this.corner2.x)
        ctx.moveTo(this.corner1.x + center.x, y + center.y)
        ctx.lineTo(this.corner2.x + center.x,y + center.y)
        const height = width * Math.cos(Math.PI / 6)
        ctx.lineTo(center.x + minX + (this.type ==='rightTriangle' ? 0 : width / 2 ),
                  newY < y ? (y - height + center.y) : (y+height + center.y) 
                  )
        ctx.lineTo(this.corner1.x + center.x , y + center.y)
        super.handleOptions(ctx)
        if (this.selected) this.drawGizmo(ctx, minX - pad, width, height, y-pad, newY, pad )       
    }
}