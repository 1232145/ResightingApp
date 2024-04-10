import React from 'react';
import { Popover, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const InfoBox = ({ info, title }) => {
  const content = (
    <div>
      {info}
    </div>
  );

  return (
    <Popover content={content} title={title}>
      <Button type="text" icon={<InfoCircleOutlined />} />
    </Popover>
  );
};

const LabelInfo = ({ title, label, info, required, styles }) => {
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
      <InfoBox info={info} title={title} />
    </div>
  )
}

export { InfoBox, LabelInfo }