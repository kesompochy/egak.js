
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
        console.log('setup')
    }

    app.loader.loadThen(setup);

}

window.onload = main;