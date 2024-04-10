import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const speciesOptions = ["COTE", "COEI", "BLGU"];

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

    return (
        <div>
            <LabelInfo title={"Species"} label='Species' info={info} required={true} styles={styles} />
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