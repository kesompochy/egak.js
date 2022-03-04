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
        const texture = new EGAK.Texture(app.loader.get('image'));
        const sprite = new EGAK.Sprite(texture);
        app.baseStage.addChild(sprite);
        sprite.x = 100;
        sprite.position.set(50, 50);

        const stage = new EGAK.Stage();
        stage.position.y = 200;
        app.baseStage.addChild(stage);
        stage.scale.x = 2;

        const sprite2 = new EGAK.Sprite(new EGAK.Texture(app.loader.get('image2')));
        sprite2.opacity = 0.5;
        sprite2.anchor.set(20, 30);
        sprite2.rotation = -Math.PI/8;

        app.baseStage.addEventListener('click', ()=>{
            console.log('click');
        })

        const text = new EGAK.Text('hogehoge', {
            fontSize: 60, fill: '#00ff00', font: 'sans-serif',
            stroke: '#f0f', strokeWidth: 1,
            shadow: '#fff', shadowX: 2, shadowY: 3, shadowBlur: 2
        });
        text.rotation = Math.PI/4;

        stage.addChild(sprite2);
        stage.addChild(text);



        sprite.position.set(100, 100);
        sprite.rotation = Math.PI/4;
        sprite.anchor.x = 40;
        sprite.anchor.y = 20;
        sprite.getBoundingRect();

        app.clearScreen(0, 0, 0, 1);
        app.render();

        let t = 0;
        const loop = () => {
            sprite.rotation += 0.1;

            app.clearScreen(0, 0, 0, 1);
            app.render();
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }

    app.loader.add('image', './images/image.png')
            .add('image2', './images/image2.png')
            .loadThen(setup);
        
    app.loader.loadAll();
    
}

window.onload = main;
