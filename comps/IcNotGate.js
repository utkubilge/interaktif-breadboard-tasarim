export default class IcNotGate {
    constructor(x, y, w, h, imageSrc) {
        this.x = x;
        this.y = y;
        this.height = h
        this.width = w
        this.image = new Image();
        this.image.src = imageSrc;
        this.lans = [];
    }
    draw(ctx, LANES=0) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}