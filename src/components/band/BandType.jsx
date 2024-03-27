import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const bandTypes = ["CC", "BC", "PFR", "NRM", "BBL", "RMFR"];

function BandType({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('type', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Band Type'} info='To be added' required={true} styles={styles} />
            <Item
                name={'type'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('type')} />
            </Item>

            <div style={styles.options}>
                <Options options={bandTypes} selected={form.getFieldValue('type')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandType;