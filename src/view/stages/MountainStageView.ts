import { BaseStageView } from 'src/view/stages';

import mountainPng from 'assets/stages/mountain.png';
import mountainJson from 'assets/stages/mountain.json';
import { Updatable } from 'src/utils';
import { EffectChain } from '~src/utils/EffectChain';
export class MountainStageView implements BaseStageView, Updatable {
    scene!: Phaser.Scene;

    points!: [number, number, number][];
    shootingPoints!: [number, number, number][];
    sky!: Phaser.GameObjects.Graphics;
    shootingStars!: Phaser.GameObjects.Graphics;
    chain! : EffectChain;

    last: number = 0;

    preload(): void {
        this.scene.load.atlas('mountain', mountainPng, mountainJson);
    }

    init(): void {
        this.points = Array(750)
            .fill(undefined)
            .map(() => [
                Math.floor(Math.random() * 1920),
                Math.floor(Math.random() * 1080),
                Math.floor(Math.random() * 4 + 2)
            ]);

        this.shootingPoints = Array(100)
            .fill(undefined)
            .map(() => [
                Math.floor(Math.random() * 1920),
                Math.floor(Math.random() * 1080),
                Math.floor(Math.random() * 4 + 2)
            ]);

        this.chain = new EffectChain([])
            .debounce(this.paintShootingStars.bind(this), 1000)
            .debounce(this.startShootingStars.bind(this), 10)
            .timedEffect(this.moveShootingStars.bind(this), 3000);
    }

    create(): void {
        this.sky = this.scene.add.graphics({
            fillStyle: { color: 0x143464 },
            x:0,
            y:0
        });

        this.shootingStars = this.scene.add.graphics({
            fillStyle: { color: 0xffffff},
            x:0,
            y:0,
        });

        this.sky.fillRect(0, 0, 1920, 1080);
        this.sky.fillStyle(0xffffff);
        this.points.forEach((point_struct) => { this.sky.fillPoint(...point_struct); } );
        this.shootingPoints.forEach((point_struct) => { this.shootingStars.fillPoint(...point_struct)});


        const image = this.scene.add.sprite(1920 / 2, 1080 / 2, 'mountain', 'mountain.aseprite');

        image.setScale(1920 / image.displayWidth, 1080 / image.displayHeight);


    }

    update(time: number, delta: number): void {
        this.chain.update(time, delta);
    }

    paintShootingStars() {
        this.shootingStars.fillStyle(0xff0000);
        this.shootingPoints.forEach((point_struct) => { this.shootingStars.fillPoint(...point_struct); } );
    }

    startShootingStars() {
        this.shootingStars.clear();
        this.shootingStars.fillStyle(0xff0000);
        this.shootingPoints.forEach(([x,y, size]) => {
            this.shootingStars.fillStyle(0xff0000, .3);
            this.shootingStars.fillRect(x - size, y, size, size);
            this.shootingStars.fillStyle(0xff0000, .5);
            this.shootingStars.fillRect(x - size, y - size, size, size);
            this.shootingStars.fillStyle(0xff0000);
            this.shootingStars.fillRect(x - size, y - size * 2, size, size);
        } );
    }

    moveShootingStars(time : number, delta: number) {
        this.shootingStars.setY(this.shootingStars.y - 10);

        return false;
    }

    resetShootingStars() {
        this.shootingStars.clear();
        this.shootingStars.setY(0);
    }

}