import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, Typography } from 'antd';
import BirdDetails from './BirdDetails';

const { Item } = Form;
const { Title } = Typography;

const styles = {
    form: {
        border: '1px solid #d9d9d9',
        padding: '30px',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        width: '50%',
    },

    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '75vh',
        flexDirection: 'column',
    },

    input: {
        width: "100%",
    },

    buttonContainer: {
        display: 'flex',
        marginBottom: '20px',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    timeButton: {
        marginLeft: '10px',
        alignSelf: 'center',
    },
};

function StintData() {
    // Display stint/feeding data
    const [form] = Form.useForm();

    //default bird details data
    const [birdDetails, setBirdDetails] = useState([]);

    // Default stint data
    const [stint, setStint] = useState({
        islandAlpha: '',
        year: new Date().getYear(),
        location: '',
        timeStart: '',
        timeEnd: '',
        date: '',
        birdDetails: birdDetails,
    });

    const [currentPage, setCurrentPage] = useState(0); //0 is stint, 1 is feeding

    const jsonToCSV = (json) => {
    }

    function csvToJson(csv) {
    }

    const handleSave = () => {
        let csv = '';
        const data = stint;

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        saveAs(file, 'data.csv');
    }

    const setCurrentTime = (field) => {
        const currentTime = new Date();
        // const year = currentTime.getFullYear();
        // const month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
        // const day = currentTime.getDate().toString().padStart(2, '0');
        const hours = currentTime.getHours().toString().padStart(2, '0');
        const minutes = currentTime.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;

        form.setFieldValue(field, time);
    }


    const handleNavigate = (dst) => {
        setCurrentPage(dst);
    }

    if (currentPage === 0) {
        return (
            <div style={styles.container}>
                <Title level={3} style={{ marginBottom: '20px' }}>
                    Resighting Form
                </Title>

                <Form
                    form={form}
                    name="stintData"
                    onFinish={handleSave}
                    labelCol={{ xs: 24, sm: 8 }} // Responsive label column
                    wrapperCol={{ xs: 24, sm: 16 }} // Responsive wrapper column
                    style={styles.form}
                >
                    <Row gutter={24}>
                        <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
                            <Item
                                label="Island Alpha"
                                name="islandAlpha"
                                rules={[{ required: true, message: 'Please enter Island Alpha!' }]}
                            >
                                <Input style={styles.input} size="small" />
                            </Item>

                            <Item
                                label="Year"
                                name="year"
                                rules={[{ type: 'number', min: 0, required: true, message: 'Please enter Year!' }]}
                            >
                                <InputNumber style={styles.input} size="small" />
                            </Item>

                            <Item
                                label="Location"
                                name="location"
                                rules={[{ required: true, message: 'Please enter Location!' }]}
                            >
                                <Input style={styles.input} size="small" />
                            </Item>
                        </Col>
                        <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
                            <div style={styles.buttonContainer}>
                                <Item
                                    label="Time Start"
                                    name="timeStart"
                                    rules={[{ required: true, message: 'Please enter Time Start!' }]}
                                    style={{ margin: '0px' }}
                                    labelCol={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} // Responsive label column
                                    wrapperCol={{ xs: 24, sm: 16 }} // Responsive wrapper column
                                >
                                    <Input value={form.getFieldValue('timeStart')} disabled />
                                </Item>

                                <Button onClick={() => setCurrentTime("timeStart")} size="small" style={styles.timeButton}>
                                    Start time
                                </Button>
                            </div>

                            <div style={styles.buttonContainer}>
                                <Item
                                    label="Time End"
                                    name="timeEnd"
                                    rules={[{ required: true, message: 'Please enter Time End!' }]}
                                    style={{ margin: '0px' }}
                                    labelCol={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} // Responsive label column
                                    wrapperCol={{ xs: 24, sm: 16 }} // Responsive wrapper column
                                >
                                    <Input value={form.getFieldValue('timeEnd')} disabled />
                                </Item>

                                <Button onClick={() => setCurrentTime("timeEnd")} size="small" style={styles.timeButton}>
                                    End time
                                </Button>
                            </div>

                            <div style={styles.buttonContainer}>
                                <Item
                                    label="Date"
                                    name="date"
                                    rules={[{ type: 'date', required: true, message: 'Please select Date!' }]}
                                >
                                    <DatePicker format="YYYY-MM-DD" style={styles.input} size="small" />
                                </Item>
                            </div>
                        </Col>
                    </Row>

                    <div>
                        <div style={styles.buttonContainer}>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Save
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Import
                            </Button>
                        </div>

                        <div style={styles.buttonContainer}>
                            <Button onClick={() => handleNavigate(1)}>Bird details</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
    else if (currentPage === 1) {
        return (
            <>
                <BirdDetails handleNavigate={handleNavigate} data={birdDetails} setData={setBirdDetails} />
            </>
        )
    }
    else {
        return (
            <>

            </>
        )
    }
}

export default StintData;
