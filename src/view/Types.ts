export interface SceneState {
    scene: Phaser.Scene;

    init?() : void;
    preload?() : void;
    create?() : void;
    update?(time: number, delta: number) : void;
}

export type Position = {
    x: integer;
    y: integer;
};

export type Size = {
    width: integer;
    height: integer;
};