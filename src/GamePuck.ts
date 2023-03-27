import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameAsset } from "./GameAsset.js";
import { puckContainer } from "./app.js";


export class GamePuck extends GameAsset {
  coinPuck = PIXI.Sprite.from("./assets/Coin Pack/Coin9.png");
  radius: number;

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    super(positionX, positionY, velocityX, velocityY);
    this.radius = 10;
  }

  GeneratePuck() {
    const puck = new PIXI.Graphics()
      .beginFill(0xE33900 * Math.random() * 5)
      .drawCircle(this.positionX, this.positionY, this.radius)
      .endFill();

    puckContainer.addChild(puck);
  }

  UpdatePosition(secondsPassed: number) {
    const gravity = 9.81;

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    this.velocityY += gravity * secondsPassed;
  }

  ResetPostion() {
    this.positionX = 250;
    this.positionY = 100;
  }
}
