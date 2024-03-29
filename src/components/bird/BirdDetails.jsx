import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, Row, Col, Tooltip, Modal } from 'antd';
import { PlusOutlined, MinusOutlined, CloseOutlined } from '@ant-design/icons';
import Band from '../band/Band';
import { LabelInfo } from '../InfoBox';
import Species from './Species';
import Prox from './Prox';

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

    label: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '0px',
        height: '50px'
    },

    button: {
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

function BirdDetails({ setIsFeeding, data, setData, initFeeding, initBand }) {
    const [form] = Form.useForm();
    const [isBand, setIsBand] = useState(false); //toggle between feeding and band tab
    const [index, setIndex] = useState(0); //feeding index

    //handle time stamp
    const setCurrentTime = (field) => {
        const currentTime = new Date();
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        form.setFieldValue(field, time);
    };

    //function to set the band value of this feeding
    const setBand = (values) => {
        let updated = [...data];
        updated[index].band = values;
        setData(updated);
    }

    //function to auto save the feeding values
    const saveData = (data) => {
        const currentData = form.getFieldsValue();
        let updated = [...data];

        //retain band
        const band = updated[index].band;

        //currentData does not have band
        updated[index] = currentData;
        updated[index].band = band;

        setData(updated);
    }

    //function to switch between feeding tab
    const switchData = (idx) => {
        saveData(data);
        setIndex(idx);
        form.setFieldsValue(data[idx]);
    }

    //function to add feeding tab
    const addData = () => {
        //create new added data
        let updated = [...data];
        updated.push({ ...initFeeding });

        //save current data
        saveData(updated);

        //adjust index
        setIndex(updated.length - 1);

        //reset inputs
        form.setFieldsValue({ ...initFeeding });
        setCurrentTime("time");
    }

    //function to remove feeding tab
    const removeData = () => {
        if (data.length > 1) {
            Modal.confirm({
                title: 'Are you sure you want to delete the current data?',
                content: 'This action cannot be undone.',
                onOk: () => {
                    //remove data
                    let updated = [...data].filter((_item, idx) => idx !== index);
                    setData(updated);

                    //reset inputs and index
                    setIndex(index - 1);
                    form.setFieldsValue(data[index - 1]);
                },
                onCancel: () => {

                }
            })
        }
    }

    const closeData = () => {
        const curData = data[index];
        let emptyFields = [];

        for (const field in curData) {
            if (field === 'birdNotes') {
                continue;
            }

            const value = curData[field];

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    for (const element in item) {
                        if (item[element] === '') {
                            emptyFields.push(`${field}${index + 1}`);
                            break;
                        }
                    }
                })
            }
            else if (value === '') {
                emptyFields.push(field);
            }
        }

        if (emptyFields.length !== 0) {
            Modal.confirm({
                title: 'Closed the current data?',
                content: `Empty field(s): ${emptyFields}`,
                onOk: () => {
                    //TODO: implement close feeding
                },
                onCancel: () => {

                }
            })
        }
        else {
            //TODO: implement close feeding
        }
    }

    const clearAll = () => {
        Modal.confirm({
            title: 'Are you sure you want to clear ALL fields?',
            content: 'This action cannot be undone.',
            onOk: () => {
                form.setFieldsValue({ ...initFeeding });
            },
            onCancel: () => {

            }
        })
    }

    //function to remove all feeding tab
    const removeAll = () => {
        Modal.confirm({
            title: 'Are you sure you want to remove ALL items?',
            content: 'This action cannot be undone.',
            onOk: () => {
                setData([{ ...initFeeding }]);
                setIndex(0);
                form.setFieldsValue({ ...initFeeding });
            },
            onCancel: () => {

            }
        })
    }

    //function to navigate to stint or band tab
    const navigate = (dst) => {
        saveData(data);

        if (dst === "stint") {
            setIsFeeding(false);
        }
        else {
            setIsBand(true);
        }
    }

    //when first load, switch to the feeding tab number index
    useEffect(() => {
        switchData(index);

        if (form.getFieldValue("time") === '') {
            setCurrentTime("time");
        }
    }, [])

    if (!isBand) {
        return (
            <div style={styles.container}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                    Feeding form {index + 1}
                </Title>

                <Form
                    form={form}
                    name="birdDetails"
                    initialValues={{ ...initFeeding }}
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
                                <Tooltip title='Click to add a data'>
                                    <Button
                                        icon={<PlusOutlined />}
                                        onClick={() => addData()}
                                        style={{ borderColor: 'green', color: 'green', margin: '5px 0px 5px 0px' }}
                                    >
                                        Add
                                    </Button>
                                </Tooltip>
                                <Tooltip title='Click to remove the current data'>
                                    <Button
                                        icon={<MinusOutlined />}
                                        danger
                                        onClick={() => removeData()}
                                        style={{ margin: '0px 5px' }}
                                    >
                                        Remove
                                    </Button>
                                </Tooltip>
                                <Tooltip title='Click to close the current data'>
                                    <Button
                                        icon={<CloseOutlined />}
                                        style={{ borderColor: '#ff4c00', color: '#ff4c00', margin: '5px 0px 5px 0px' }}
                                        onClick={() => closeData()}
                                    >
                                        Closed
                                    </Button>
                                </Tooltip>
                            </div>
                            <div style={styles.text}>List of data:</div>
                            <div style={styles.dataContainer}>
                                {data.map((_item, idx) => (
                                    <Button
                                        key={idx}
                                        style={{
                                            ...styles.button,
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
                                <Species form={form} styles={styles} />
                            </Col>
                            <Col span={12} style={styles.col}>
                                <LabelInfo label='Loc' info='Info to be added' required={true} styles={styles} />
                                <Item
                                    name='loc'
                                    rules={[{ required: true, message: 'Please enter a value!' }]}
                                >
                                    <Input value={form.getFieldValue('loc')} />
                                </Item>
                            </Col>
                            <Col span={12} style={styles.col}>
                                <Prox form={form} styles={styles} />
                            </Col>
                        </Row>
                    </div>

                    <div>
                        <div style={{ ...styles.botbox, justifyContent: 'flex-start' }}>
                            <Tooltip title='Clear ALL fields'>
                                <Button danger style={{ margin: 5 }} onClick={() => clearAll()}>Clear all</Button>
                            </Tooltip>
                            <Tooltip title='Delete ALL data'>
                                <Button danger style={{ margin: 5 }} onClick={() => removeAll()}>Delete all</Button>
                            </Tooltip>
                        </div>
                    </div>

                    <div>
                        <div style={styles.buttonContainer}>
                            <Button onClick={() => navigate("stint")} style={{ marginRight: 10, borderColor: 'green', color: 'green' }}>
                                Back to Stint
                            </Button>
                            <Button onClick={() => navigate("band")}>
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
                <Band index={index} initBand={initBand} setIsBand={setIsBand} data={data[index].band} setData={setBand} styles={styles} />
            </>
        )
    }
}

export default BirdDetails;
