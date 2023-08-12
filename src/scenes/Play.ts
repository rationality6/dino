import Phaser from "phaser";
import { SpriteWithDynamicBody } from "../types";
import Player from "../entities/Player";
import GameScene from "./Game";

class PlayScene extends GameScene {
  player!: Player;
  startTrigger!: SpriteWithDynamicBody;
  ground!: Phaser.GameObjects.TileSprite;

  isGameRunning: boolean = false;

  spawnInterval: number = 1200;
  spawnTime: number = 0;

  obstacleGroup!: Phaser.Physics.Arcade.Group;
  obstacleSpeed: number = 18;

  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    this.load.image("lee", "assets/lee_final.png");
    this.load.image("dino", "assets/dino-idle.png");

    [...Array(5)];
    this.load.image("cactus1", "assets/obstacles/cactuses_1.png");
    this.load.image("cactus2", "assets/obstacles/cactuses_2.png");
    this.load.image("cactus3", "assets/obstacles/cactuses_3.png");
    this.load.image("cactus4", "assets/obstacles/cactuses_4.png");
    this.load.image("cactus5", "assets/obstacles/cactuses_5.png");
    this.load.image("cactus6", "assets/obstacles/cactuses_6.png");

    this.load.spritesheet("dino-run", "assets/dino-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.obstacleGroup = this.physics.add.group();
  }

  setStartTrigger() {
    this.startTrigger = this.physics.add
      .sprite(60, 250, "")
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
          this.player.playRunAnimation();
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

  update(time: number, delta: number): void {
    this.spawnTime += delta;

    if (this.isGameRunning) {
      if (this.spawnTime >= this.spawnInterval) {
        this.spawnObstacle();
        this.spawnTime = 0;
      }

      Phaser.Actions.IncX(
        this.obstacleGroup.getChildren(),
        -this.obstacleSpeed
      );

      console.log(this.obstacleGroup.getChildren().length);

      this.obstacleGroup
        .getChildren()
        .forEach((obstacle: SpriteWithDynamicBody) => {
          if (obstacle.getBounds().right < 0) {
            this.obstacleGroup.remove(obstacle);
          }
        });
    }
  }

  spawnObstacle() {
    const selectedNumber = Math.floor(Math.random() * 6) + 1;
    const distance = Phaser.Math.Between(1000, 1400);

    // let cactuse = this.physics.add.image(1000, 330, `cactus${selectedNumber}`).setOrigin(0, 0);
    // cactuse.setVelocityX(-350);

    // this.physics.add.collider(this.player, cactuse, () => {
    //   console.log("hit");
    // });

    this.obstacleGroup
      .create(distance, this.gameHeight, `cactus${selectedNumber}`)
      .setOrigin(0, 1);
  }

  createPlayer() {
    this.player = new Player(this, 100, 350, "dino");
  }

  createEnvironment() {
    this.ground = this.add
      .tileSprite(0, this.gameHeight, 88, 26, "ground")
      .setOrigin(0, 1);
  }
}

export default PlayScene;
