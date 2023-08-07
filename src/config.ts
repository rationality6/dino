import Phaser from "phaser";

export default {
  type: Phaser.AUTO,
  parent: "game",
  scale: {
    width: 1000,
    height: 400,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  transparent: true,
};
