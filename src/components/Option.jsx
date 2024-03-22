import React from 'react';
import { Button } from 'antd';

const styles = {
    button: {
        width: '100%',
        height: '50px',
        fontSize: '16px',
        backgroundColor: '#EFEFEF',
    },
}

function Option({ form, field, item }) {
    const handleClick = (field, curItem) => {
        form.setFieldValue(field, curItem);
    }

    return (
        <Button
            style={styles.button}
            onClick={() => handleClick(field, item)}
        >
            {item}
        </Button>
    );
}

function generateOptions(options, form, field) {
    return (
        <>
            {
                options.map((item, index) => <Option key={index} form={form} field={field} item={item} />)
            }
        </>
    )
}

export { Option, generateOptions };
