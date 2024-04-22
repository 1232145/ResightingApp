import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const engravingColors = ["M", "W", "BLK", "BLU", "BRW", "None", "R", "Y"];

const info = (
    <div>
        <p>M: metal</p>
        <p>W: white</p>
        <p>BLK: black</p>
        <p>BLU: blue</p>
        <p>BRW: brown</p>
        <p>None: No Engraving (coil or Bicolor)</p>
        <p>R: red</p>
        <p>Y: yellow</p>
    </div>
)

function EngravingColor({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...engravingColors]);

    const setData = (item) => {
        form.setFieldValue('engrColor', item);
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
            <LabelInfo title="Engraving Color" label={'ECLr'} info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'engrColor'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('engrColor')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('engrColor')} setData={setData} />
            </div>
        </Col>
    )
}

export default EngravingColor;