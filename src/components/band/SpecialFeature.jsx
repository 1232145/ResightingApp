import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
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
    const [options, setOptions] = useState([...specialFeatures]);

    const setData = (item) => {
        form.setFieldValue('specFeat', item);
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
            <LabelInfo title="Special Features" label={'Sfeat'} info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'specFeat'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('specFeat')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('specFeat')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandColor;