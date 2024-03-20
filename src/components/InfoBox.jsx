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

const generateLabelInfo = (label, info, styles) => {
    return (
        <div style={styles?.label}>
            <label style={styles?.text}>{label}</label>
            <InfoBox info={info} />
        </div>
    )
}

export {InfoBox, generateLabelInfo}