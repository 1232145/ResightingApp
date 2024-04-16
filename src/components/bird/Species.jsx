import React, { useEffect, useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input } from 'antd';
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

    const setData = (item) => {
        form.setFieldValue('species', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    return (
        <div>
            <LabelInfo title={"Species"} label='Species' info={info} required={true} styles={styles} />
            <Item
                name="species"
                rules={[{ required: true, message: '' }]}
            >
                <Input value={form.getFieldValue('species')} onChange={(e) => handleChange(e.currentTarget.value)} />
            </Item>

            <div style={styles.options}>
                <Options options={speciesOptions} selected={form.getFieldValue('species')} setData={setData} />
            </div>
        </div>
    )
}

export default Species;