import * as PIXI from "./node_modules/pixi.js/dist/pixi.mjs";

const app = new PIXI.Application({ 
    width: 900,
    height: 900,
    background: '#0x004677' 
});
document.body.appendChild(app.view);

const container = new PIXI.Container();

app.stage.addChild(container);

const hole = new PIXI.Graphics()
.beginFill(0x11191F)
.drawCircle(450, 300, 20)
.endFill()

container.addChild(hole);

const n = 9;
let pins = "";

//Middle Column 
for (let row = 2; row < n; row++) {
    for (let pinIndex = 0; pinIndex < 2 * row - 1 ; pinIndex++) {

        const pin = new PIXI.Graphics()
        .beginFill(0xFFFFFF)
        .drawCircle(450, 250 + (row * 50), 5)
        .endFill()

        container.addChild(pin);
    }
}
let pinRowCount = 2;

while (pinRowCount < 9) {
    for (let row = pinRowCount; row < n; row++) {
        for (let pinIndex = 0; pinIndex < 2 * row - 1 ; pinIndex++) {
    
            const pin = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .drawCircle(500 - (50 * pinRowCount), 250 + (row * 50), 5)
            .endFill()
    
            container.addChild(pin);
        }
        for (let pinIndex = 0; pinIndex < 2 * row - 1 ; pinIndex++) {
    
            const pin = new PIXI.Graphics()
            .beginFill(0xFFFFFF)
            .drawCircle(400 + (50 * pinRowCount), 250 + (row * 50), 5)
            .endFill()
    
            container.addChild(pin);
        }
    }

    pinRowCount++;
}

//Ball
const ball = new PIXI.Graphics()
.beginFill(0xB7312C)
.drawCircle(450, 300, 10)

container.addChild(ball);

//Ball
for (let index = 0; index < 14; index++) {
    const bucket = new PIXI.Graphics()
    .beginFill(0xF0D020)
    .lineStyle(1, 0xB7312C)
    .drawRect(110 + (50 * index), 675, 30, 50)

    container.addChild(bucket);
}


// Listen for animate update
app.ticker.add((delta) => {

});