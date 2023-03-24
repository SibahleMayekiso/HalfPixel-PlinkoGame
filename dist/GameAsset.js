export class GameAsset {
    constructor(positionX, positionY, velocityX, velocityY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.isColliding = false;
    }
}
