import { BoardManager } from 'src/logic/board_managers';
import { BlockLogic, BoardLogic } from 'src/logic';

export class DestroyManager extends BoardManager {
    private breakers: BlockLogic[] = [];

    constructor(board: BoardLogic) {
        super(board);
        board.events.on('land_block', (b: BlockLogic) => {
            if (b.type == 'breaker') {
                this.breakers.push(b);
            }
        })
        board.events.on('destroy_blocks', (bs: BlockLogic[]) => {
            const breakers = bs.filter(({ type }) => type == 'breaker');
            this.breakers = this.breakers.filter((e) => !breakers.includes(e));
        });
    }

    update(time: number, delta: number): void {
        const breakersToDestroy = this.breakers.filter(({ position: { x, y }, energy_type }) =>
            this.board.neighbours(x, y)
                .some((e) => energy_type === (e || {}).energy_type));

        if (breakersToDestroy.length > 0) {
            const blocksToDestroy: BlockLogic[] = [];
            const visited: Boolean[][] = [];
            for (let x = 0; x < this.board.size.width; x++) {
                visited[x] = [];
            }

            while (breakersToDestroy.length !== 0) {
                const next = <BlockLogic>breakersToDestroy.pop();
                blocksToDestroy.push(next);
                visited[next.position.x][next.position.y] = true;
                this.board.neighbours(next.position.x, next.position.y)
                    .forEach((e) => {
                        visited[e.position.x][e.position.y] = true;
                        if (e.energy_type === next.energy_type) {
                            breakersToDestroy.push(e);
                        }
                    });
            }

            this.board.destroyBlocks(blocksToDestroy);
        } else {
            this.board.player.nextPiece();
            this.board.state = 'piece_falling';
        }

    }
}