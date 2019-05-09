import { PlayerController } from 'src/controllers';

export class KeyboardController implements PlayerController {
    constructor(private input: Phaser.Input.InputPlugin) {
    }

    onRotate(callback): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.UP, callback);
    }

    onMoveLeft(callback): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.LEFT, callback);
    }

    onMoveRight(callback): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.RIGHT, callback);
    }

    onMoveDown(callback): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.DOWN, callback);
    }

    onFall(callback): void {
        this.setUp(Phaser.Input.Keyboard.KeyCodes.SPACE, callback);
    }

    private setUp(key: Phaser.Input.Keyboard.KeyCodes, callback: () => void) {
        const k = this.input.keyboard.addKey(key);
        k.on('down', callback);
    }

}