
const main = () => {
    const app = new EGAK.App({
        width: 300,
        height: 400,
        autoStyleCanvas: false,
        canvas: document.getElementById('canvas')
    });

    app.loader.add('aza', './images/aza.png');
    app.loader.loadAll();

    const setup = () => {
        const aza = new EGAK.Sprite(new EGAK.Texture(app.loader.get('aza')));
        app.baseStage.addChild(aza);

        app.render();
    }

    const loop = () => {

        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    app.loader.loadThen(setup);

}

window.onload = main;