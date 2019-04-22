import * as Phaser from "phaser";
import { GameLogic } from "../logic/game";

export class GameView {
    phaser!: Phaser.Game
    constructor(private logic : GameLogic){

    }

    init(elem : HTMLElement) {
        const config : GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 200 }
                }
            },
            scene: {
                preload: this.preload,
                update: this.update
            },
            parent: elem,
        };
        this.phaser = new Phaser.Game(config);
    }
    start() {
        this.phaser.scene.start("")
    }

    preload(){

    }

    update(time : number, delta : number){
        this.logic.update(time, delta)
    }



}

