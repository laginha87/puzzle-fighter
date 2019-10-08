import mountainPng from 'assets/stages/mountain.png';
import mountainJson from 'assets/stages/mountain.json';
import { EffectChain } from '~src/utils/EffectChain';
import { StageView } from '~src/view/stages/StageView';
import { MountainStageLogic } from '~src/logic/stages/MountainStageLogic';
import { BlockLogic, BoardLogic, EnergyType } from '~src/logic';
import { BlockView } from '..';
import { Size } from '~src/types';
import { Observable, fromEvent, Subject } from 'rxjs';
import { tap, concatMap, switchMap, switchMapTo, takeUntil, concatMapTo, takeWhile, scan, reduce } from 'rxjs/operators';


const Colors : { [x in EnergyType]: number} = {
    chaos: 0x793a80,
    elemental: 0xfa6a0a,
    nature: 0x14a02e,
    order: 0xfef3c0,
    willpower: 0x249fde

};

export class MountainStageView extends StageView {
    points!: [number, number, number][];
    config!: { blockSize: Size };
    shootingPoints!: [number, number, number][];
    sky!: Phaser.GameObjects.Graphics;
    shootingStars!: Phaser.GameObjects.Graphics;
    chain! : EffectChain;
    last: number = 0;
    logic! : MountainStageLogic;
    blocks: BlockView[] = [];
    gameTime$!: Subject<number>;

    preload(): void {
        this.scene.load.atlas('mountain', mountainPng, mountainJson);
    }

    init(): void {
        this.gameTime$ = new Subject<number>();

        this.logic.events.on('add_falling_blocks', (blocks : BlockLogic[], board : BoardLogic) => {
            this.blocks = [];
            blocks.forEach((e) => {
                const view = new BlockView(e, this.config.blockSize);
                view.scene = this.scene;
                view.create();
                e.view = view;
                board.view.container.add(view.sprite);
                view.refresh();
                this.blocks.push(view);
            });
        });
        this.points = Array(750)
            .fill(undefined)
            .map((): [number, number, number] => [
                Math.floor(Math.random() * 1920),
                Math.floor(Math.random() * 1080),
                Math.floor(Math.random() * 4 + 2)
            ]);

        this.shootingPoints = Array(100)
            .fill(undefined)
            .map((): [number, number, number] => [
                Math.floor(Math.random() * 1920),
                Math.floor(Math.random() * 1080),
                Math.floor(Math.random() * 4 + 2)
            ]);

        fromEvent(<any>this.logic.events, 'waiting')
        .pipe(
            tap(() => this.paintShootingStars(this.logic.energy!)),
            switchMapTo(fromEvent(<any>this.logic.events, 'attacking')),
            tap(() => this.startShootingStars(this.logic.energy!)),
            concatMapTo(
                this.gameTime$.pipe(
                    scan((acc, e) => [acc[0] + e, e], [0, 0]),
                    takeWhile((e) => e[0] < 3000),
                    tap((acc_delta) => this.moveShootingStars(acc_delta[0], acc_delta[1])),
                    reduce(<any>(()=> null))
                )
            ),
        )
        .subscribe({ next: () => this.resetShootingStars() });
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
        this.shootingPoints.forEach((point_struct) => { this.shootingStars.fillPoint(...point_struct);});


        const image = this.scene.add.sprite(1920 / 2, 1080 / 2, 'mountain', 'mountain.aseprite');

        image.setScale(1920 / image.displayWidth, 1080 / image.displayHeight);


    }

    update(time: number, delta: number): void {
        this.blocks.forEach((e) => e.update(time,delta));
        this.gameTime$.next(delta);
    }

    paintShootingStars(energy : EnergyType) {
        this.shootingStars.fillStyle(Colors[energy]);
        this.shootingPoints.forEach((point_struct) => { this.shootingStars.fillPoint(...point_struct); } );
    }

    startShootingStars(energy : EnergyType) {
        this.shootingStars.clear();
        this.shootingStars.fillStyle(Colors[energy]);
        this.shootingPoints.forEach(([x,y, size]) => {
            this.shootingStars.fillStyle(Colors[energy], .3);
            this.shootingStars.fillRect(x - size, y, size, size);
            this.shootingStars.fillStyle(Colors[energy], .5);
            this.shootingStars.fillRect(x - size, y - size, size, size);
            this.shootingStars.fillStyle(Colors[energy]);
            this.shootingStars.fillRect(x - size, y - size * 2, size, size);
        } );
    }

    moveShootingStars(time : number, delta: number) {
        this.shootingStars.setY(this.shootingStars.y - 0.6 * delta);
    }

    resetShootingStars() {
        this.shootingStars.clear();
        this.shootingStars.setY(0);
    }

}