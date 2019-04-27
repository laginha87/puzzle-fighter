import { GameView } from "src/view/GameView";
import { GameLogic } from "src/logic/GameLogic";
import { Game } from "src/game/Game";

export class ClientGame implements Game {
    public selector: string;
    private logic!: GameLogic;
    private view!: GameView;
    constructor(selector: string) {
        this.selector = selector;
    }

    public init() {
        this.logic = new GameLogic();
        this.view = new GameView(this.logic);
        const el = <HTMLElement>document.querySelector(this.selector);
        this.view.init(el);
    }

    public start() {
        this.view.start();

    }
}
