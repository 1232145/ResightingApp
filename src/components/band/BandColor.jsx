import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
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
    const [options, setOptions] = useState([...bandColors]);

    const setData = (item) => {
        form.setFieldValue('color', item);
        setItem(item);
    }

    const handleChange = (value) => {
        setItem(value);
    }

    const handleAdd = () => {
        if (item === null || item === undefined || item === '') {
            return;
        }

        if (!options.includes(item)) {
            const newLocOptions = [...options, item];
            setOptions(newLocOptions);
        }
    }

    return (
        <Col span={12} style={styles.col}>
            <LabelInfo title="Band Color" label={'BCLr'} info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'color'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('color')} onChange={(e) => handleChange(e.currentTarget.value)} />
                </Item>
                <Button type="primary" onClick={() => handleAdd()}
                    style={{
                        height: '31px',
                        padding: '0 15px',
                        marginLeft: '2px',
                        borderRadius: '4px',
                        width: '20%',
                        backgroundColor: 'green',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    +
                </Button>
            </div>

            <div style={styles.options}>
                <Options options={options} selected={form.getFieldValue('color')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandColor;