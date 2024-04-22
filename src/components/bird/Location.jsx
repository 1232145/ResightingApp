import React, { useState } from 'react';
import { LabelInfo } from '../InfoBox';
import { Form, Input, Button } from 'antd';
import { Options } from '../Option';

const { Item } = Form;
const locOptions = ["PB", "PBV", "PC", "PCV", "PP", "GB", "RZ", "NB", "SB", "GR", "AB", "B1-B300"];

const info = (
    <div>
        <p>PB	Puffin Blind</p>
        <p>PBV	Puffin Blind Vegetation (in sod)</p>
        <p>P	Puffin Condo</p>
        <p>PCV	Puffin Condo Vegetation</p>
        <p>PP	Puffin Point</p>
        <p>GB	Generator Berm (Betw. Lighthouse and gen. build)</p>
        <p>RZ	Razorbill Blind</p>
        <p>NB	North Berm; Boathouse to Foghorn</p>
        <p>SB	Southeast Berm; Puffin Condo to Generator Blind</p>
        <p>GR	Generator Rocks (Betw. Gen. build. And SW corner)</p>
        <p>AB	Artificial Burrow</p>
        <p>B1-B300	Burrow #</p>
    </div>
);

function Location({ form, styles }) {
    const [item, setItem] = useState(null);
    const [options, setOptions] = useState([...locOptions]);

    const setData = (item) => {
        form.setFieldValue('loc', item);
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
        <div>
            <LabelInfo title="Location" label='Loc' info={info} required={true} styles={styles} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Item
                    name='loc'
                    rules={[{ required: true, message: '' }]}
                >
                    <Input value={form.getFieldValue('loc')} onChange={(e) => handleChange(e.currentTarget.value)} />
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
                <Options options={options} selected={form.getFieldValue('loc')} setData={setData} />
            </div>
        </div>
    )
}

export default Location;