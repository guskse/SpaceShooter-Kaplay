export function loadAssets(k) {
  k.loadSpriteAtlas("www/sprites/sprites.png", {
    ship: { x: 0, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    laser: { x: 32, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    enemy: { x: 16, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
    bullet: { x: 0, y: 16, width: 16, height: 16, sliceX: 0, sliceY: 0 },
  });

  k.loadSpriteAtlas("www/sprites/spaceship.png", {
    spaceship: { x: 0, y: 0, width: 16, height: 16, sliceX: 0, sliceY: 0 },
  });

  k.loadSpriteAtlas("www/sprites/bg.png", {
    backgroundImg: {
      x: 16,
      y: 16,
      width: 64,
      height: 64,
      sliceX: 0,
      sliceY: 0,
    },
  });

  //LOAD
  k.loadFont("press2p", "www/fonts/PressStart2P-Regular.ttf");
  k.loadSound("laser", "www/sfx/laser.wav");
  k.loadSound("bullet", "www/sfx/bullet.wav");
  k.loadSound("explode", "www/sfx/explode.wav");
  k.loadSound("bg", "www/music/Groove1.ogg");
}
