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

function Band({ index, handleNavigate, data, setData, styles }) {
  const [form] = Form.useForm();
  const [bandNumber, setBandNumber] = useState(0);

  // Default band detail data
  const band = {
    type: "",
    color: "",
    engrColor: "",
    specFeat: "",
    leg: "",
    number: "",
    wearScore: "",
    read: "",
    confidence: "",
  };

  const saveData = () => {
    const values = form.getFieldsValue();
    let update = [...data];
    update[bandNumber] = values;
    setData(update);
  }

  const switchBand = (n) => {
    saveData();
    setBandNumber(n);
    form.setFieldsValue(data[n]);
  }

  useEffect(() => {
    switchBand(bandNumber);
  }, [])

  return (
    <div style={styles.container}>
      <Title level={3} style={{ marginBottom: '20px' }}>
        Band Number {bandNumber + 1} / Feeding {index + 1}
      </Title>

      <Form
        form={form}
        name="band"
        initialValues={{ ...band }}
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
            <Col span={12} style={styles.col}>
              <div style={styles.text}>Band Type</div>
              <Item
                name='type'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('type')} />
              </Item>

              <div style={styles.options}>
                {bandTypes.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('type', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Band Color</div>
              <Item
                name='color'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('color')} />
              </Item>

              <div style={styles.options}>
                {bandColors.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('color', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Engr. Color</div>
              <Item
                name='engrColor'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('engrColor')} />
              </Item>

              <div style={styles.options}>
                {engravingColors.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('engrColor', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Spec. Feat</div>
              <Item
                name='specFeat'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('specFeat')} />
              </Item>

              <div style={styles.options}>
                {specialFeatures.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('specFeat', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Leg (L/R)</div>
              <Item
                name='leg'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('leg')} />
              </Item>

              <div style={styles.options}>
                {legs.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('leg', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Band Number</div>
              <Item
                name='number'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('number')} />
              </Item>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Wear Score</div>
              <Item
                name='wearScore'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('wearScore')} />
              </Item>

              <div style={styles.options}>
                {wearScores.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('wearScore', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Read</div>
              <Item
                name='read'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('read')} />
              </Item>

              <div style={styles.options}>
                {bandTypes.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('read', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>

            <Col span={12} style={styles.col}>
              <div style={styles.text}>Confidence</div>
              <Item
                name='confidence'
                rules={[{ required: true, message: 'Please enter a value!' }]}
              >
                <Input value={form.getFieldValue('confidence')} />
              </Item>

              <div style={styles.options}>
                {bandTypes.map((item, index) => (
                  <Button key={index} style={styles.button} onClick={() => form.setFieldValue('confidence', item)}>
                    {item}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <div style={styles.buttonContainer}>
            <Button onClick={() => handleNavigate(true)} style={{ marginRight: 10, borderColor: 'green', color: 'green' }}>
              Back to bird details
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default Band;