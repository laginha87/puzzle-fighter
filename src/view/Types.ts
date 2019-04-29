export interface SceneState {
    scene: Phaser.Scene;

    init();
    preload();
    create();
}

export type Position = {
    x: integer;
    y: integer;
};

export type Size = {
    width: integer;
    height: integer;
};