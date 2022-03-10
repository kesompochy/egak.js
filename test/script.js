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


        const line = new EGAK.Graphics.Line(
            [100, 50, 20, 100, 50, 1], [200, 100, 255, 0, 255, 1]
        );
        app.baseStage.addChild(line);

        const circle = new EGAK.Graphics.Circle(100, 100, 50, 255, 255, 0, 1, 0, Math.PI*2);
        app.baseStage.addChild(circle);

        const rect = new EGAK.Graphics.Rectangle(10, 10, 200, 50, 
            [0, 0, 255, 1], [255, 0, 255, 1], [255, 0, 0, 1], [0, 0, 0, 1]);
        app.baseStage.addChild(rect);
        rect.stroke = {r: 0, g: 0, b: 255, a: 1};
        rect.strokeWidth = 10;

        const rr = new EGAK.Graphics.RoundedRect(
            0, 0, 50, 200, 10,
            [0, 0, 255, 1], [255, 0, 255, 1], [255, 0, 0, 1], [0, 0, 0, 1]
        );
        app.baseStage.addChild(rr);
        rr.position.set(200,50);



        let t=0;
        const FPS = 60;
        const FPS_MILLI = FPS/1000;
        let prevTimestamp = 0;
        const digit = 2;
        const mult = 10**digit;
        const loop = (timestamp) => {
            t ++;
            app.clearScreen(200, 200, 200, 1);



            line.getGeometry()[0][0] -= 1;
            //text.style.fill = `rgb(${(Math.random()*256)|0}, ${(Math.random()*256)|0}, ${(Math.random()*256)|0})`;

            //rec.rotation += Math.PI/30;
            circle.getGeometry().radius -= 0.1;

            sprite.rotation += Math.PI/30;

            rect.strokeWidth -= 0.01;
            rect.stroke.b -= 1;

            rr.getGeometry().radius += 0.01;
            rr.getGeometry().colors[0][2] -= 1;
            
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
