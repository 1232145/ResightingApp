import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const styles = {
    button: {
        width: '100%',
        height: '50px',
        fontSize: '16px',
        backgroundColor: '#EFEFEF',
    },

    highlight: {
        backgroundColor: 'green',
        color: 'white',
        border: '1px solid black'
    }
}

function Options({ options, selected, setData }) {
    const limit = 6;

    const handleItemClick = (item) => {
        setData(item);
    };

    const renderOptions = () => {
        if (options.length <= limit) {
            return options.map((item) => (
                <Button
                    key={item}
                    style={{
                        ...styles.button,
                        ...(selected === item && styles.highlight),
                    }}
                    onClick={() => handleItemClick(item)}
                >
                    {item}
                </Button>
            ));
        } else {
            const menu = (
                <Menu>
                    {options.slice(limit).map((item) => (
                        <Menu.Item
                            style={{
                                ...(selected === item && styles.highlight),
                            }}
                            key={item}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </Menu.Item>
                    ))}
                </Menu>
            );

            return (
                <>
                    {options.slice(0, limit).map((item) => (
                        <Button
                            key={item}
                            style={{
                                ...styles.button,
                                ...(selected === item && styles.highlight),
                            }}
                            onClick={() => handleItemClick(item)}
                        >
                            {item}
                        </Button>
                    ))}
                    <Dropdown
                        overlay={menu}
                        placement="bottomLeft"
                        trigger={['click']}
                    >
                        <Button style={{ ...styles.button }}>More Options</Button>
                    </Dropdown>
                </>
            );
        }
    };

    return (
        <>
            {renderOptions()}
        </>
    );
}

export { Options };
