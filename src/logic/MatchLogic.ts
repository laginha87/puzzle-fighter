import { BaseLogic } from "src/logic/BaseLogic";
import { PlayerLogic } from "src/logic/PlayerLogic";

export class MatchLogic implements BaseLogic {
    constructor(public players: PlayerLogic[]) {

    }

    public update(time: number, delta: number): void {
        this.players.forEach((p) => p.update(time, delta));
    }
}
