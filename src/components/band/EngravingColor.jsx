import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const engravingColors = ["M", "W", "BLK", "BLU", "BRW", "None", "R", "Y"];

function EngravingColor({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('engrColor', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Engr. Color'} info='To be added' required={true} styles={styles} />
            <Item
                name={'engrColor'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('engrColor')} />
            </Item>

            <div style={styles.options}>
                <Options options={engravingColors} selected={form.getFieldValue('engrColor')} setData={setData} />
            </div>
        </Col>
    )
}

export default EngravingColor;