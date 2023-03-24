import * as PIXI from "../node_modules/pixi.js/dist/pixi.mjs";
import { container } from "./app.js";
export class GameBucketSlot {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.bucketPoints = 0;
    }
    GetBucketPoints() {
        console.log(`Bucket points: ${this.bucketPoints}`);
    }
    GenerateBucket(bucketIndex) {
        let absoulteNumber = Math.abs(bucketIndex - 5);
        switch (absoulteNumber) {
            case 4:
                this.bucketPoints = 10;
                const bucketTen = PIXI.Sprite.from("/assets/BucketAssets/10PointsBucketSlot.png");
                bucketTen.anchor.set(0.5);
                bucketTen.width = 75;
                bucketTen.height = 50;
                bucketTen.x = this.positionX;
                bucketTen.y = this.positionY;
                container.addChild(bucketTen);
                break;
            case 2:
                this.bucketPoints = 5;
                const bucketFive = PIXI.Sprite.from("/assets/BucketAssets/5PointsBucketSlot.png");
                bucketFive.anchor.set(0.5);
                bucketFive.width = 75;
                bucketFive.height = 50;
                bucketFive.x = this.positionX;
                bucketFive.y = this.positionY;
                container.addChild(bucketFive);
                break;
            case 0:
                this.bucketPoints = 2;
                const bucketTwo = PIXI.Sprite.from("/assets/BucketAssets/2PointsBucketSlot.png");
                bucketTwo.anchor.set(0.5);
                bucketTwo.width = 75;
                bucketTwo.height = 50;
                bucketTwo.x = this.positionX;
                bucketTwo.y = this.positionY;
                container.addChild(bucketTwo);
                break;
            default:
                break;
        }
    }
}
