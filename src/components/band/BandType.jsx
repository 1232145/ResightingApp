import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Col, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const bandTypes = ["NRM", "BBL", "CC", "BC", "PFR", "RMFR"];

const info = (
    <div>
        <p>CC: Colored Coil</p>
        <p>BC: Bicolor</p>
        <p>PFR: Plasic Field Readable</p>
        <p>NRM: Non-ridged Metal</p>
        <p>BBL: Bird Banding Lab (Service Band)</p>
        <p>RMFR: Ridged-metal Field Readable</p>
    </div>
)

function BandType({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...bandTypes]);

    const setData = (item) => {
        form.setFieldValue('type', item);
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
            <LabelInfo title="Band Type" label={'Btype'} info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name={'type'}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('type')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('type')} setData={setData} />
            </div>
        </Col>
    )
}

export default BandType;