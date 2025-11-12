import { Switch } from '@base-ui-components/react/switch';
import classes from './style.module.css';
import { Signal } from '@preact/signals';

export default function ToggleSwitch(props: {
    checked: Signal<boolean>,
}) {
    return (
        <Switch.Root checked={props.checked.value} className={classes.switch} onCheckedChange={value => {
            props.checked.value = value;
        }}>
            <Switch.Thumb className={classes.thumb} />
        </Switch.Root>
    );
}