import { Collapsible } from "@base-ui-components/react";
import { useDice } from "../../use-dice";
import DieSelect from "../dieSelect";
import Field from "../field";
import NumInput from "../numInput";
import ToggleSwitch from "../toggleSwitch";
import classes from './style.module.css';

export default function() {
    
    const ctx = useDice();

    const setDieType = (pos: number, value: number) => {
        ctx.toRoll.value = ctx.toRoll.value.map((die, i) => i === pos ? value : die);
    }
    
    return (
        <Collapsible.Root className={classes.collapsible}>
            <Collapsible.Trigger className={classes.trigger}>
                <ChevronIcon className={classes.icon} />
                Settings
            </Collapsible.Trigger>
            <Collapsible.Panel className={classes.panel}>
                <div className={classes.content}>

                    <Field label="Die">
                        <DieSelect value={ctx.die} options={[
                            {value: 4, label: "d4"},
                            {value: 6, label: "d6"},
                            {value: 8, label: "d8"},
                            {value: 10, label: "d10"},
                            {value: 12, label: "d12"},
                            {value: 20, label: "d20"},
                        ]} onChange={value => ctx.die.value = value} />
                    </Field>

                    <Field label="Min Average">
                        <NumInput step={0.1} min={ctx.numDice.value} max={ctx.maxAverage.value} value={ctx.minAverage.value} onChange={value => ctx.minAverage.value = value} />
                    </Field>

                    <Field label="Max Average">
                        <NumInput step={0.1} min={ctx.minAverage.value} max={ctx.numDice.value * ctx.die.value} value={ctx.maxAverage.value} onChange={value => ctx.maxAverage.value = value} />
                    </Field>

                    <Field label="Min Roll">
                        <NumInput step={1} min={ctx.numDice.value} max={ctx.maxRoll.value} value={ctx.minRoll.value} onChange={value => ctx.minRoll.value = value} />
                    </Field>

                    <Field label="Max Roll">
                        <NumInput step={1} min={ctx.minRoll.value} max={ctx.numDice.value * ctx.die.value} value={ctx.maxRoll.value} onChange={value => ctx.maxRoll.value = value} />
                    </Field>

                    <Field label="Min Diff">
                        <NumInput step={0.1} min={0} max={ctx.maxRoll.value - ctx.minRoll.value} value={ctx.minDiff.value} onChange={value => ctx.minDiff.value = value} />
                    </Field>

                    <Field label="Number of High Stats">
                        <NumInput step={1} min={1} max={ctx.numStats.value - 1} value={ctx.numHighStats.value} onChange={value => ctx.numHighStats.value = value} />
                    </Field>

                    <Field label="High Stat Min Average">
                        <NumInput step={0.1} min={ctx.minAverage.value} max={ctx.maxAverage.value} value={ctx.highStatMinAverage.value} onChange={value => ctx.highStatMinAverage.value = value} />
                    </Field>

                    <Field label="Sort Dice">
                        <ToggleSwitch checked={ctx.sort} />
                    </Field>

                    <Field label="Number of dice per stat">
                        <div class={classes.dice}>
                            <button type="button" onClick={() => ctx.numStats.value--}>-</button>
                            {ctx.toRoll.value.map((die, i) => (
                                <NumInput key={i} min={ctx.numDice.value} value={die} onChange={v => setDieType(i, v)} />
                            ))}
                            <button type="button" onClick={() => ctx.numStats.value++}>+</button>
                        </div>
                    </Field>

                </div>
            </Collapsible.Panel>
        </Collapsible.Root>
    );
}

export function ChevronIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
            <path d="M3.5 9L7.5 5L3.5 1" stroke="currentcolor" />
        </svg>
    );
}