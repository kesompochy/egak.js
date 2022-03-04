
const main = () => {
    const canvas = document.getElementById('canvas');
    canvas.style.width = '600px';
    canvas.style.height = '800px';

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
        aza.opacity = 1;

        const text = new EGAK.Text('あいうえおかきくけこ', 
        {fontSize: 60, fill: '#00ff00', font: 'sans-serif',});
        text.position.y = 0;
        text.opacity = 1;
        aza.addChild(text);

        const loop = () => {
            app.clearScreen(0, 0, 0, 1);
    
    
            app.render();
    
            requestAnimationFrame(loop);
        }

        requestAnimationFrame(loop);
    }


    

    app.loader.loadThen(setup);

}

window.onload = main;