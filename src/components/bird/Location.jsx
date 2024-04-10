import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, InputNumber } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const locOptions = ["PB", "PBV", "PC", "PCV", "PP", "GB", "RZ", "NB", "SB", "GR", "AB", "B1-B300"];

const info = (
    <div>
        <p>PB	Puffin Blind</p>
        <p>PBV	Puffin Blind Vegetation (in sod)</p>
        <p>P	Puffin Condo</p>
        <p>PCV	Puffin Condo Vegetation</p>
        <p>PP	Puffin Point</p>
        <p>GB	Generator Berm (Betw. Lighthouse and gen. build)</p>
        <p>RZ	Razorbill Blind</p>
        <p>NB	North Berm; Boathouse to Foghorn</p>
        <p>SB	Southeast Berm; Puffin Condo to Generator Blind</p>
        <p>GR	Generator Rocks (Betw. Gen. build. And SW corner)</p>
        <p>AB	Artificial Burrow</p>
        <p>B1-B300	Burrow #</p>
    </div>
);

function Location({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('loc', item);
        setItem(item);
    }

    return (
        <div>
            <LabelInfo title="Location" label='Loc' info={info} required={true} styles={styles} />
            <Item
                name='loc'
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <InputNumber value={form.getFieldValue('loc')} style={{ width: '100%' }} />
            </Item>

            <div style={styles.options}>
                <Options options={locOptions} selected={form.getFieldValue('loc')} setData={setData} />
            </div>
        </div>
    )
}

export default Location;