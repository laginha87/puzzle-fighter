import { BlockLogic, PlayerLogic, PieceLogic } from 'src/logic';
import { Updatable, EventEmitter } from 'src/utils';
import { Position, Size } from 'src/types';

export type BOARD_LOGIC_EVENTS = 'set_piece' | 'break_piece' | 'init_piece' | 'destroy_blocks';

export class BoardLogic implements Updatable {
    public _piece: PieceLogic;
    public player: PlayerLogic;
    public events: EventEmitter<BOARD_LOGIC_EVENTS>;
    public FALLING_BLOCK_SPEED = 0.04;

    private fallingBlocks: BlockLogic[] = [];
    private breakers: BlockLogic[] = [];

    private blocks: BlockLogic[][];
    private state: 'piece_falling' | 'blocks_falling' | 'destroying_blocks';
    private startPoint: Position;

    constructor(public size: Size) {
        this.blocks = [];
        for (let x = 0; x < size.width; x++) {
            this.blocks[x] = [];
        }

        this.state = 'piece_falling';
        this.events = new Phaser.Events.EventEmitter();
        this.onPieceHit = this.onPieceHit.bind(this);
        this.startPoint = { x: size.width / 2, y: 0 };
    }

    public get piece() {
        return this._piece;
    }

    public set piece(p: PieceLogic) {
        this._piece = p;
        p.position = { ...this.startPoint };
        p.events.once('on_fallen', this.onPieceHit);
    }

    public update(time: number, delta: number): void {
        switch (this.state) {
            case 'piece_falling':
                return this.piece.update(time, delta);
            case 'blocks_falling':
                this.fallingBlocks = this.fallingBlocks.filter((block) => {
                    const { position } = block;
                    const y = (position.y + delta * this.FALLING_BLOCK_SPEED);
                    if (!this.canMoveTo({ x: position.x, y })) {
                        position.y = Math.ceil(position.y);
                        this.addBlock(block);

                        return false;
                    }
                    position.y = y;

                    return true;
                });
                if (this.fallingBlocks.length == 0) {
                    this.state = 'destroying_blocks';
                }

                return;
            case 'destroying_blocks':
                const breakersToDestroy = this.breakers.filter(({ position: { x, y }, energy_type }) =>
                    this.neighbours(x, y)
                        .some((e) => energy_type === (e || {}).energy_type));

                if (breakersToDestroy.length > 0) {
                    const blocksToDestroy: BlockLogic[] = [];
                    const visited: Boolean[][] = [];
                    for (let x = 0; x < this.size.width; x++) {
                        visited[x] = [];
                    }
                    this.breakers = this.breakers.filter((e) => !breakersToDestroy.includes(e));

                    while (breakersToDestroy.length !== 0) {
                        const next = <BlockLogic>breakersToDestroy.pop();
                        blocksToDestroy.push(next);
                        this.blocks[next.position.x][next.position.y] = undefined;
                        visited[next.position.x][next.position.y] = true;
                        this.neighbours(next.position.x, next.position.y)
                            .forEach((e) => {
                                visited[e.position.x][e.position.y] = true;
                                if (e.energy_type === next.energy_type) {
                                    breakersToDestroy.push(e);
                                }
                            });
                    }

                    this.events.emit('destroy_blocks', blocksToDestroy);

                    this.blocks.forEach((line) => {
                        let falling = false;
                        for (let y = this.size.height - 1; y >= 0; y--) {
                            const element = line[y];
                            if (element) {
                                if (falling) {
                                    this.fallingBlocks.push(element);
                                }
                            } else {
                                falling = true;
                            }

                        }
                    });

                    this.fallingBlocks.forEach(({ position: { x, y } }) => {
                        this.blocks[x][y] = undefined;
                    });

                    this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);

                    this.state = 'blocks_falling';
                } else {
                    this.player.nextPiece();
                    this.state = 'piece_falling';
                }

        }

    }

    public canMoveTo(position: Position) {
        const { x, y } = position;
        const { width, height } = this.size;
        if (x < 0 || x > width || y < 0 || y >= height - 1) {
            return false;
        }

        if (this.blocks[Math.ceil(x)][Math.ceil(y)]) {
            return false;
        }

        return true;
    }

    public addBlock(b: BlockLogic) {
        const { position: { x, y }, type } = b;
        this.blocks[Math.ceil(x)][Math.ceil(y)] = b;
        if (type == 'breaker') {
            this.breakers.push(b);
        }
    }

    public onPieceHit(): void {
        this.fallingBlocks.push(...this.piece.blocks);
        this.fallingBlocks.sort(({ position: { y: y1 } }, { position: { y: y2 } }) => y2 - y1);
        this.state = 'blocks_falling';
        this.events.emit('break_piece');
    }

    private neighbours(x: number, y: number): BlockLogic[] {
        return [(this.blocks[x - 1] || [])[y], (this.blocks[x + 1] || [])[y], this.blocks[x][y + 1], this.blocks[x][y - 1]].filter((e) => e !== undefined);
    }
}
