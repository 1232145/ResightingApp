import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const speciesOptions = ["ARTE", "ATPU", "COTE", "COEI", "BLGU", "RAZO", "COMU"];

const info = (
    <div>
        <p>COTE: common terns</p>
        <p>COEI: common eiders</p>
        <p>BLGU: black guillemot</p>
    </div>
);

function Species({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...speciesOptions]);

    const setData = (item) => {
        form.setFieldValue('species', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    const handleAdd = () => {
        if (item === null || item === undefined || item === '') {
            return;
        }

        if (!options.includes(item)) {
            const newLocOptions = [...options, item];
            setOptions(newLocOptions);
        }
    }

    return (
        <div>
            <LabelInfo title={"Species"} label='Species' info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name="species"
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('species')} onChange={(e) => handleChange(e.currentTarget.value)} />
                </Item>
                <Button type="primary" onClick={() => handleAdd()}
                    style={{
                        height: '31px',
                        padding: '0 15px',
                        marginLeft: '2px',
                        borderRadius: '4px',
                        width: '20%',
                        backgroundColor: 'green',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    +
                </Button>
            </div>

            <div style={styles.options}>
                <Options options={options} selected={form.getFieldValue('species')} setData={setData} />
            </div>
        </div>
    )
}

export default Species;