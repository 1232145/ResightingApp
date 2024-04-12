import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { Form, Input, Button, DatePicker, Row, Col, Typography, Upload, message, Modal } from 'antd';
import BirdDetails from '../bird/BirdDetails';
import moment from 'moment';
import PreviewData from './PreviewData';

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
        minHeight: '50vh',
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

    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
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
    prox: '',
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
        id: 0,
        obsInit: '',
        island: '',
        blind: '',
        timeStart: '',
        timeEnd: '',
        date: '',
        stintNotes: '',
        birdDetails: birdDetails,
    });

    const [isFeeding, setIsFeeding] = useState(false); //toggle between stint and feeding
    const [isModalVisible, setIsModalVisible] = useState(false); //exit confirmation
    const [preview, setPreview] = useState(false);
    const [previewData, setPreviewData] = useState(null);

    const hash = (str) => {
        let hash = 5381;

        for (let i = 0; i < str.length; i++) {
            hash = (hash * 33) ^ str.charCodeAt(i);
        }

        return hash >>> 0; // Convert to unsigned 32-bit integer
    }

    //convert json to csv file
    const jsonToCSV = (json) => {

        const headers = [
            'StintID', 'Obs Init, Island, Location/Blind, Time Start, Time End, Date (mm/dd/yy), Stint Notes, Species (Alpha), Time, Loc, Prox (m), Bird Notes, Band Type, Band Color, Engr. Color, Spec. Feat, Leg (L/R), Band Number, Band Wear Present (Y/N) /Wear Score, Read, Confidence, Band Type, Band Color, Engr. Color, Spec. Feat, Leg (L/R), Band Number, Band Wear Present (Y/N) /Wear Score, Confidence, Read'
        ];

        const csvRows = [headers.join(',')];

        json.birdDetails.forEach(feeding => {
            const { band } = feeding;

            const row = [
                json.id, json.obsInit, json.island, json.blind, json.timeStart, json.timeEnd, json.date, json.stintNotes,
                feeding.species, feeding.time, feeding.loc, feeding.prox, feeding.birdNotes,
                band[0].type, band[0].color, band[0].engrColor, band[0].specFeat, band[0].leg, band[0].number, band[0].wearScore, band[0].read, band[0].confidence,
                band[1].type, band[1].color, band[1].engrColor, band[1].specFeat, band[1].leg, band[1].number, band[1].wearScore, band[1].read, band[1].confidence
            ]

            csvRows.push(row.join(', '));
        });

        return csvRows.join('\n');
    }

    //convert csv to json file
    const csvToJson = (csv) => {
        const rows = csv.split('\n').map(row => row.split(','));

        if (rows.length < 2) {
            return;
        }

        // Trim all elements of each row
        const trimmedRows = rows.map(row => row.map(cell => cell.trim()));
        const stintData = trimmedRows[1];

        let index = 0;

        let jsonData = {
            id: stintData[index++],
            obsInit: stintData[index++],
            island: stintData[index++],
            blind: stintData[index++],
            timeStart: stintData[index++],
            timeEnd: stintData[index++],
            date: stintData[index++],
            stintNotes: stintData[index++],
            birdDetails: null,
        };

        const feedingData = trimmedRows.slice(1).reduce((acc, row) => {
            let i = index

            const data = {
                species: row[i++],
                time: row[i++],
                loc: row[i++],
                prox: row[i++],
                birdNotes: row[i++],
                band: [{
                    type: row[i++],
                    color: row[i++],
                    engrColor: row[i++],
                    specFeat: row[i++],
                    leg: row[i++],
                    number: row[i++],
                    wearScore: row[i++],
                    read: row[i++],
                    confidence: row[i++],
                }, {
                    type: row[i++],
                    color: row[i++],
                    engrColor: row[i++],
                    specFeat: row[i++],
                    leg: row[i++],
                    number: row[i++],
                    wearScore: row[i++],
                    read: row[i++],
                    confidence: row[i++],
                }]
            };

            acc.push(data);

            return acc;
        }, []);

        jsonData.birdDetails = feedingData;

        return jsonData;
    }

    //handle set current time button
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

    const isEqual = (obj1, obj2) => {
        // Shallow comparison for the band property
        const band1 = JSON.stringify(obj1.band);
        const band2 = JSON.stringify(obj2.band);

        // Compare other properties
        const otherPropsEqual = Object.keys(obj1).every(key => obj1[key] === obj2[key]);

        // Compare bands
        return band1 === band2 && otherPropsEqual;
    }

    const getData = () => {
        let data = { ...form.getFieldsValue(), birdDetails: birdDetails };
        data.date = formatDate(data.date);

        const id = `${data.timeStart}-${data.timeEnd}-${data.date}-${data.obsInit}-${data.island}.csv`;
        data.id = hash(id);

        return data;
    }

    //handle save data to csv file button
    const handleSave = () => {
        if (birdDetails.length <= 1 && isEqual(birdDetails[0], initFeeding)) {
            message.error("Data missing, please check again!");
            return;
        }

        if (form.getFieldValue('timeEnd') === '') {
            setCurrentTime("timeEnd");
        }

        let csv = '';
        let data = getData();

        csv += jsonToCSV(data);

        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' });

        const id = `${data.timeStart}-${data.timeEnd}-${data.date}-${data.obsInit}-${data.island}.csv`;

        saveAs(file, id);

        message.success("Dowloaded Successfully!");
    }

    //function to format date
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
    }

    //handle import csv file to this tablet
    const handleFileUpload = (info) => {
        Modal.confirm({
            title: 'Are you sure you want to import data? This will remove all current data',
            content: 'This action cannot be undone.',
            onOk: () => {
                // const file = event.target.files[0];
                const file = info.file;

                if (!file) return;

                const reader = new FileReader();

                reader.onload = (e) => {
                    const csv = e.target.result;
                    let data = csvToJson(csv);

                    setBirdDetails(data.birdDetails);

                    data.date = moment(data.date, 'MM/DD/YYYY');

                    form.setFieldsValue(data);
                    message.success("Uploaded Successfully!");

                    setPreview(false);
                };

                reader.onerror = () => {
                    alert('Error reading the CSV file.');
                    message.error("Upload Failed!");
                };

                reader.readAsText(file);
            },
            onCancel: () => {

            }
        })
    }

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

    const handlePreview = () => {
        setPreview(prev => !prev);
        setPreviewData(getData());
    }

    // When users accidentally close the app, ask for confirmation
    useEffect(() => {
        //set the time when open the app
        if (form.getFieldValue('timeStart') === '') {
            setCurrentTime("timeStart");
        }

        handleOpenFromLocalStorage();

        const handleBeforeUnload = (e) => {
            // e.preventDefault();
            // e.returnValue = "Are you sure you want to exit?";
            setIsModalVisible(true);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    //confirm exit button
    if (isModalVisible) {
        return (
            <Modal
                title="Confirm Exit"
                open={isModalVisible}
                onOk={
                    () => {
                        console.log("Close");
                    }}
                onCancel={
                    () => {
                        setIsModalVisible(false);
                    }
                }
                okText="Yes, Leave Page"
                cancelText="No, Stay"
            >
                Are you sure you want to leave this page?
            </Modal>
        )
    }

    if (!isFeeding) {
        return (
            <>
                <div style={styles.container}>
                    <Title level={3} style={{ marginBottom: '20px' }}>
                        Stint Form
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
                                    <Input style={styles.input} size="small" onChange={() => setPreview(false)} />
                                </Item>

                                <div style={styles.wrapper}>
                                    <Item
                                        label="Island"
                                        name="island"
                                        rules={[{ required: true, message: 'Please enter a value!' }]}
                                    >
                                        <Input style={styles.input} size="small" onChange={() => setPreview(false)} />
                                    </Item>
                                    <Item
                                        label="Blind"
                                        name="blind"
                                        rules={[{ required: true, message: 'Please enter a value!' }]}
                                    >
                                        <Input style={styles.input} size="small" onChange={() => setPreview(false)} />
                                    </Item>
                                </div>

                                <Item name='stintNotes' label='Notes'>
                                    <Input.TextArea rows={5} style={styles.text} onChange={() => setPreview(false)} />
                                </Item>
                            </Col>
                            <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
                                <div style={styles.buttonContainer}>
                                    <Item
                                        label="Time Start"
                                        name="timeStart"
                                        style={{ margin: '0px' }}
                                        labelCol={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} // Responsive label column
                                        wrapperCol={{ xs: 24, sm: 16 }} // Responsive wrapper column
                                    >
                                        <Input value={form.getFieldValue('timeStart')} onChange={() => setPreview(false)} />
                                    </Item>

                                    <Button onClick={() => setCurrentTime("timeStart")} size="small" style={styles.timeButton}>
                                        Start time
                                    </Button>
                                </div>

                                <div style={styles.buttonContainer}>
                                    <Item
                                        label="Time End"
                                        name="timeEnd"
                                        style={{ margin: '0px' }}
                                        labelCol={{ xs: 24, sm: 8, md: 8, lg: 8, xl: 8 }} // Responsive label column
                                        wrapperCol={{ xs: 24, sm: 16 }} // Responsive wrapper column
                                    >
                                        <Input value={form.getFieldValue('timeEnd')} onChange={() => setPreview(false)} />
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
                                        <DatePicker format="YYYY-MM-DD" style={styles.input} size="small" onChange={() => setPreview(false)} />
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
                                    showUploadList={false}
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
                                <Button onClick={() => handlePreview()} type="primary" style={{ marginLeft: '10px', backgroundColor: 'green' }}>
                                    Preview
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>

                {
                    preview && (
                        <>
                            <PreviewData data={previewData} />
                        </>
                    )
                }
            </>
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

//TODO: 
//Show data
//Sorted button