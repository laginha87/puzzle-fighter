import { updateWhile } from 'tests/updateWhile';
import { MatchLogic } from '~src/logic';

type Action = 'left'|'right'|'fall'|'rotate';

export function testSequence(match : MatchLogic, sequences: Action[][]) {
    const { players: [{_controller: controller, board}] } = match;

    sequences.forEach((actions: Action[]) => {
        const piece = board.piece;
        actions.forEach((e : Action) => {
            controller[e]();
        });
        updateWhile(match, ()=> board.piece === piece);
    });
}