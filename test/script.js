//import * as EGAK from 'egak.js';
const main = () => {
    const canvas = document.getElementById('canvas');
    canvas.style.width = '450px';
    canvas.style.height = '600px';
    const app = new EGAK.App({
        width: 300,
        height: 400,
        canvas: canvas,
    });
    
    const setup = () => {
        const sprite = new EGAK.Sprite(app.loader.get('image'));
        const text = new EGAK.Text('hoge', {
            fontSize: 30,
            stroke: {r: 255, g: 0, b: 0, a: 1},
            strokeWidth: 1,
            fill: {r: 0, g: 255, b: 0, a: 0.5}
        });
        const stage = new EGAK.Stage();

        app.baseStage.addChild(stage);
        stage.addChild(sprite);
        stage.addChild(text);
        text.position.set(50, 20);


        sprite.position.set(60, 300);

        sprite.normalAnchor.set(0.5);

        text.addEventListener('pointerdown', ()=>{
            if(text.parent){
                sprite.removeChild(text);
            }
            console.log('click')
        });
        sprite.addEventListener('pointerdown', ()=>{
            console.log('むいむい');
            if(!text.parent){
                sprite.addChild(text);
            }
        });


        const wid = 300;
        const hei = 200;
        const ellipse = new EGAK.Graphics.Ellipse(
            60, 150, wid, hei, {r: 100, g: 0, b: 255, a: 1}
        );
        ellipse.stroke = {r: 255, g: 25, b: 0, a: 1};
        ellipse.strokeWidth = 10;
        app.baseStage.addChild(ellipse);



        let t=0;
        const FPS = 60;
        const FPS_MILLI = FPS/1000;
        let prevTimestamp = 0;
        const digit = 2;
        const mult = 10**digit;
        const loop = (timestamp) => {
            t ++;
            app.clearScreen(200, 200, 200, 1);


            
            const elapsed = timestamp - prevTimestamp;
            text.text = ((elapsed*FPS_MILLI * mult) | 0)/mult;
            prevTimestamp = timestamp;

            app.render();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    app.loader.add('image', './images/image.png', 'NEAREST')
            .add('image2', './images/image2.png', 'NEAREST')
            .loadThen(setup);
        
    app.loader.loadAll();
    
}

window.onload = main;
