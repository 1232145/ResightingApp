import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';

const { Item } = Form;
const { Title } = Typography;
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
  const [bandNumber, setBandNumber] = useState(0);

  const saveData = (data) => {
    const values = form.getFieldsValue();
    let update = [...data];
    update[bandNumber] = values;
    setData(update);
  }

  const switchBand = (n) => {
    saveData(data);
    setBandNumber(n);
    form.setFieldsValue(data[n]);
  }

  useEffect(() => {
    switchBand(bandNumber);
  }, [])

  const navigate = (bool) => {
    saveData(data);
    setIsBand(bool);
}

  const generateOptions = (name, label, options) => {
    return (
      <Col span={12} style={styles.col}>
        <div style={styles.text}>{label}</div>
        <Item
          name={name}
          rules={[{ required: true, message: 'Please enter a value!' }]}
        >
          <Input value={form.getFieldValue(name)} />
        </Item>

        <div style={styles.options}>
          {options.map((item, index) => (
            <Button key={index} style={styles.button} onClick={() => form.setFieldValue(name, item)}>
              {item}
            </Button>
          ))}
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
          <div style={styles.leftTop}>


            <Item name='note' label='Notes'>
              <Input.TextArea rows={5} style={styles.text} />
            </Item>
          </div>

          <div style={styles.rightTop}>
            <div>Select band number:</div>
            <div>
              <Button
                onClick={() => switchBand(0)}
                style={{
                  ...styles.dataButton,
                  ...(bandNumber === 0 && styles.highlight),
                }}
              >
                Band 1
              </Button>
              <Button
                onClick={() => switchBand(1)}
                style={{
                  ...styles.dataButton,
                  ...(bandNumber === 1 && styles.highlight),
                }}
              >
                Band 2
              </Button>
            </div>
          </div>
        </div>

        <div style={styles.botbox}>
          <Row>
            {
              generateOptions('type', 'Band Type', bandTypes)
            }

            {
              generateOptions('color', 'Band Color', bandColors)
            }

            {
              generateOptions('engrColor', 'Engr. Color', engravingColors)
            }

            {
              generateOptions('specFeat', 'Spec. Feat', specialFeatures)
            }

            {
              generateOptions('leg', 'Leg (L/R)', legs)
            }

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Band Number</div>
              <Item
                name='number'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('number')} />
              </Item>
            </Col>

            {
              generateOptions('wearScore', 'Wear Score', wearScores)
            }

            {
              generateOptions('read', 'Read', read)
            }

            {
              generateOptions('confidence', 'Confidence', confidence)
            }
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