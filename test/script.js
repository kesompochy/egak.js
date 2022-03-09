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
            stroke: '#001100',
            strokeWidth: 1,
            shadow: '#ff0000',
            shadowX: 2, shadowY: 4
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


        const rr = new EGAK.Graphics.RoundedRect(50, 50, 200, 100, 30, [255, 255, 0, 1], [0, 255, 0, 1], [255, 0, 255, 1], [0, 255, 255, 1]);
        rr.stroke = {r: 100, g: 0, b: 100, a: 1};
        rr.strokeWidth = 10;
        app.baseStage.addChild(rr);

        const circle = new EGAK.Graphics.Circle(60, 60, 20, 255, 100, 50, 1, 0, Math.PI*2);
        app.baseStage.addChild(circle);
        circle.position.set(100, 200);
        circle.stroke = {r: 0, g: 100, b: 0, a: 1};
        circle.strokeWidth = 3;



        let t=0;
        const loop = () => {
            t ++;
            app.clearScreen(200, 200, 200, 1);



            text.style.fill = `rgb(${(Math.random()*256)|0}, ${(Math.random()*256)|0}, ${(Math.random()*256)|0})`;
            text.text = (Math.random()*100000)|0;

            //rec.rotation += Math.PI/30;

            sprite.rotation += Math.PI/30;


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
