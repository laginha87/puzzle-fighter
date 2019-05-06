export interface PlayerController {
    onRotate(cb : () => void) : void;
    onMoveLeft(cb : () => void) : void;
    onMoveRight(cb : () => void) : void;
    onFall(cb : () => void) : void;
    onMoveDown(cb : () => void) : void;
}