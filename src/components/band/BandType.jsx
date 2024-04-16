import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const bandTypes = ["NRM", "BBL", "CC", "BC", "PFR", "RMFR"];

const info = (
    <div>
        <p>CC: Colored Coil</p>
        <p>BC: Bicolor</p>
        <p>PFR: Plasic Field Readable</p>
        <p>NRM: Non-ridged Metal</p>
        <p>BBL: Bird Banding Lab (Service Band)</p>
        <p>RMFR: Ridged-metal Field Readable</p>
    </div>
)

function BandType({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('type', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo title="Band Type" label={'Btype'} info={info} required={true} styles={styles} />
            <Item
                name={'type'}
                rules={[{ required: true, message: '' }]}
            >
                <Input value={form.getFieldValue('type')} onChange={(e) => handleChange(e.currentTarget.value)} />
            </Item>

            <div style={styles.options}>
                <Options options={bandTypes} selected={form.getFieldValue('type')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandType;