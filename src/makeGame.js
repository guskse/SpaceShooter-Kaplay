export function makeGame(k) {
  return k.scene("game", () => {
    //create game objects

    //game music
    const music = k.play("bg", { volume: 0.03, loop: true });

    //background
    const background = k.add([
      k.pos(0, 0),
      k.sprite("backgroundImg", { width: 720, height: 720, tiled: true }),
      k.scale(4),
    ]);

    //hud
    const hudBox = k.add([
      k.pos(0, 0),
      k.rect(1280, 60),
      k.outline(4),
      k.color(k.Color.fromHex("#071821")),
      k.z(10), //z index
    ]);

    //score
    const score = k.add([
      k.pos(600, 20),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.text("Score: 0", {
        size: 32,
        font: "press2p",
      }),
      k.z(10),
      { value: 0 }, //value will be incremented
    ]);

    //score
    const life = k.add([
      k.pos(20, 20),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.text("Life: 3", {
        size: 32,
        font: "press2p",
      }),
      k.z(10),
      { value: 0 }, //value will be incremented
    ]);

    //player
    const player = k.add([
      k.pos(k.center().x, 700 - 64),
      k.sprite("spaceship"),
      k.area(),
      k.body(), //makes it interact with the game, physics, etc.
      k.anchor("center"),
      k.scale(4),
      { speed: 800, life: 3 }, //speed variable
      "player", //gives it a tag name called player
    ]);

    //make enemy function
    function makeEnemy() {
      return k.add([
        k.pos(k.rand(k.vec2(k.width() - 16, 0))), //position the enemy will spawn in
        k.sprite("enemy"),
        k.area(),
        k.anchor("center"),
        k.scale(4),
        {
          speed: 300,
          fireTimer: 0,
          fireTime: k.rand(10, 100),
        },
        "enemy",
      ]);
    }

    //spawn 5 enemies
    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();
    makeEnemy();

    //Controls

    //MOVEMENT LEFT
    k.onKeyDown("left", () => {
      player.move(-player.speed, 0);
      if (player.pos.x <= 32) {
        player.pos.x = 32;
      }
    });

    //MOVEMENT RIGHT
    k.onKeyDown("right", () => {
      player.move(player.speed, 0);
      if (player.pos.x >= 1280 - 32) {
        player.pos.x = 1280 - 32;
      }
    });

    //MOVEMENT UP
    k.onKeyDown("up", () => {
      player.move(0, -player.speed);
      if (player.pos.y <= 0) {
        player.pos.y = 0;
      }
    });

    //MOVEMENT DOWN
    k.onKeyDown("down", () => {
      player.move(0, player.speed);
      if (player.pos.y >= 720 - 32) {
        player.pos.y = 720 - 32;
      }
    });

    //SHOOTING LASER
    k.onKeyPress("space", () => {
      k.play("laser", { volume: 0.01 }); //play laser sound fx
      k.add([
        k.pos(player.pos.x, player.pos.y - 64), //will spawn at player position
        k.sprite("laser"),
        k.area(),
        k.anchor("center"),
        k.offscreen({ destroy: true }), //it will be destroyed when it goes offscreen
        k.scale(4),
        { speed: 1000 },
        "laser", //gives it a tag called laser
      ]);
    });

    //GAME LOOP
    //player laser
    k.onUpdate("laser", (laser) => {
      laser.move(0, -laser.speed);
    });

    //enemy bullet
    k.onUpdate("bullet", (bullet) => {
      bullet.move(0, bullet.speed);
    });

    k.onUpdate("enemy", (enemy) => {
      enemy.move(0, enemy.speed);
      enemy.fireTimer++;

      if (enemy.pos.y >= 784) {
        k.destroy(enemy);
        makeEnemy(k);
      }

      if (enemy.fireTimer >= enemy.fireTime) {
        k.play("bullet", { volume: 0.01 }); //play sfx
        k.add([
          k.pos(enemy.pos.x, enemy.pos.y + 32),
          k.sprite("bullet"),
          k.area(),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.scale(4),
          { speed: 500 },
          "bullet", //bullet is the tag name of the enemy attack
        ]);
        enemy.fireTimer = 0;
      }
    });

    //COLLISION
    k.onCollide("laser", "enemy", (laser, enemy) => {
      k.play("explode", { volume: 0.01 });
      score.value += 1;
      score.text = "Score: " + score.value;
      k.destroy(enemy);
      k.destroy(laser);
      makeEnemy();
    });

    k.onCollide("player", "enemy", (player, enemy) => {
      k.destroy(enemy);
      if (player.life < 1) {
        k.destroy(player);
        k.play("explode", { volume: 0.01 });
        music.stop();
        k.go("gameOver"); //call the game over scene
      } else {
        player.life -= 1;
        life.value = player.life;
        life.text = "Life: " + life.value;
      }
    });

    k.onCollide("player", "bullet", (player, bullet) => {
      k.destroy(bullet);
      k.play("explode", { volume: 0.01 });
      if (player.life < 1) {
        k.destroy(player);
        music.stop();
        k.go("gameOver");
      } else {
        player.life -= 1;
        life.value = player.life;
        life.text = "Life: " + life.value;
      }
    });
  });
}
