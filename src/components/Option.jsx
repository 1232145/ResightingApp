import React, { useState } from 'react';
import { Button, Dropdown, Menu, Input } from 'antd';

const { Search } = Input;
const limit = 5;

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
    const [searchValue, setSearchValue] = useState('');

    const handleItemClick = (item) => {
        setData(item);
        setSearchValue('');
    };

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const filteredOptions = options.filter((item) =>
        item.toString().toLowerCase().includes(searchValue.toLowerCase())
    );

    const renderOptions = () => {
        if (filteredOptions.length <= limit) {
            return filteredOptions.map((item) => (
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
                    {filteredOptions.slice(limit).map((item) => (
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
                    {filteredOptions.slice(0, limit).map((item) => (
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
            {
                options.length > limit && (
                    <Search
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                )
            }
            {renderOptions()}
        </>
    );
}

export { Options };
