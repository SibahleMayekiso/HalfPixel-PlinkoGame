import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { GameAsset } from "./GameAsset.js";
import { puckContainer } from "./app.js";
export class GamePuck extends GameAsset {
    constructor(positionX, positionY, velocityX, velocityY) {
        super(positionX, positionY, velocityX, velocityY);
        this.coinPuck = PIXI.Sprite.from("./assets/Coin Pack/Coin9.png");
        this.radius = 10;
    }
    GeneratePuck() {
        // this.coinPuck.anchor.set(0.5);
        // this.coinPuck.width = 25;
        // this.coinPuck.height = 25;
        // this.coinPuck.x = this.positionX;
        // this.coinPuck.y = this.positionY;
        // container.addChild(this.coinPuck);
        const puck = new PIXI.Graphics()
            .beginFill(0xE33900 * Math.random() * 5)
            .drawCircle(this.positionX, this.positionY, this.radius)
            .endFill();
        puckContainer.addChild(puck);
    }
    UpdatePosition(secondsPassed) {
        const gravity = 9.81;
        this.positionX += this.velocityX;
        this.positionY += this.velocityY;
        this.velocityY += gravity * secondsPassed;
    }
    // MovePosition() {
    //   this.coinPuck.x = this.positionX;
    //   this.coinPuck.y = this.positionY;
    // }
    ResetPostion() {
        this.positionX = 250;
        this.positionY = 100;
    }
    RemovePuck() {
    }
}
