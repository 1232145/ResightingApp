import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, InputNumber } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const proxOptions = [1, 2, 3, 4, 5, 6, 7, 8];

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

    const setData = (item) => {
        form.setFieldValue('prox', item);
        setItem(item);
    }

    return (
        <div>
            <LabelInfo title="Proximity" label='Prx' info={info} required={true} styles={styles} />
            <Item
                name='prox'
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <InputNumber value={form.getFieldValue('prox')} style={{ width: '100%' }} />
            </Item>

            <div style={styles.options}>
                <Options options={proxOptions} selected={form.getFieldValue('prox')} setData={setData} />
            </div>
        </div>
    )
}

export default Prox;