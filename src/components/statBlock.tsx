import { useDice } from "../use-dice";
import classes from "./statBlock.module.css";

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
    return (
        <table class={classes.root}>{dice.value.map((statBlock, i) => (
            <StatBlock key={statBlock} dice={statBlock} i={dice.value.length - i} />
        ))}</table>
    );
}