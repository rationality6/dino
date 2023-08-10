import Phaser from 'phaser';
import config from './config';

import PlayScene from './scenes/Play';
import OpeningScene from './scenes/Opening';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      // new OpeningScene,
      new PlayScene,
    ]
  })
);
