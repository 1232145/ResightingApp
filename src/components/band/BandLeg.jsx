import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const legs = ["L", "R"];

function BandLeg({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...legs]);

    const setData = (item) => {
        form.setFieldValue('leg', item);
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
            <LabelInfo label={'Leg(L/R)'} info='To be added' required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'leg'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('leg')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('leg')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandLeg;