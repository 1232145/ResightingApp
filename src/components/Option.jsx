import React from 'react';
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

function Options({ options, selected, setData }) {
    return (
        <>
            {
                options.map((item, index) =>
                    <Button
                        style={{
                            ...styles.button,
                            ...(selected === item && styles.highlight),
                        }}
                        onClick={() => setData(item)}
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
