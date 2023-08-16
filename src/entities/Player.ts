import GameScene from "../scenes/Game";

class Player extends Phaser.Physics.Arcade.Sprite {
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  declare scene: GameScene;

  constructor(scene: GameScene, x: number, y: number, key: string) {
    super(scene, x, y, key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }
  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // this.setDisplaySize(94, 94);
    // this.setFlipX(true);

    this.setGravityY(5000);
    this.setCollideWorldBounds(true);

    this.registerAnimations();

    this.scene.input.on("pointerdown", () => {
      this.doJump();
    });

    this.registerPlayerControl();
  }

  doJump() {
    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();
    if (onFloor) {
      this.setVelocityY(-1700);
    }
  }

  registerPlayerControl() {
    const spaceBar = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    spaceBar.on("down", () => {
      this.doJump();
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

  die() {
    this.anims.pause();
    this.setTexture("dino-hurt");
  }

  update() {
    const { space, down } = this.cursors;
    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isDownJustDown = Phaser.Input.Keyboard.JustDown(down);
    const isDownJustUp = Phaser.Input.Keyboard.JustUp(down);

    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (isSpaceJustDown && onFloor) {
      this.doJump();
    }

    if (isDownJustDown && onFloor) {
      this.body.setSize(this.body.width, 58);
      this.body.setOffset(30, 36);
    }
    if (isDownJustUp && onFloor) {
      this.body.setSize(this.body.width, 94);
      this.body.setOffset(0, 0);
    }

    if (!this.scene.isGameRunning) {
      return;
    }

    if (this.body.deltaAbsY() > 0) {
      this.anims.stop();
    } else {
      this.playRunAnimation();
    }
  }

  playRunAnimation() {
    this.body.height <= 58
      ? this.play("dino-down", true)
      : this.play("dino-run", true);
  }

  registerAnimations() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNames("dino-run", { start: 2, end: 3 }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "dino-down",
      frames: this.anims.generateFrameNames("dino-down"),
      frameRate: 10,
      repeat: -1,
    });
  }
}

export default Player;
