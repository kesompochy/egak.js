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
        const text = new EGAK.Text('hoge');
        const stage = new EGAK.Stage();

        app.baseStage.addChild(stage);
        stage.addChild(sprite);
        sprite.addChild(text);
        stage.scale.set(0.6, 1.2);
        text.anchor.set(10, 10);
        text.position.set(50, 100);
        sprite.position.set(100, 50);
        sprite.scale.set(1.2, 2);
        text.addEventListener('pointerdown', ()=>{
            console.log('click');
        });
        sprite.addEventListener('pointermove', ()=>{
            console.log('むいむい');
        })

        const loop = () => {

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
