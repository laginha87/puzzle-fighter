// import layoutJson from "src/assets/layout.json";
// import layoutPng from "src/assets/layout.png";
import { BoardLogic } from "src/logic/BoardLogic";

export class BoardView {
    constructor(public logic: BoardLogic) {

    }

    // img.src = columnImg;
    //     this.textures.addAtlasJSONHash("layout", img, columnData);
    //     for (let i = 10; i < 500; i += 10) {
    //         this.add.sprite(10, i, "layout", "column.ase");
    //         this.add.sprite(300, i, "layout", "column.ase");
    //     }

    //     for (let i = 20; i < 290; i++) {
    //         let a = this.add.sprite(i, 0, "layout", "column.ase");
    //         a.setRotation(1.5708);
    //         a = this.add.sprite(i, 500, "layout", "column.ase");
    //         a.setRotation(1.5708);

    //     }

    //     this.add.sprite(10, 5, "layout", "corner.ase");
    //     const a = this.add.sprite(300, 500, "layout", "corner.ase");
    //     a.setRotation(1.5708 * 2);
}
