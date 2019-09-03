import { BaseStageView } from 'src/view/stages';

import mountainPng from 'assets/stages/mountain.png';
import mountainJson from 'assets/stages/mountain.json';

export class MountainStageView implements BaseStageView {
    scene!: Phaser.Scene;

    preload(): void {
        this.scene.load.atlas('mountain', mountainPng, mountainJson);
    }

    init(): void {

    }

    create(): void {
        const image = this.scene.add.sprite(1920 / 2, 1080 / 2, 'mountain', 'mountain.aseprite');

        image.setScale(1920 / image.displayWidth, 1080 / image.displayHeight);
    }
    public constructor() {

    }

}