import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, Row, Col } from 'antd';
import { LabelInfo } from '../InfoBox';
import BandType from './BandType';
import BandColor from './BandColor';
import EngravingColor from './EngravingColor';
import SpecialFeature from './SpecialFeature';
import WearScore from './WearScore';
import BandLeg from './BandLeg';
import BandRead from './BandRead';
import BandConfidence from './BandConfidence';

const { Item } = Form;
const { Title } = Typography;

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
          {/* <Options options={options} form={form} field={field} /> */}
        </div>
      </Col>
    )
  }

  return (
    <div style={styles.container}>
      <Title level={3} style={{ marginBottom: '20px' }}>
        Band Number {bandNumber + 1} / Bird {index + 1}
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
            <BandType form={form} styles={styles}/>
            <BandColor form={form} styles={styles} />
            <EngravingColor form={form} styles={styles} />
            <SpecialFeature form={form} styles={styles} />
            <BandLeg form={form} styles={styles} />
            <WearScore form={form} styles={styles} />
            <BandRead form={form} styles={styles} />
            <BandConfidence form={form} styles={styles} />

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