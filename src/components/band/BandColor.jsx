import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const bandColors = ["M", "W", "BLK", "Y", "BLU", "BRW", "R", "G", "LG", "BrB", "ObO", "Or"];

function BandColor({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('color', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Band Color'} info='To be added' required={true} styles={styles} />
            <Item
                name={'color'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('color')} />
            </Item>

            <div style={styles.options}>
                <Options options={bandColors} selected={form.getFieldValue('color')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandColor;