import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const proxOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

const info = (
    <div>
        <p>1: Captured in burrow</p>
        <p>2: Enter/Exit</p>
        <p>3: Within 2 meters</p>
        <p>4: Within 4 meters</p>
        <p>5: Within 6 meters</p>
        <p>6: Within 10 meters</p>
        <p>7: Within 20 meters</p>
        <p>8: Within 50 meters</p>
    </div>
)

function Prox({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...proxOptions]);

    const setData = (item) => {
        form.setFieldValue('prox', item);
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
            <LabelInfo title="Proximity" label='Prx' info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name='prox'
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('prox')} style={{ width: '100%' }} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('prox')} setData={setData} />
            </div>
        </div>
    )
}

export default Prox;