import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const legs = ["L", "R"];

function BandLeg({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('leg', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo label={'Leg(L/R)'} info='To be added' required={true} styles={styles} />
            <Item
                name={'leg'}
                rules={[{ required: true, message: 'Please enter a value!' }]}
            >
                <Input value={form.getFieldValue('leg')} />
            </Item>

            <div style={styles.options}>
                <Options options={legs} selected={form.getFieldValue('leg')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandLeg;