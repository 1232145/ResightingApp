import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const read = ['Full', 'Partial'];

function BandRead({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('read', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Read'} info='To be added' required={true} styles={styles} />
            <Item
                name={'read'}
                rules={[{ required: true, message: '' }]}
            >
                <Input value={form.getFieldValue('read')} onChange={(e) => handleChange(e.currentTarget.value)} />
            </Item>

            <div style={styles.options}>
                <Options options={read} selected={form.getFieldValue('read')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandRead;