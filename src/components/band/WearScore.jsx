import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const wearScores = ["1", "2", "3", "4", "U"];

const info = (
    <div>
        <p>1: No Wear</p>
        <p>2: Little Wear</p>
        <p>3: Some Wear/difficult to read</p>
        <p>4: One or more numbers unreadable</p>
        <p>U: Unknown</p>
    </div>
)

function WearScore({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('wearScore', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo title="Wear Score" label={'Wear Score'} info={info} required={true} styles={styles} />
            <Item
                name={'wearScore'}
                rules={[{ required: true, message: '' }]}
            >
                <Input value={form.getFieldValue('wearScore')} onChange={(e) => handleChange(e.currentTarget.value)} />
            </Item>

            <div style={styles.options}>
                <Options options={wearScores} selected={form.getFieldValue('wearScore')} setData={setData} />
            </div>
        </Col>
    )
}

export default WearScore;