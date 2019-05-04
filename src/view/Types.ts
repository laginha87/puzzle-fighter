import { Size, Position } from '~src/types';

export interface SceneState {
    scene: Phaser.Scene;

    init?(): void;
    preload?(): void;
    create?(): void;
    update?(time: number, delta: number): void;
}

export type LayoutConfig = {
    blockSize: Size,
    origin: Position,
};