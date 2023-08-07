import Phaser from "phaser";

class OpeningScene extends Phaser.Scene {

  constructor() {
    super("OpeningScene");
  }

  get gemeHeight() {
    return this.game.config.height as number;
  }

  preload() {
    this.load.image("ground", "assets/ground.png");

    this.load.image("lee", "assets/lee_final.png");
  }

  createLee() {
    [-360, -720, -1040, -1140];
    const lee = this.physics.add.image(-360, 310, "lee");
    lee.displayHeight = 80;
    lee.displayWidth = 80;
    lee.setFlipX(true);

    const lee2 = this.physics.add.image(-720, 330, "lee");
    lee2.displayHeight = 80;
    lee2.displayWidth = 80;
    lee2.setFlipX(true);

    const lee3 = this.physics.add.image(-1040, 350, "lee");
    lee3.displayHeight = 80;
    lee3.displayWidth = 80;
    lee3.setFlipX(true);

    const lee4 = this.physics.add.image(-540, 360, "lee");
    lee4.displayHeight = 80;
    lee4.displayWidth = 80;
    lee4.setFlipX(true);

    this.tweens.add({
      targets: lee,
      x: 1360,
      flipX: true,
      yoyo: true,
      duration: 4000,
      repeat: -1,
    });
    this.tweens.add({
      targets: lee2,
      x: 1100,
      flipX: true,
      yoyo: true,
      duration: 4000,
      repeat: -1,
    });
    this.tweens.add({
      targets: lee3,
      x: 1200,
      flipX: true,
      yoyo: true,
      duration: 4000,
      repeat: -1,
    });
    this.tweens.add({
      targets: lee4,
      x: 1300,
      flipX: true,
      yoyo: true,
      duration: 4000,
      repeat: -1,
    });
  }

  create() {

    this.add.tileSprite(0, this.gemeHeight, 1000, 26, "ground").setOrigin(0, 3);

    this.createLee();

    const logo = this.add.text(210, 210, "잼잼 이잼 이잼~", {
      fontSize: "40px",
      color: "#000",
    });

    this.input.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
  }
}

export default OpeningScene;
