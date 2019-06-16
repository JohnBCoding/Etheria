// Wait for page to fully load before running game.
window.addEventListener('load', function() {
    var config = {
        type: Phaser.AUTO,
        backgroundColor: '#424242',
        pixelArt: true,
        antialias: false,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
            width: 256,
            height: 256,
            //width: 1024,
            //height: 896,
            max: {
                width: 1024,
                height: 1024
            },
            parent: 'game_container'
        },
        scene: [PreloadScene, GameScene, GUIScene]
    };

    game = new Phaser.Game(config);
});

