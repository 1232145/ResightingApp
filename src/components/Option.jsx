import React, { useState } from 'react';
import { Button } from 'antd';

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

function Options({ options, form, field }) {
    const [selected, setSelected] = useState(-1);

    const handleClick = (field, curItem, index) => {
        form.setFieldValue(field, curItem);
        setSelected(index);
    }

    return (
        <>
            {
                options.map((item, index) =>
                    <Button
                        style={{
                            ...styles.button,
                            ...(selected === index && styles.highlight),
                        }}
                        onClick={() => handleClick(field, item, index)}
                        key={index}
                    >
                        {item}
                    </Button>
                )
            }
        </>
    );
}

export { Options };
