import Phaser from "phaser";
import { SpriteWithDynamicBody } from "../types";
import Player from "../entities/Player";
import GameScene from "./Game";

class PlayScene extends GameScene {
  player!: Player;
  startTrigger!: SpriteWithDynamicBody;
  ground!: Phaser.GameObjects.TileSprite;

  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    this.load.image("lee", "assets/lee_final.png");
    this.load.image("dino", "assets/dino-idle.png");

    this.load.spritesheet("dino-run", "assets/dino-run.png",{
      frameWidth: 88,
      frameHeight: 94,
    });
  }

  setStartTrigger() {
    this.startTrigger = this.physics.add
      .sprite(60, 250, '')
      .setAlpha(0)
      .setOrigin(0, 0);

    this.physics.add.overlap(this.startTrigger, this.player, () => {
      if (this.startTrigger.x === 60) {
        this.startTrigger.body.reset(60, 380);
      }

      this.startTrigger.body.reset(9999, 9999);

      const rollOutEvent = this.time.addEvent({
        delay: 1000 / 60,
        loop: true,
        callback: () => {
          this.ground.width = this.ground.width + 17 * 2;
          this.player.playRunAnimation()
          if (this.ground.width >= this.gameWidth) {
            console.log("ground width", this.ground.width);
            rollOutEvent.remove();
            this.isGameRunning = true;
          }
        },
      });

    });
  }

  create() {
    this.createEnvironment();
    this.createPlayer();

    this.setStartTrigger();

  }

  update(time: number, delta: number): void {}

  createPlayer() {
    this.player = new Player(this, 100, 350, "dino");
  }

  createEnvironment() {
    this.ground = this.add
      .tileSprite(0, this.gemeHeight, 88, 26, "ground")
      .setOrigin(0, 1);
  }

  
}

export default PlayScene;
