import kaplay from "kaplay";

import { loadAssets } from "./loadAssets";
import { makeMenu } from "./makeMenu";
import { makeGame } from "./makeGame";
import { makeGameOver } from "./makeGameOver";

const k = kaplay({
  letterbox: true,
  width: 1280,
  height: 720,
  crisp: true,
  global: false,
});

k.setBackground(k.Color.fromHex("#071821"));

loadAssets(k); //load assets (sprites, sounds, etc from loadAssets.js)
makeMenu(k); //load makeMenu from makeMenu.js
makeGame(k); //load game scene configs
makeGameOver(k); //load gameover scene configs

//initialize game
k.go("menu"); //go to menu scene (created in the makeMenu.js)
