import { ReadonlySignal, Signal } from "@preact/signals";
import { ComponentChildren, createContext, h } from "preact";
import { batch, useSignal } from '@preact/signals';
import { useContext, useEffect } from 'preact/hooks';

function shuffleArray(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return [...array];
}

const DiceContext = createContext({} as {
    dice: ReadonlySignal<number[][]>,
    numStats: Signal<number>,
    die: Signal<number>,
    numDice: Signal<number>,
    toRoll: Signal<number[]>,
    sort: Signal<boolean>,
    minAverage: Signal<number>,
    maxAverage: Signal<number>,
    minRoll: Signal<number>,
    maxRoll: Signal<number>,
    minDiff: Signal<number>,
    numHighStats: Signal<number>,
    highStatMinAverage: Signal<number>,
    rollCharacter: () => void,
});

export const DiceProvider = function(props: { children: ComponentChildren }) {

    const dice = useSignal<number[][]>([]);

    const numStats = useSignal(6);
    const die = useSignal(6);
    const numDice = useSignal(3);
    const toRoll = useSignal([5, 5, 4, 4, 4, 3]);
    const sort = useSignal(false);

    const minAverage = useSignal(11);
    const maxAverage = useSignal(16.5);
    const minRoll = useSignal(3);
    const maxRoll = useSignal(18);
    const minDiff = useSignal(4);

    const numHighStats = useSignal(2);
    const highStatMinAverage = useSignal(14.5);

    useEffect(() => {
        const n = numStats.value - toRoll.value.length;
        if (n > 0) {
            const extend = toRoll.value[toRoll.value.length - 1];
            batch(() => {
                for (let i = 0; i < n; i++) {
                    toRoll.value = [...toRoll.value, extend];
                }
            });
        } else if (n < 0) {
            toRoll.value = toRoll.value.slice(0, toRoll.value.length - 1);
        }
    }, [numStats.value, toRoll.value]);

    function rollCharacter() {
        function roll (nDice: number) {
            const dice: number[] = [];
            
            for (let i = 0; i < nDice; i++) {
                dice.push(Math.floor(Math.random() * die.value) + 1);
            }
            
            const score = dice.sort((a, b) => a - b).slice(numDice.value * -1).reduce((a, b) => a + b, 0);
            if (score < minRoll.value) {console.log(`Roll too low ${score}`); return roll(nDice)}
            if (score > maxRoll.value) {console.log(`Roll too high ${score}`); return roll(nDice)}
            return score;
        }

        const stats = (function rollStats() {
            const stats = toRoll.value.map(d => roll(d)).sort((a, b) => a - b);

            const avg = stats.reduce((a, b) => a + b, 0) / stats.length;
            if (avg < minAverage.value) {console.log(`Average too low (${avg})`, [...stats]); return rollStats();}
            if (avg > maxAverage.value) {console.log(`Average too high (${avg})`, [...stats]); return rollStats();}
            
            const diff = stats[stats.length - 1] - stats[0];
            if (diff < minDiff.value) {console.log(`Too boring (${diff})`, [...stats]); return rollStats();}
            
            const high = stats.slice(numHighStats.value * -1).reduce((a, b) => a + b, 0) / numHighStats.value;
            if (high < highStatMinAverage.value) {console.log(`No high stats (${high})`, [...stats]); return rollStats();}
            
            return stats;
        })();

        return sort.value ? stats : shuffleArray(stats);
    }

    const value = {
        dice,
        numStats,
        die,
        numDice,
        toRoll,
        sort,
        minAverage,
        maxAverage,
        minRoll,
        maxRoll,
        minDiff,
        numHighStats,
        highStatMinAverage,
        rollCharacter: () => {
            console.log('Rolling character');
            dice.value = [rollCharacter(), ...dice.value];
        },
    };

    return h(DiceContext.Provider, { value }, props.children);

};

export function useDice() {
    const ctx = useContext(DiceContext);

    if (!ctx) throw new Error('useDice must be used within DiceProvider');
    return ctx;
}