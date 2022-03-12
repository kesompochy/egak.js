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
    app.enablePointerEvent('pointerdown', 'pointermove', 'pointerup', 'pointerout');
    
    const setup = () => {
        const sprite = new EGAK.Sprite(app.loader.get('image'));
        const text = new EGAK.Text('hoge', {
            fontSize: 60,
            stroke: {r: 255, g: 0, b: 0, a: 1},
            strokeWidth: 1,
            fill: {r: 0, g: 255, b: 0, a: 0.5}
        });
        const stage = new EGAK.Stage();

        app.baseStage.addChild(stage);
        stage.addChild(sprite);
        stage.addChild(text);
        text.position.set(100, 100);


        sprite.position.set(60, 300);

        sprite.normalAnchor.set(0.5);

        text.addEventListener('pointerdown', (co)=>{
            console.log('click')
        });
        sprite.addEventListener('pointerdown', ()=>{
            console.log('むいむい');
            app.preventTouchScrolling = true;
            sprite.x += 1;
        });

        let dragging = false;
        app.baseStage.addEventListener('pointerdown', (co)=>{
            text.position.set(co.x, co.y);
            dragging = true;
        }); 
        app.baseStage.addEventListener('pointermove', (co)=>{
            console.log('a');
            if(dragging) text.position.set(co.x, co.y);
        });
        app.baseStage.addEventListener('pointerup', ()=>{
            dragging = false;
        });


        const wid = 20;
        const hei = 30;
        const ellipse = new EGAK.Graphics.Ellipse(
            0, 0, wid, hei, {r: 100, g: 0, b: 255, a: 1}
        );
        ellipse.stroke = {r: 255, g: 25, b: 0, a: 1};
        ellipse.strokeWidth = 2;
        app.baseStage.addChild(ellipse);
        ellipse.position.set(200, 300);

        const circle = new EGAK.Graphics.Circle(
            0, 0, 30, 200, 200, 0, 1, 0, Math.PI*2
        );
        circle.stroke = {r: 0, g: 0, b: 100, a: 1};
        circle.strokeWidth = 2;
        app.baseStage.addChild(circle);
        circle.position.set(50, 100);

        const rr = new EGAK.Graphics.RoundedRect(
            0, 0, 30, 40, 5,
            [255, 0, 0, 1],[0, 255, 0, 1],[0, 0, 255, 1],[255, 255, 0, 1],
        );
        app.baseStage.addChild(rr);
        rr.stroke = {r: 100, g: 3, b: 200, a: 0.5};
        rr.strokeWidth = 2;
        rr.position.set(100, 50);
        rr.anchor.set(15, 20);


        let t=0;
        const FPS = 60;
        const FPS_MILLI = FPS/1000;
        let prevTimestamp = 0;
        const digit = 2;
        const loop = (timestamp) => {
            t ++;
            app.clearScreen(200, 200, 200, 1);

            //sprite.rotation += Math.PI/30;

            //rr.scale.x += 0.01;
            //rr.scale.y += 0.01;
            
            const elapsed = timestamp - prevTimestamp;
            text.text = (elapsed*FPS_MILLI).toFixed(2);
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
