import Phaser from "phaser";
import { SpriteWithDynamicBody } from "../types";
import Player from "../entities/Player";
import GameScene from "./Game";

class PlayScene extends GameScene {
  player!: Player;
  startTrigger!: SpriteWithDynamicBody;
  ground!: Phaser.GameObjects.TileSprite;

  isGameRunning: boolean = false;

  gameScore: number = 0;
  scoreText: string = 0;
  highScore: number = 0;
  highScoreText: string = 0;

  spawnInterval: number = 1200;
  spawnTime: number = 0;

  gameOverText!: Phaser.GameObjects.Image;
  restartText!: Phaser.GameObjects.Image;
  gameOverContainer!: Phaser.GameObjects.Container;

  obstacleGroup!: Phaser.Physics.Arcade.Group;
  obstacleSpeed: number = 10;

  constructor() {
    super("PlayScene");
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    this.load.image("lee", "assets/lee_final.png");
    this.load.image("dino", "assets/dino-idle.png");
    this.load.image("dino-hurt", "assets/dino-hurt.png");

    [...Array(6).keys()].forEach((i) => {
      const number = i + 1;
      this.load.image(
        `cactus${number}`,
        `assets/obstacles/cactuses_${number}.png`
      );
    });

    this.load.image("restart", "assets/restart.png");
    this.load.image("game-over", "assets/game-over.png");

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

    this.physics.add.collider(this.player, this.obstacleGroup, () => {
      this.player.die();
      this.gameOverContainer.setAlpha(1);
      this.physics.pause();
      this.isGameRunning = false;
    });

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

    this.scoreText = this.add.text(50, 50, this.gameScore.toString(), {
      fontSize: "30px",
      fill: "#000000",
    });

    this.highScoreText = this.add.text(250, 50, this.highScore.toString(), {
      fontSize: "30px",
      fill: "#000000",
    });

    this.gameOverText = this.add.image(0, 0, "game-over");
    this.restartText = this.add.image(0, 80, "restart").setInteractive();
    this.gameOverContainer = this.add
      .container(this.gameWidth / 2, this.gameHeight / 2 - 50)
      .add([this.gameOverText, this.restartText])
      .setAlpha(0);

    this.restartText.on("pointerdown", () => {
      this.physics.resume();
      this.player.setVelocityY(0);
      this.obstacleGroup.clear(true, true);
      this.gameOverContainer.setAlpha(0);
      this.anims.resumeAll();

      if (this.gameScore > this.highScore) {
        this.highScore = this.gameScore;
        this.highScoreText.setText(`${this.highScore}`);
      }

      this.gameScore = 0;
      this.isGameRunning = true;
    });
  }

  update(time: number, delta: number): void {
    this.spawnTime += delta;

    if (this.isGameRunning) {
      
      this.gameScore += 1;
      this.scoreText.setText(`${this.gameScore}`);

      if (this.spawnTime >= this.spawnInterval) {
        this.spawnObstacle();
        this.spawnTime = 0;
      }

      Phaser.Actions.IncX(
        this.obstacleGroup.getChildren(),
        -this.obstacleSpeed
      );

      this.obstacleGroup
        .getChildren()
        .forEach((obstacle: SpriteWithDynamicBody) => {
          if (obstacle.getBounds().right < 0) {
            this.obstacleGroup.remove(obstacle);
          }
        });

      this.ground.tilePositionX += this.obstacleSpeed;
    }
  }

  spawnObstacle() {
    const selectedNumber = Math.floor(Math.random() * 6) + 1;
    const distance = Phaser.Math.Between(1000, 1400);

    const obstacle = this.obstacleGroup
      .create(distance, this.gameHeight, `cactus${selectedNumber}`)
      .setOrigin(0, 1);

    obstacle.setImmovable(true);
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
