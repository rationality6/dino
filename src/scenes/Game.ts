import Phaser from "phaser";
import { SpriteWithDynamicBody } from "../types";
import Player from "../entities/Player";

class GameScene extends Phaser.Scene {
  player: any;
  startTrigger!: SpriteWithDynamicBody

  constructor() {
    super("GameScene");
  }

  get gemeHeight() {
    return this.game.config.height as number;
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    this.load.image("lee", "assets/lee_final.png");
  }

  create() {
    this.add.tileSprite(0, this.gemeHeight, 1000, 26, "ground").setOrigin(0, 1);
    this.createPlayer();

    this.startTrigger = this.physics.add.sprite(100, 200, null);
    this.physics.add.overlap(this.player, this.startTrigger, () => {
      console.log("collision")
    })
  }

  update(time: number, delta: number): void {
    
  }

  createPlayer() {
    this.player = new Player(this, 100, 310, "lee");
  }
}

export default GameScene;
