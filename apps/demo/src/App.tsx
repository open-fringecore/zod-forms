import z from 'zod';
import {useErrors, useFormData, useZodForm} from 'zod-forms';
//import {TerminateFieldType, useErrors, useFormData, useZodForm} from 'zod-forms';
import {useSetFormData} from 'zod-forms';
//import { StringInputPropsType } from 'zod-forms/dist/types/AllFieldTypes';

const schema = z.object({
    name: z.object({
        first: z.string(),
        middle: z.string().optional(),
        last: z.string(),
    }),
    address: z.string(),
    tomato: z.enum(['yes', 'no'] as const),
    age: z.number().min(10),
    isStudent: z.boolean(),
    favoriteColor: z.enum(['red', 'blue', 'green']),
    certifications: z.array(
        z.object({
            institution: z.string(),
            program: z.string(),
            completion_year: z.number(),
        }),
    ),
    children_names: z.string().array(),
    children_ages: z.number().array(),
});

function MainForm() {
    const {form} = useZodForm(schema, {
        initialData: {
            name: {
                first: 'John',
                last: 'Doe',
            },
            isStudent: true,
        },
    });

    const data = useFormData(form);
    const setFormData = useSetFormData(form);
    const errors = useErrors(schema, data);

    console.log(errors?.errors.find((err) => err.path[0] === 'age')?.message);

    return (
        <>
            <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
            </pre>

            <div>
                <button
                    onClick={() =>
                        setFormData({
                            name: {
                                first: 'Jane',
                                middle: 'Pattrick',
                            },
                        })
                    }>
                    CHANGE
                </button>
            </div>

            <div>
                MIDDLE
                <form.name.middle.Input
                    component={({value, onChange}) => {
                        return (
                            <input
                                className={'border-2 m-4'}
                                type={'text'}
                                value={value}
                                onChange={(ev) => {
                                    onChange(ev.target.value);
                                }}
                            />
                        );
                    }}
                />
            </div>

            <div>
                FIRST
                <form.name.first.Input>
                    {({value, onChange}) => {
                        return (
                            <input
                                className={'border-2 m-4'}
                                type={'text'}
                                value={value}
                                onChange={(ev) => {
                                    onChange(ev.target.value);
                                }}
                            />
                        );
                    }}
                </form.name.first.Input>
            </div>

            <div>
                AGE
                <form.age.Input>
                    {({value, onChange}) => {
                        return (
                            <>
                                <input
                                    className={'border-2 m-4'}
                                    type={'number'}
                                    value={value}
                                    onChange={(ev) => {
                                        onChange(parseInt(ev.target.value));
                                    }}
                                />
                            </>
                        );
                    }}
                </form.age.Input>
            </div>

            <div>
                IS STUDENT
                <form.isStudent.Input>
                    {({value, onChange}) => {
                        return (
                            <input
                                className={'border-2 m-4'}
                                type="checkbox"
                                checked={value}
                                onChange={(ev) => {
                                    onChange(ev.target.checked);
                                }}
                            />
                        );
                    }}
                </form.isStudent.Input>
            </div>

            <form.favoriteColor.Input>
                {({value, onChange}) => (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}>
                        {schema.shape.favoriteColor.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </form.favoriteColor.Input>

            <div>
                Children Names
                <form.children_names.Inputs>
                    {({
                        items: children_names,
                        onChange,
                        addItem,
                        removeItem,
                    }) => (
                        <>
                            {children_names.map((children_name, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        value={children_name}
                                        onChange={(e) =>
                                            onChange(e.target.value, index)
                                        }
                                    />
                                    <button onClick={() => removeItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button onClick={addItem}>Add Field</button>
                        </>
                    )}
                </form.children_names.Inputs>
            </div>

            {/*<form.children_names.Inputs>
                {({items: children_names, addItem, removeItem}: { items: TerminateFieldType<StringInputPropsType>[], addItem: () => void, removeItem: (index: number) => void}) => (
                    <>
                        {children_names.map((children_name: TerminateFieldType<StringInputPropsType>, index: number) => (
                            <div key={index}>
                                <children_name.Input>
                                    {({value, onChange}: {value: string, onChange: (value: string, index: number) => void;}) => (
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(ev) =>
                                                onChange(ev.target.value, index)
                                            }
                                        />
                                    )}
                                </children_name.Input>
                                <button onClick={() => removeItem(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button onClick={addItem}>Add Field</button>
                    </>
                )}
            </form.children_names.Inputs>*/}

            {/*<div>
                Certifications
                <form.certifications.Inputs>
                    {({
                        items: certifications,
                        onChange,
                        addItem,
                        removeItem,
                    }) => (
                        <>
                            {certifications.map((certification, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={certification?.institution}
                                        onChange={(e) =>
                                            onChange(
                                                e.target.value,
                                                index,
                                                `institution`,
                                                certification,
                                            )
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder="Program"
                                        value={certification?.program}
                                        onChange={(e) =>
                                            onChange(
                                                e.target.value,
                                                index,
                                                `program`,
                                                certification,
                                            )
                                        }
                                    />
                                    <input
                                        type="number"
                                        placeholder="Completion Year"
                                        value={certification?.completion_year}
                                        onChange={(e) =>
                                            onChange(
                                                parseInt(e.target.value),
                                                index,
                                                `completion_year`,
                                                certification,
                                            )
                                        }
                                    />
                                    <button onClick={() => removeItem(index)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button onClick={addItem}>Add Field</button>
                        </>
                    )}
                </form.certifications.Inputs>
            </div>

            <div>
                Children Ages
                <form.children_ages.Inputs>
                    {({
                        items: children_ages,
                        onChange,
                        addItem,
                        removeItem,
                    }) => (
                        <>
                            {children_ages.map(
                                (children_age, index) => (
                                    <div key={index}>
                                        <input
                                            type="number"
                                            value={children_age}
                                            onChange={(e) => onChange(parseInt(e.target.value), index)}
                                        />
                                        <button
                                            onClick={() => removeItem(index)}>
                                            Remove
                                        </button>
                                    </div>
                                ),
                            )}
                            <button onClick={addItem}>Add Field</button>
                        </>
                    )}
                </form.children_ages.Inputs>
                                </div>*/}
        </>
    );
}

function App() {
    return <MainForm />;
}

export default App;
