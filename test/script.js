
const main = () => {
    const canvas = document.getElementById('canvas');
    canvas.style.width = '300px';
    canvas.style.height = '400px';

    const app = new EGAK.App({
        width: 600,
        height: 800,
        canvas: document.getElementById('canvas')
    });

    app.loader.add('aza', './images/aza.png');
    app.loader.loadAll();

    const setup = () => {
        const aza = new EGAK.Sprite(new EGAK.Texture(app.loader.get('aza'), 'NEAREST'));
        app.baseStage.addChild(aza);
        aza.scale.x = 5;
        aza.scale.y = 5;

        const text = new EGAK.Text('あいうえおかきくけこ', {fontSize: 60, font: 'sans-serif'}, {x: 2*1.25, y: 2*1.25});
        text.position.y = 300;
        app.baseStage.addChild(text);

        const loop = () => {
            app.clearScreen(100, 100, 100, 1);
    
    
            app.render();
    
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }


    

    app.loader.loadThen(setup);

}

window.onload = main;