import { Field as BaseField } from '@base-ui-components/react/field';
import classes from './style.module.css';
import { ComponentChildren } from 'preact';

export default function Field(props: {
    children: ComponentChildren,
    label: string,
    description?: string,
}) {
    return (
        <BaseField.Root className={classes.field}>
            <BaseField.Label className={classes.label}>{props.label}</BaseField.Label>
            {props.children}
            {props.description && <BaseField.Description className={classes.description}>
                {props.description}
            </BaseField.Description>}
        </BaseField.Root>
    );
}