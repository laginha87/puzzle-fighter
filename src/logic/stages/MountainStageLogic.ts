import { StageLogic } from '~src/logic/stages/StageLogic';
import { ENERGIES, EnergyType } from '~src/logic';
import { getRandom } from '~src/utils';
import { EffectI } from '~src/utils/Effect';
import { EffectChain } from '~src/utils/EffectChain';
import { fromEvent, merge } from 'rxjs';
import { first } from 'rxjs/operators';

type State = 'loading' | 'waiting';

export class MountainStageLogic extends StageLogic {
    state?: State;
    energy?: EnergyType;
    effect!: EffectI;

    start(initialColor = <EnergyType>getRandom(<any>ENERGIES)): void {
        this.waitForUser = this.waitForUser.bind(this);
        this.enqueueColorRequest(initialColor);
    }

    update(time: number, delta: number): void {
        this.effect.update(time, delta);
    }

    private enqueueColorRequest( energy: EnergyType) {
        this.state = 'loading';
        this.energy = energy;
        this.effect = new EffectChain([])
            .debounce(() => {
                this.state = 'waiting';
            }, 3000)
            .do(this.waitForUser)
            .wait(1000000);
    }

    private waitForUser(time: number, delta: number) : boolean {
        merge(this.match.players.map(e => fromEvent(<any>e.events, 'set_next')))
        .pipe(first())
        .subscribe((e) => {
            this.effect
        });

        return true;
    }
}