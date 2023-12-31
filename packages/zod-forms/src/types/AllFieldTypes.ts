import {ReactElement} from 'react';
import {TerminateFieldType} from './CoreTypes';

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
    value: boolean;
    onChange: (value: boolean) => void;
}) => ReactElement;

export type EnumFieldComponentType<VALUE extends string> = (props: {
    options: VALUE[];
    value: VALUE;
    onChange: (value: VALUE) => void;
}) => ReactElement;

export type ArrayFieldItemType = string | Record<string, any> | number;

export type StringInputPropsType = InputPropsType<StringFieldComponentType>;
export type NumberInputPropsType = InputPropsType<NumberFieldComponentType>;
export type BooleanInputPropsType = InputPropsType<BooleanFieldComponentType>;
export type EnumInputPropsType<VALUE extends string> = InputPropsType<
    EnumFieldComponentType<VALUE>
>;

/*export type ArrayFieldComponentType<VALUE extends ArrayFieldItemType> =
    (props: {
        items: VALUE[];
        addItem: () => void;
        removeItem: (index: number) => void;
        onChange: (
            e: string | number,
            index: number,
            property?: string,
            object?: any,
        ) => void;
    }) => ReactElement;

export type ArrayInputPropsType<VALUE extends any> = VALUE extends string ? InputPropsType<
    ArrayFieldComponentType<TerminateFieldType<StringInputPropsType>>> : InputPropsType<ArrayFieldComponentType<TerminateFieldType<NumberInputPropsType>>>*/

export type ArrayFieldComponentType<VALUE extends ArrayFieldItemType> =
    (props: {
        items: VALUE[];
        addItem: () => void;
        removeItem: (index: number) => void;
        onChange: (
            e: string | number,
            index: number,
            property?: string,
            object?: any,
        ) => void;
    }) => React.ReactElement;

export type ArrayInputPropsType<VALUE extends ArrayFieldItemType> =
    InputPropsType<ArrayFieldComponentType<VALUE>>;
