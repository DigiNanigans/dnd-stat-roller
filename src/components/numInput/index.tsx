import { NumberField } from "@base-ui-components/react/number-field";
import classes from "./style.module.css";

export default function NumInput(props: {
    value: number,
    onChange: (value: number) => void,
    min?: number,
    max?: number,
    step?: number,
}) {
    return (
        <NumberField.Root value={props.value} className={classes.field} onValueChange={props.onChange} min={props.min} max={props.max} step={props.step}>
            <NumberField.ScrubArea className={classes.scrubArea}>
                <NumberField.ScrubAreaCursor className={classes.scrubAreaCursor}>
                    <CursorGrowIcon />
                </NumberField.ScrubAreaCursor>
            </NumberField.ScrubArea>

            <NumberField.Group className={classes.group}>
                <NumberField.Decrement className={classes.decrement}>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input className={classes.input} />
                <NumberField.Increment className={classes.increment}>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    );
}

function CursorGrowIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="26" height="14" viewBox="0 0 24 14" fill="black" stroke="white" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
        </svg>
    );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentcolor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
        </svg>
    );
}

function MinusIcon(props: React.ComponentProps<"svg">) {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentcolor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M0 5H10" />
        </svg>
    );
}
