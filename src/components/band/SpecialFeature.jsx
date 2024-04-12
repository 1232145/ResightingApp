import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const specialFeatures = ["DAR", "DBR", "HTwR", "HThR", "VR", "HNR", "VNR", "NC", "NBi"]

const info = (
    <div>
        <p>DAR: Dots Above Repeated</p>
        <p>DBR: Dots Below Repeated</p>
        <p>HTwR: Horizontal Twice Repeated</p>
        <p>HThR: Horizontal Thrice Repeated</p>
        <p>VR: Vertical Repeated</p>
        <p>HNR: Horiz. NOT Repeated</p>
        <p>VNR: Vert. NOT Repeated</p>
        <p>NC: None Coil</p>
        <p>NBi: None Bicolor</p>
    </div>
)

function BandColor({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('specFeat', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo title="Special Features" label={'Sfeat'} info={info} required={true} styles={styles} />
            <Item
                name={'specFeat'}
                rules={[{ required: true, message: '' }]}
            >
                <Input value={form.getFieldValue('specFeat')} onChange={(e) => handleChange(e.currentTarget.value)} />
            </Item>

            <div style={styles.options}>
                <Options options={specialFeatures} selected={form.getFieldValue('specFeat')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandColor;