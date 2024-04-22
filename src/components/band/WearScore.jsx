import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
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
    const [options, setOptions] = useState([...wearScores]);

    const setData = (item) => {
        form.setFieldValue('wearScore', item);
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
            <LabelInfo title="Wear Score" label={'Wear Score'} info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'wearScore'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('wearScore')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('wearScore')} setData={setData} />
            </div>
        </Col>
    )
}

export default WearScore;