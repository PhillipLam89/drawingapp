class Rect extends Shape {
    constructor(corner1, type,options) {
        super(options)
        this.corner1 = corner1
        this.corner2 = corner1
        this.type = type
        this.points = this.getPoints()
    }
    static load(data) {
       
        const rect = new Rect()
        rect.type = data.type
  
        rect.idArr = data.idArr
        rect.id = data.id
        rect.options = data.options
        rect.center  = Vector.load(data.center)
        rect.size = data.size
       rect.corner1 = data.corner1
       rect.corner2 = data.corner2
        return rect
    }
    serialize() {
       
        return {
            type: this.type,
            idArr: this.idArr,
            id: this.id,
            options: this.options,
            center: new Vector(this.center.x, this.center.y),
            size: this.size,
            selected: this.selected,
            corner1: this.getPoints()[0],
            corner2: this.getPoints()[1],
        }
    }
    setCorner2(corner2) {
        this.corner2 = corner2
    }
    getPoints() {
        if (this.size) {
           return [
              new Vector(-this.size.width / 2, -this.size.height / 2),
              new Vector(-this.size.width / 2, this.size.height / 2),
              new Vector(this.size.width / 2, this.size.height / 2),
              new Vector(this.size.width / 2, -this.size.height / 2),
           ];
        } else {
           return [this.corner1, this.corner2];
        }
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

        ctx.beginPath()
        const center=this.center

        let left,top,width,height;
        let minX = Math.min(this.corner1?.x, this.corner2?.x) || this.size.width
        let minY = Math.min(this.corner1?.y, this.corner2?.y) || this.size.height
        top = minY + center.y
        if (this.size) {
            left = center.x - this.size.width / 2
       
            width = this.size.width
            height = this.size.height
        } else {
            width = Math.abs(this.corner1.x - this.corner2.x)
            height = this.type === 'square' ? width : (Math.abs(this.corner1.y - this.corner2.y))
            left = minX + center.x
        }
        ctx.rect(left,top,width,height)
        super.applyHitRegionStyles(ctx) 
    }
    draw(ctx) {
        ctx.beginPath()
        const center=this.center

        let left,top,width,height;
        let minX = Math.min(this.corner1?.x, this.corner2?.x) || this.size.width
        let minY = Math.min(this.corner1?.y, this.corner2?.y) || this.size.height
        top = minY + center.y
        if (this.size) {
            left = center.x - this.size.width / 2
       
            width = this.size.width
            height = this.size.height
        } else {
            width = Math.abs(this.corner1.x - this.corner2.x)
            height = this.type === 'square' ? width : (Math.abs(this.corner1.y - this.corner2.y))
            left = minX + center.x
        }
        ctx.rect(left,top,width,height)
        const collisionObj = {
            x: left,
            y:top,
            w:width,
            h:height
        }
        this.collisionObj = collisionObj
        super.handleOptions(ctx)
        if (this.selected) {
            this.drawGizmo(ctx, left,top,width,height,this.options.strokeWidth)

        }
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