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
        this.Llane = false;
        this.Rlane = false;

    }
    draw(ctx) {
        if(this.Llane == true && this.Rlane == false) {
            ctx.drawImage(this.image1, this.x, this.y)
        }
        else
        ctx.drawImage(this.image, this.x, this.y)
    }
}