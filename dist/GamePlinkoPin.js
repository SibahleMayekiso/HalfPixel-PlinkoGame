import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameAsset } from "./GameAsset.js";
import { container } from "./app.js";
export class GamePlinkoPin extends GameAsset {
    constructor(positionX, positionY, velocityX, velocityY) {
        super(positionX, positionY, velocityX, velocityY);
        this.radius = 5;
    }
    GeneratePin() {
        const pin = new PIXI.Graphics()
            .beginFill(0xffffff)
            .drawCircle(this.positionX, this.positionY, this.radius)
            .endFill();
        container.addChild(pin);
    }
}
