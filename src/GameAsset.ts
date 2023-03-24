export class GameAsset {
  positionX: number;
  positionY: number;
  velocityX: number;
  velocityY: number;
  isColliding: boolean;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.isColliding = false;
  }
}
