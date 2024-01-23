import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Form, Input, Button, DatePicker, Row, Col, Typography, Upload, message } from 'antd';
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


// Default band detail data
const initBand = {
    type: "",
    color: "",
    engrColor: "",
    specFeat: "",
    leg: "",
    number: "",
    wearScore: "",
    read: "",
    confidence: "",
    // note: ""
};

// Default bird detail data
const initFeeding = {
    species: '',
    time: '',
    loc: '',
    prox: 0,
    birdNotes: '',
    band: [{ ...initBand }, { ...initBand }]
};

function StintData() {
    // Display stint/feeding data
    const [form] = Form.useForm();

    //default bird details data
    const [birdDetails, setBirdDetails] = useState([{ ...initFeeding }]);

    // Default stint data
    const [stint, setStint] = useState({
        obsInit: '',
        location: '',
        timeStart: '',
        timeEnd: '',
        date: '',
        stintNotes: '',
        birdDetails: birdDetails,
    });

    const [isFeeding, setIsFeeding] = useState(false);

    const jsonToCSV = (json) => {

        const headers = [
            'Obs Init, Location (Blind), Time Start, Time End, Date (mm/dd/yy), Stint Notes, Species (Alpha), Time, Loc, Prox (m), Bird Notes, Band Type, Band Color, Engr. Color, Spec. Feat, Leg (L/R), Band Number, Band Wear Present (Y/N) /Wear Score, Read, Confidence, Band Type, Band Color, Engr. Color, Spec. Feat, Leg (L/R), Band Number, Band Wear Present (Y/N) /Wear Score, Confidence, Read'
        ];

        const csvRows = [headers.join(',')];

        json.birdDetails.forEach(feeding => {
            const { band } = feeding;

            const row = [
                json.obsInit, json.location, json.timeStart, json.timeEnd, json.date, json.stintNotes,
                feeding.species, feeding.time, feeding.loc, feeding.prox, feeding.birdNotes,
                band[0].type, band[0].color, band[0].engrColor, band[0].specFeat, band[0].leg, band[0].number, band[0].wearScore, band[0].read, band[0].confidence,
                band[1].type, band[1].color, band[1].engrColor, band[1].specFeat, band[1].leg, band[1].number, band[1].wearScore, band[1].read, band[1].confidence
            ]

            csvRows.push(row.join(', '));
        });

        return csvRows.join('\n');
    }

    function csvToJson(csv) {
        const rows = csv.split('\n').map(row => row.split(','));

        if (rows.length < 2) {
            return;
        }

        const feedingData = rows.slice(1).reduce((acc, row) => {

            const data =
            {
                species: row[6],
                time: row[7],
                loc: row[8],
                prox: row[9],
                birdNotes: row[10],
                band: [{
                    type: row[11],
                    color: row[12],
                    engrColor: row[13],
                    specFeat: row[14],
                    leg: row[15],
                    number: row[16],
                    wearScore: row[17],
                    read: row[18],
                    confidence: row[19],
                }, {
                    type: row[20],
                    color: row[21],
                    engrColor: row[22],
                    specFeat: row[23],
                    leg: row[24],
                    number: row[25],
                    wearScore: row[26],
                    read: row[27],
                    confidence: row[28],
                }]
            };

            acc.push(data);

            return acc;

        }, []);

        const stintData = rows[1];

        const jsonData = {
            obsInit: stintData[0],
            location: stintData[1],
            timeStart: stintData[2],
            timeEnd: stintData[3],
            date: stintData[4],
            stintNotes: stintData[5],
            birdDetails: feedingData,
        };

        return jsonData;
    }

    const handleSave = () => {
        let csv = '';
        let data = { ...form.getFieldsValue(), birdDetails: birdDetails };
        data.date = formatDate(data.date);

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        saveAs(file, `${data.timeStart}-${data.timeEnd}-${data.date}-${data.obsInit}-${data.location}.csv`);
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    const handleFileUpload = (info) => {
        // const file = event.target.files[0];
        const file = info.file;

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            const csv = e.target.result;
            let stint = csvToJson(csv);

            setBirdDetails(stint.birdDetails);
            stint.date = null;

            form.setFieldsValue(stint);
        };

        reader.onerror = () => {
            alert('Error reading the CSV file.');
        };

        reader.readAsText(file);
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

    // When users accidentally close the app, ask for confirmation
    useEffect(() => {
        handleOpenFromLocalStorage();

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';

            // Display a confirmation dialog to the user
            const confirmationMessage = 'Are you sure you want to leave this page?';
            e.returnValue = window.confirm(confirmationMessage) ? undefined : '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    /**
     * Handles opening data from localStorage
     */
    const handleOpenFromLocalStorage = () => {
        const backupData = localStorage.getItem('backup');


        // if local storage not null
        if (backupData != null) {
            // Parse the JSON data from localStorage

            const jsonData = JSON.parse(backupData);

            setStint(jsonData);
        }
    };

    if (!isFeeding) {
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
                                label="Observation Init"
                                name="obsInit"
                                rules={[{ required: true, message: 'Please enter a value!' }]}
                            >
                                <Input style={styles.input} size="small" />
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
                                    <Input value={form.getFieldValue('timeStart')} />
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
                                    <Input value={form.getFieldValue('timeEnd')} />
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
                            <Upload
                                style={{ maxWidth: '25px' }}
                                customRequest={handleFileUpload}
                                accept=".csv"
                                beforeUpload={file => {
                                    if (file.type !== "text/csv") {
                                        message.error(`${file.name} is not a csv file`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    return true;
                                }}
                            >
                                <Button type="primary">Import</Button>
                            </Upload>
                        </div>

                        <div style={styles.buttonContainer}>
                            <Button onClick={() => setIsFeeding(true)}>Bird details</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
    else {
        return (
            <>
                <BirdDetails setIsFeeding={setIsFeeding} initFeeding={initFeeding} initBand={initBand} data={birdDetails} setData={setBirdDetails} />
            </>
        )
    }
}

export default StintData;

//TODO: Date error