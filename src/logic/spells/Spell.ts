import { EnergyType, PlayerLogic } from "src/logic";

export abstract class Spell {
    abstract cost : EnergyType[];

    public abstract cast(p : PlayerLogic) : boolean;
}