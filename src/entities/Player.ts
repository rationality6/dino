class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
  }
  init() {
    this.displayHeight = 80;
    this.displayWidth = 80;

    // this.setBodySize(550, 550);
    this.setFlipX(true);
    this.setGravityY(3000);
    this.setCollideWorldBounds(true);
    this.registerPlayerControl();
  }

  registerPlayerControl() {
    const spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.setVelocityY(-1000);
    });

    const arrowRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    arrowRight.on("down", () => {
      this.setFlipX(true);
      this.setVelocityX(300);
    })
    arrowRight.on("up", () => {
      this.setFlipX(true);
      this.setVelocityX(0);
    })

    const arrowLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    arrowLeft.on("down", () => {
      this.setFlipX(false);
      this.setVelocityX(-300);
    })
    arrowLeft.on("up", () => {
      this.setFlipX(false);
      this.setVelocityX(0);
    })
  }
}

export default Player;
