import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameAsset } from "./GameAsset.js";
import { container } from "./app.js";


export class GamePlinkoPin extends GameAsset {
  radius: number;
  restitution: number;
  mass: number

  constructor(positionX: number, positionY: number, velocityX: number, velocityY: number) {
    super(positionX, positionY, velocityX, velocityY);
    this.radius = 5;
    this.restitution = 0.5;
    this.mass = 75;
  }

  GeneratePin() {
    const pin = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawCircle(this.positionX, this.positionY, this.radius)
      .endFill();

    container.addChild(pin);

  }
}
