import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const read = ['Full', 'Partial'];

function BandRead({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...read]);

    const setData = (item) => {
        form.setFieldValue('read', item);
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
            <LabelInfo label={'Read'} info='To be added' required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'read'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('read')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('read')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandRead;