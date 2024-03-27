import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const confidence = [];

function BandConfidence({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('confidence', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Confidence'} info='To be added' required={true} styles={styles} />
            <Item
                name={'confidence'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('confidence')} />
            </Item>

            <div style={styles.options}>
                <Options options={confidence} selected={form.getFieldValue('confidence')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandConfidence;