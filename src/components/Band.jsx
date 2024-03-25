import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { LabelInfo } from './InfoBox';
import { Options } from './Option';

const { Item } = Form;
const { Title } = Typography;

//TODO: Divide each options button into seperate component
const bandTypes = ["CC", "BC", "PFR", "NRM", "BBL", "RMFR"];
const bandColors = ["M", "W", "BLK", "Y", "BLU", "BRW", "R", "G", "LG", "BrB", "ObO", "Or"];
const engravingColors = ["M", "W", "BLK", "BLU", "BRW", "None", "R", "Y"];
const specialFeatures = ["DAR", "DBR", "HTwR", "HThR", "VR", "HNR", "VNR", "NC", "NBi"]
const legs = ["L", "R"];
const wearScores = ["1", "2", "3", "4", "U"];
const read = [];
const confidence = [];

function Band({ index, initBand, setIsBand, data, setData, styles }) {
  const [form] = Form.useForm();
  const [bandNumber, setBandNumber] = useState(0); //band number (only 0 and 1)

  //function to save band data
  const saveData = (data) => {
    const values = form.getFieldsValue();
    let update = [...data];
    update[bandNumber] = values;
    setData(update);
  }

  //function to switch between band
  const switchBand = (n) => {
    saveData(data);
    setBandNumber(n);
    form.setFieldsValue(data[n]);
  }

  useEffect(() => {
    switchBand(bandNumber);
  }, [])

  //navigate to feeding tab and save current band data
  const navigate = (bool) => {
    saveData(data);
    setIsBand(bool);
  }

  //function to generate button template
  const generateTemplate = (field, label, options) => {
    return (
      <Col span={12} style={styles.col}>
        <LabelInfo label={label} info='To be added' required={true} styles={styles} />
        <Item
          name={field}
          rules={[{ required: true, message: 'Please enter a value!' }]}
        >
          <Input value={form.getFieldValue(field)} />
        </Item>

        <div style={styles.options}>
          <Options options={options} form={form} field={field} />
        </div>
      </Col>
    )
  }

  return (
    <div style={styles.container}>
      <Title level={3} style={{ marginBottom: '20px' }}>
        Band Number {bandNumber + 1} / Feeding {index + 1}
      </Title>

      <Form
        form={form}
        name="band"
        initialValues={{ ...initBand }}
        labelCol={{ xs: 24, sm: 8 }} // Responsive label column
        wrapperCol={{ xs: 24, sm: 24 }} // Responsive wrapper column
        style={styles.form}
      >
        <div style={styles.topbox}>
          {/* <div style={styles.leftTop}> */}
          {/* <Item name='note' label='Notes'>
              <Input.TextArea rows={5} style={styles.text} />
            </Item> */}
          {/* </div> */}

          <div style={styles.rightTop}>
            <div>Select band number:</div>
            <div>
              {
                data.map((_, index) => {
                  return (
                    <Button
                      key={index}
                      onClick={() => switchBand(index)}
                      style={{
                        ...styles.button,
                        ...(bandNumber === index && styles.highlight),
                      }}
                    >
                      Band {index + 1}
                    </Button>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div style={styles.botbox}>
          <Row>
            {
              generateTemplate('type', 'Band Type', bandTypes)
            }

            {
              generateTemplate('color', 'Band Color', bandColors)
            }

            {
              generateTemplate('engrColor', 'Engr. Color', engravingColors)
            }

            {
              generateTemplate('specFeat', 'Spec. Feat', specialFeatures)
            }

            {
              generateTemplate('leg', 'Leg (L/R)', legs)
            }

            {
              generateTemplate('wearScore', 'Wear Score', wearScores)
            }

            {
              generateTemplate('read', 'Read', read)
            }

            {
              generateTemplate('confidence', 'Confidence', confidence)
            }

            <Col span={12} style={styles.col}>
              <LabelInfo label="Band Number" info='To be added' required={true} styles={styles} />
              <Item
                name='number'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('number')} />
              </Item>
            </Col>
          </Row>
        </div>

        <div>
          <div style={styles.buttonContainer}>
            <Button onClick={() => navigate(false)} style={{ marginRight: 10, borderColor: 'green', color: 'green' }}>
              Back to bird details
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Band;