import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'; // Import icons
import Band from './Band';

const { Item } = Form;
const { Title } = Typography;

const styles = {
    text: {
        fontSize: '15px', // Adjust the font size as needed
    },

    form: {
        border: '1px solid #d9d9d9',
        padding: '30px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '1200px',
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh',
        flexDirection: 'column',
        margin: '0px',
    },

    buttonContainer: {
        display: 'flex',
        margin: '20px',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    timeButton: {
        marginLeft: '10px',
        alignSelf: 'center',
        fontSize: '12px'
    },

    topbox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    leftTop: {
        width: '35%'
    },

    rightTop: {
        width: '50%'
    },

    botbox: {
        marginTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #d9d9d9',
        padding: '20px',
    },

    col: {
        flex: 1, // Distribute available space evenly
        marginRight: '20px', // Add spacing between columns
    },

    options: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
    },

    button: {
        width: '100%',
        height: '50px',
        fontSize: '16px',
    },

    dataButton: {
        width: '20%',
        height: '37.5px',
        margin: '2px',
    },

    dataContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxHeight: '150px',
        overflowY: 'auto',
    },

    highlight: {
        backgroundColor: 'green',
        color: 'white',
        border: '1px solid black'
    }
};

const speciesOptions = ["ATPU", "ARTE"];
const proxOptions = [1, 2, 5, 10, 15];

function BirdDetails({ handleNavigate, data, setData, birdDetail, initBand}) {
    const [form] = Form.useForm();
    const [isBirdDetail, setIsBirdDetail] = useState(true); //true is bird detail, false is band data
    const [index, setIndex] = useState(0);
    const [band, setBand] = useState([...birdDetail.band]); 

    const setCurrentTime = (field) => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        form.setFieldValue(field, time);
    };

    const saveData = (data) => {
        const currentData = form.getFieldsValue();
        let updated = [...data];
        updated[index] = currentData;
        updated[index].band = band;
        setData(updated);
    }

    const switchData = (idx) => {
        saveData(data);
        setIndex(idx);
        form.setFieldsValue(data[idx]);
    }

    const addData = () => {
        //create new added data
        let updated = [...data];
        updated.push({ ...birdDetail });

        //save current data
        saveData(updated);

        //adjust index
        setIndex(updated.length - 1);

        //reset inputs
        form.setFieldsValue({ ...birdDetail });
    }

    const removeData = () => {
        if (data.length > 1) {
            //remove data
            let updated = [...data].filter((_item, idx) => idx !== index);
            setData(updated);

            //reset inputs and index
            setIndex(index - 1);
            form.setFieldsValue(data[index - 1]);
        }
    }

    const removeAll = () => {
        setData([{ ...birdDetail }]);
        setIndex(0);
        form.setFieldsValue(data[0]);
    }

    const navigate = (idx) => {
        saveData(data);
        handleNavigate(idx);
    }

    useEffect(() => {
        switchData(index);
    }, [])

    useEffect(() => {
        setBand(data[index].band);
    }, [data])

    if (isBirdDetail) {
        return (
            <div style={styles.container}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                    Feeding form {index + 1}
                </Title>

                <Form
                    form={form}
                    name="birdDetails"
                    initialValues={{ ...birdDetail }}
                    labelCol={{ xs: 24, sm: 8 }} // Responsive label column
                    wrapperCol={{ xs: 24, sm: 24 }} // Responsive wrapper column
                    style={styles.form}
                >
                    <Item hidden name="band"></Item>

                    <div style={styles.topbox}>
                        <div style={styles.leftTop}>
                            <div style={styles.buttonContainer}>
                                <Item
                                    label="Time"
                                    name="time"
                                    rules={[{ required: true, message: 'Please enter a time!' }]}
                                    style={{ margin: '0px' }}
                                >
                                    <Input value={form.getFieldValue('time')} />
                                </Item>

                                <Button onClick={() => setCurrentTime("time")} size="small" style={styles.timeButton}>
                                    Time
                                </Button>
                            </div>

                            <Item name='birdNotes' label='Notes'>
                                <Input.TextArea rows={5} style={styles.text} />
                            </Item>
                        </div>

                        <div style={styles.rightTop}>
                            <div>Number of data: {data.length}</div>
                            <div>
                                <Button
                                    icon={<PlusOutlined />}
                                    onClick={() => addData()}
                                    style={{ borderColor: 'green', color: 'green', margin: '5px 5px 5px 0px' }}
                                >
                                    Add
                                </Button>
                                <Button
                                    icon={<MinusOutlined />}
                                    danger
                                    onClick={() => removeData()}
                                >
                                    Remove
                                </Button>
                            </div>
                            <div style={styles.text}>List of data:</div>
                            <div style={styles.dataContainer}>
                                {data.map((_item, idx) => (
                                    <Button
                                        key={idx}
                                        style={{
                                            ...styles.dataButton,
                                            ...(idx === index && styles.highlight),
                                        }}
                                        onClick={() => switchData(idx)}
                                    >
                                        Data {idx + 1}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={styles.botbox}>
                        <Row>
                            <Col span={12} style={styles.col}>
                                <div style={styles.text}>Species</div>
                                <Item
                                    name="species"
                                    rules={[{ required: true, message: 'Please enter species!' }]}
                                >
                                    <Input value={form.getFieldValue('species')} />
                                </Item>

                                <div style={styles.options}>
                                    {speciesOptions.map((item, index) => (
                                        <Button key={index} style={styles.button} onClick={() => form.setFieldValue('species', item)}>
                                            {item}
                                        </Button>
                                    ))}
                                </div>
                            </Col>
                            <Col span={12} style={styles.col}>
                                <div style={styles.text}>Prox</div>
                                <Item
                                    name='prox'
                                    rules={[{ required: true, message: 'Please enter species!' }]}
                                >
                                    <InputNumber value={form.getFieldValue('prox')} />
                                </Item>

                                <div style={styles.options}>
                                    {proxOptions.map((item, index) => (
                                        <Button key={index} style={styles.button} onClick={() => form.setFieldValue('prox', item)}>
                                            {item}
                                        </Button>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <div style={{ ...styles.botbox, justifyContent: 'flex-start' }}>
                            <Button danger style={{ margin: 5 }} onClick={() => form.setFieldsValue({ ...birdDetail })}>Clear all</Button>
                            <Button danger style={{ margin: 5 }} onClick={() => removeAll()}>Delete all</Button>
                        </div>
                    </div>

                    <div>
                        <div style={styles.buttonContainer}>
                            <Button onClick={() => navigate(0)} style={{ marginRight: 10, borderColor: 'green', color: 'green' }}>
                                Back to Stint
                            </Button>
                            <Button onClick={() => setIsBirdDetail(false)}>
                                Band details
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
    else {
        return (
            <>
                <Band index={index} initialData={initBand} handleNavigate={setIsBirdDetail} birdDetails={data} data={band} setData={setBand} styles={styles} />
            </>
        )
    }
}

export default BirdDetails;
