export function makeMenu(k) {
  return k.scene("menu", () => {
    k.add([
      k.text("HOW TO PLAY:", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.pos(k.center().x, k.center().y + 128),
    ]);

    k.add([
      k.text("Space to fire, arrow keys to move around", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.pos(k.center().x, k.center().y + 186),
    ]);

    const startButton = k.add([
      k.rect(340, 60, 0, 0),
      k.pos(k.center().x, k.center().y),
      k.color(k.Color.fromHex("#306850")),
      k.anchor("center"),
      k.area(), //hitbox
      "startButton",
    ]);

    startButton.add([
      k.text("Start Game", { size: 32, font: "press2p" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#071821")),
    ]);

    k.onHover("startButton", () => {
      startButton.color = k.Color.fromHex("#e0f8cf");
    });

    k.onHoverEnd("startButton", () => {
      startButton.color = k.Color.fromHex("#306850");
    });

    k.onClick("startButton", () => {
      k.go("game"); //go to game scene
    });
  });
}
