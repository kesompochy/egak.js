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
        const text = new EGAK.Text('hoge');
        const stage = new EGAK.Stage();

        app.baseStage.addChild(stage);
        stage.addChild(sprite);
        stage.addChild(text);
        text.position.set(50, 20);
        sprite.zIndex = 2;
        text.zIndex = 3;

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

        const line = new EGAK.Graphics.Line([0, 0, 100, 200, 200, 1], [100, 100, 0, 0, 256, 0.3], [50, 200, 256, 0, 0, 1]);
        app.baseStage.addChild(line);

        let t=0;
        const loop = () => {
            t ++;
            app.clearScreen(0, 0, 0, 1);

            text.style.fill = `rgb(${(Math.random()*256)|0}, ${(Math.random()*256)|0}, ${(Math.random()*256)|0})`;
            text.text = (Math.random()*100000)|0;

            line.getVertex(0).x += 1;
            line.getVertex(1).y += 2;

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
