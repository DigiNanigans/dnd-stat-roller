import { hydrate, prerender as ssr } from 'preact-iso';
import classes from './app.module.css';
import { DiceProvider, useDice } from './use-dice';
import StatBlocks from './components/statBlock';
import RollConfig from './components/rollConfig';

export function Wrapper() {
    return (
        <DiceProvider>
            <App />
        </DiceProvider>
    );
}

export function App() {

    const { rollCharacter } = useDice();
    
    return (
        <>
            <button type="submit" className={classes.button} onClick={() => {
                document.startViewTransition(() => rollCharacter());
            }}>
                Roll Character
            </button>

            <RollConfig />

            <hr class={classes.seperator} />

            <StatBlocks />
        </>
    );

}

if (typeof window !== 'undefined') {
    hydrate(<Wrapper />, document.getElementById('app'));
}

export async function prerender(data) {
    return await ssr(<Wrapper {...data} />);
}
