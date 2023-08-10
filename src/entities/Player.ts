class Player extends Phaser.Physics.Arcade.Sprite {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }
  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.displayHeight = 80;
    this.displayWidth = 80;

    this.setGravityY(3000);
    this.setCollideWorldBounds(true);

    this.registerAnimations();
  }

  registerPlayerControl() {
    const spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.setVelocityY(-1200);
    });

    const arrowRight = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    arrowRight.on("down", () => {
      this.setFlipX(true);
      this.setVelocityX(300);
    });
    arrowRight.on("up", () => {
      this.setFlipX(true);
      this.setVelocityX(0);
    });

    const arrowLeft = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    arrowLeft.on("down", () => {
      this.setFlipX(false);
      this.setVelocityX(-300);
    });
    arrowLeft.on("up", () => {
      this.setFlipX(false);
      this.setVelocityX(0);
    });
  }

  update() {
    const { space } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (isSpaceJustDown && onFloor) {
      this.setVelocityY(-1300);
    }

    if (this.body.deltaAbsY() > 0) {
      this.anims.stop();
    }else{
      this.playRunAnimation();
    }
  }

  playRunAnimation() {
    this.play("dino-run", true);
  }

  registerAnimations() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNames("dino-run", { start: 2, end: 3 }),
      frameRate: 20,
      repeat: -1,
    });
  }
}

export default Player;
