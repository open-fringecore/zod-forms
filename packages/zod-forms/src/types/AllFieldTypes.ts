import {ReactElement} from 'react';

export type InputPropsType<COMPONENT_TYPE> =
    | {
          children: COMPONENT_TYPE;
      }
    | {
          component: COMPONENT_TYPE;
      };

export type StringFieldComponentType = (props: {
    value: string;
    onChange: (value: string) => void;
}) => ReactElement;

export type NumberFieldComponentType = (props: {
    value: number;
    onChange: (value: number) => void;
}) => ReactElement;

export type BooleanFieldComponentType = (props: {
    value?: boolean;
    onChange: (value: boolean) => void;
}) => ReactElement;

export type EnumFieldComponentType<VALUES extends [string, ...string[]]> =
    (props: {
        options: VALUES;
        value: VALUES[number];
        onChange: (value: VALUES[number]) => void;
    }) => ReactElement;

export type StringInputPropsType = InputPropsType<StringFieldComponentType>;
export type NumberInputPropsType = InputPropsType<NumberFieldComponentType>;
export type BooleanInputPropsType = InputPropsType<BooleanFieldComponentType>;
export type EnumInputPropsType<VALUES extends [string, ...string[]]> =
    InputPropsType<EnumFieldComponentType<VALUES>>;
