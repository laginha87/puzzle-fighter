import { PlayerController } from '~src/controllers';

type noop = () => void;
export class KeyboardController implements PlayerController {
    constructor(private input: Phaser.Input.InputPlugin) {
    }

    onRotate(callback : noop): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.UP, callback);
    }

    onMoveLeft(callback : noop): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.LEFT, callback);
    }

    onMoveRight(callback : noop): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.RIGHT, callback);
    }

    onMoveDown(callback : noop): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.DOWN, callback);
    }

    onFall(callback : noop): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.SPACE, callback);
    }

    onSpell(callback : (n : number) => void): void {
        [
            Phaser.Input.Keyboard.KeyCodes.ONE,
            Phaser.Input.Keyboard.KeyCodes.TWO,
            Phaser.Input.Keyboard.KeyCodes.THREE,
            Phaser.Input.Keyboard.KeyCodes.FOUR,
            Phaser.Input.Keyboard.KeyCodes.FIVE
        ].forEach((e, i) => {
            this.setUp(e, () => callback(i));
        });
    }

    private setUp(key: Phaser.Input.Keyboard.KeyCodes, callback: () => void) {
        const k = this.input.keyboard.addKey(key);
        k.on('down', callback);
    }

}