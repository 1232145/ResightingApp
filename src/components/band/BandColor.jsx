import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const bandColors = ["M", "W", "BLK", "Y", "BLU", "BRW", "R", "G", "LG", "BrB", "ObO", "Or"];

const info = (
    <div>
        <p>M: metal</p>
        <p>W: white</p>
        <p>BLK: black</p>
        <p>Y: yellow</p>
        <p>BLU: blue</p>
        <p>BRW: brown</p>
        <p>R: red</p>
        <p>G: green</p>
        <p>LG: light green</p>
        <p>BrB: blue/red/blue horizontal stripes</p>
        <p>ObO: orange/black/orange horizontal stripes</p>
        <p>Or: orange</p>
    </div>
)

function BandColor({ form, styles }) {
    const [item, setItem] = useState(null);

    const setData = (item) => {
        form.setFieldValue('color', item);
        setItem(item);
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo title="Band Color" label={'BCLr'} info={info} required={true} styles={styles} />
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