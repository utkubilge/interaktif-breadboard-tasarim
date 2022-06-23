export default class Led {
    constructor(x, y, w, h, imageSrc, imageSrc1) {
        this.x = x;
        this.y = y;
        this.height = h
        this.width = w
        this.image = new Image();
        this.image.src = imageSrc;
        this.image1 = new Image();
        this.image1.src = imageSrc1;
        this.Llane = null;
        this.Rlane = null;

    }
    draw(ctx, LANES) {
        if (this.Llane != null && this.Rlane != null) {
            if (LANES[this.Llane].val == true && LANES[this.Rlane].val == false) {
                ctx.drawImage(this.image1, this.x, this.y)
            }
            else
                ctx.drawImage(this.image, this.x, this.y)
        } else
        ctx.drawImage(this.image, this.x, this.y)

    }
}