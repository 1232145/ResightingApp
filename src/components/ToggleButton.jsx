import React, { useState } from 'react';
import { Switch } from 'antd';

const ToggleButton = ({label, toggle, setToggle, styles}) => {

  const handleChange = (checked) => {
    setToggle(checked);
  };

  return (
    <div style={styles}>
      <span style={{ margin: '10px 8px 8px 0px' }}>{label}</span>
      <Switch
        checked={toggle}
        onChange={handleChange}
        checkedChildren="On"
        unCheckedChildren="Off"
      />
    </div>
  );
};

export default ToggleButton;
