import { BoardManager } from '~src/logic/board_managers';
import { BlockLogic, BoardLogic } from '~src/logic';

export class DestroyManager extends BoardManager {
    public energyBlocks: BlockLogic[] = [];
    private breakers: BlockLogic[] = [];

    constructor(board: BoardLogic) {
        super(board);
        board.events.on('land_block', (b: BlockLogic) => {
            if (b.type == 'breaker') {
                this.breakers.push(b);
            }
        });
        board.events.on('destroy_blocks', (bs: BlockLogic[]) => {
            const breakers = bs.filter(({ type }) => type == 'breaker');
            this.breakers = this.breakers.filter((e) => !breakers.includes(e));
        });
    }

    update(time: number, delta: number): boolean {
        const breakersToDestroy = this.breakers.filter(({ position: { x, y }, energy_type }) =>
            this.board.neighbors(x, y)
                .some((e) => energy_type === (e || {}).energy_type));

        if(this.energyBlocks.length != 0 ) {
            this.board.destroyBlocks(this.energyBlocks);
            this.energyBlocks = [];
        }

        if (breakersToDestroy.length > 0) {
            const blocksToDestroy: BlockLogic[] = [];
            const visited = new Set();

            while (breakersToDestroy.length !== 0) {
                const next = <BlockLogic>breakersToDestroy.pop();
                blocksToDestroy.push(next);
                visited.add(next.id);
                this.board.neighbors(next.position.x, next.position.y)
                    .forEach((e) => {
                        if(visited.has(e.id)) {
                            return;
                        }

                        visited.add(e.id);
                        if (e.energy_type === next.energy_type) {
                            breakersToDestroy.push(e);
                        }
                    });
            }

            this.board.destroyBlocks(blocksToDestroy);
        }

        return true;
    }
}