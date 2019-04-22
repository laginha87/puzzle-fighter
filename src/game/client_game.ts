import { Game } from "./game";
import { GameLogic } from "../logic/game";
import { GameView } from "../view/game";

export class ClientGame implements Game {
    private logic! : GameLogic
    private view! : GameView
    selector : string
    constructor(selector : string){
        this.selector = selector
    }

    init(){
        this.logic = new GameLogic()
        this.view = new GameView(this.logic)
        const el = document.querySelector(this.selector) as HTMLElement
        this.view.init(el)
    }

    start(){


    }
}