import { useComputed } from "@preact/signals";
import { useDice } from "../../use-dice";
import classes from "./style.module.css";

function StatBlock(props: {dice: number[], i: number}) {
    return (
        <tr class={classes.statBlock} style={{viewTransitionName: `block-${props.i}`}}>
            {props.dice.map((d, i) => (
                <td key={i} class={classes.die}>{d}</td>
            ))} 
        </tr>
    );
}

export default function StatBlocks() {
    const { dice } = useDice();

    const numCols = useComputed(() => {
        return dice.value.reduce((n, statBlock) => Math.max(n, statBlock.length), 0);
    });

    return (
        <table class={classes.root} style={{'--dice': numCols.value}}>
            <tbody>
                {dice.value.map((statBlock, i) => (
                    <StatBlock key={statBlock} dice={statBlock} i={dice.value.length - i} />
                ))}
            </tbody>
        </table>
    );
}