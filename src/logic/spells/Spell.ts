import { EnergyType, PlayerLogic } from 'src/logic';
import { Updatable } from 'src/utils';

export abstract class Spell implements Updatable {
    abstract cost: EnergyType[];
    protected level: number;
    protected player: PlayerLogic;

    constructor(opts: { level: number, player: PlayerLogic }) {
        const { level, player } = opts;
        this.level = level;
        this.player = player;
    }

    public abstract update(time: number, delta: number): boolean;
    public abstract cast(): void;

}