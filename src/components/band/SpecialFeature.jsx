import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const specialFeatures = ["DAR", "DBR", "HTwR", "HThR", "VR", "HNR", "VNR", "NC", "NBi"]

function BandColor({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('specFeat', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Spec. Feat'} info='To be added' required={true} styles={styles} />
            <Item
                name={'specFeat'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('specFeat')} />
            </Item>

            <div style={styles.options}>
                <Options options={specialFeatures} selected={form.getFieldValue('specFeat')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandColor;