export default class Item {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y)
    }
}