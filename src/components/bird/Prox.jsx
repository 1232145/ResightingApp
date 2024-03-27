import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, InputNumber } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const proxOptions = [1, 2, 5, 10, 15];

function Prox({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('prox', item);
        setItem(item);
    }

    return (
        <div>
            <LabelInfo label='Prox' info='Info to be added' required={true} styles={styles} />
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