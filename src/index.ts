import Phaser from 'phaser';
import config from './config';
import GameScene from './scenes/Game';
import OpeningScene from './scenes/Opening';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      // new OpeningScene,
      new GameScene,
    ]
  })
);
