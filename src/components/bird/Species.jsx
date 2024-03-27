import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const speciesOptions = ["ATPU", "ARTE"];

function Species({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('species', item);
        setItem(item);
    }

    return (
        <div>
            <LabelInfo label='Species' info='Info to be added' required={true} styles={styles} />
            <Item
                name="species"
                rules={[{ required: true, message: 'Please enter species!' }]}
            >
                <Input value={form.getFieldValue('species')} />
            </Item>

            <div style={styles.options}>
                <Options options={speciesOptions} selected={form.getFieldValue('species')} setData={setData} />
            </div>
        </div>
    )
}

export default Species;