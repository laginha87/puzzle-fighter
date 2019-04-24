import * as Phaser from 'phaser';
import { GameLogic } from '../logic/game';
import tile from '../../assets/blocks.png';
import data from '../../assets/blocks.json';
import columnImg from '../../assets/layout.png';
import columnData from '../../assets/layout.json';

export class GameView {
    phaser!: Phaser.Game
    constructor(private logic: GameLogic) {

    }

    init(elem: HTMLElement) {
        const config: GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene: new Temp('blah', this.logic),
            parent: elem,
        };
        this.phaser = new Phaser.Game(config);
    }
    start() {
        this.phaser.scene.start('blah')
    }
}



class Temp extends Phaser.Scene {
    logic: GameLogic

    constructor(config: string, logic: GameLogic) {
        super(config)

        this.logic = logic
    }
    preload() {
        const img = document.createElement('img')
        img.src = columnImg
        this.textures.addAtlasJSONHash('layout', img, columnData)
        for (let i = 10; i < 500; i += 10) {
            this.add.sprite(10, i, 'layout', 'column.ase')
            this.add.sprite(300, i, 'layout', 'column.ase')
        }

        for (let i = 20; i < 290; i++) {
            let a = this.add.sprite(i, 0, 'layout', 'column.ase')
            a.setRotation(1.5708)
            a = this.add.sprite(i, 500, 'layout', 'column.ase')
            a.setRotation(1.5708)

        }

        this.add.sprite(10, 5, 'layout', 'corner.ase')
        let a = this.add.sprite(300, 500, 'layout', 'corner.ase')
        a.setRotation(1.5708 * 2)

        // const tiles = ['chaos.ase', 'elemental.ase', 'nature.ase', 'order.ase', 'willpower.ase']
        // for (let i = 16; i <= 800 - 16; i += 32) {
        //     for (let ii = 16; ii <= 600 - 16; ii += 32) {
        //         const type =  ['energy', 'regular', 'breaker'][Math.floor(Math.random() * 3)]
        //         this.add.sprite(i, ii, 'blocks', `${type}_${tiles[Math.floor(Math.random() * tiles.length)]}`)
        //     }
        // }
    }


    update(time: number, delta: number) {
        this.logic.update(time, delta)
    }
}