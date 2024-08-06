class Rect extends Shape {
    constructor(corner1, type,options) {
        super(options)
        this.corner1 =  corner1
        this.corner2 = corner1
        this.type = type
    }

    setCorner2(corner2) {
        this.corner2 = corner2
    }
    getPoints() {
        return [this.corner1, this.corner2];
     }
     
     setPoints(points) {

     }   
     setWidth(width) {
        this.size.width = width
       
     }

     setHeight(height) {
        this.size.height = height
     }
    drawHitRegion(ctx) {
        // ctx.beginPath()
        // const center=this.center
        // const minX = Math.min(this.corner1.x, this.corner2.x)
        // const minY = Math.min(this.corner1.y, this.corner2.y)
        // const width = Math.abs(this.corner1.x - this.corner2.x)
        // const height = this.type === 'square' ?
        //                width : Math.abs(this.corner1.y - this.corner2.y)
        //                ctx.rect(minX + center.x,minY + center.y,width, height)
        ctx.beginPath()
        const center=this.center
        let left,top,width,height;
        let minX = Math.min(this.corner1.x, this.corner2.x)
        let minY = Math.min(this.corner1.y, this.corner2.y)
        if (this.size) {
            left = center.x - this.size.width / 2
            top = center.y - this.size.height / 2
            width = this.size.width
            height = this.size.height
        } else {
            width = Math.abs(this.corner1.x - this.corner2.x)
            height = this.type === 'square' ? width :  Math.abs(this.corner1.y - this.corner2.y)
            left = minX + center.x
            top = minY + center.y
        }
        ctx.rect(left,top,width,height)
        super.applyHitRegionStyles(ctx) 
    }
    draw(ctx) {
        ctx.beginPath()
        const center=this.center
        // const minX = Math.min(this.corner1.x, this.corner2.x)
        // const minY = Math.min(this.corner1.y, this.corner2.y)
        // const width = Math.abs(this.corner1.x - this.corner2.x)
        // const height = this.type === 'square' ?
        //                width : Math.abs(this.corner1.y - this.corner2.y)
        let left,top,width,height;
        let minX = Math.min(this.corner1.x, this.corner2.x)
        let minY = Math.min(this.corner1.y, this.corner2.y)
        if (this.size) {
            left = center.x - this.size.width / 2
            top = center.y - this.size.height / 2
            width = this.size.width
            height = this.size.height
        } else {
            width = Math.abs(this.corner1.x - this.corner2.x)
            height = this.type === 'square' ? width : (Math.abs(this.corner1.y - this.corner2.y))
            left = minX + center.x
            top = minY + center.y

        }
        ctx.rect(left,top,width,height)

        super.handleOptions(ctx)
        if (this.selected) this.drawGizmo(ctx, left,top,width,height,this.options.strokeWidth)
    }
    drawGizmo(ctx, minX,minY, width, height,pad) {
        const center = this.center;
        const points = this.getPoints();
        ctx.save()
        ctx.beginPath()
        ctx.rect(minX  - pad,
                minY  - pad, 
                width + pad * 2,
                height + pad * 2)
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3
        ctx.setLineDash([pad,5])
        ctx.stroke()
        ctx.restore()
    }
}