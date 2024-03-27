import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const wearScores = ["1", "2", "3", "4", "U"];

function WearScore({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('wearScore', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Wear Score'} info='To be added' required={true} styles={styles} />
            <Item
                name={'wearScore'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('wearScore')} />
            </Item>

            <div style={styles.options}>
                <Options options={wearScores} selected={form.getFieldValue('wearScore')} setData={setData} />
            </div>
        </Col>
    )
}

export default WearScore;