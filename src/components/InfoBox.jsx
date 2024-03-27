import React from 'react';
import { Popover, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const InfoBox = ({ info }) => {
  const content = (
    <div>
      <p>{info}</p>
    </div>
  );

  return (
    <Popover content={content} title="Option Details">
      <Button type="text" icon={<InfoCircleOutlined />} />
    </Popover>
  );
};

const LabelInfo = ({ label, info, required, styles }) => {
  return (
    <div style={styles?.label}>
      <label style={styles?.text}>
        {label}
        {
          required &&
          <span style={{ color: 'red', marginLeft: 5 }}>
            *
          </span>
        }
      </label>
      <InfoBox info={info} />
    </div>
  )
}

export { InfoBox, LabelInfo }