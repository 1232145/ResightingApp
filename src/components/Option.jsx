import React from 'react';
import { Button } from 'antd';

const styles = {
    button: {
        width: '100%',
        height: '50px',
        fontSize: '16px',
        backgroundColor: '#EFEFEF',
    },

    selectedButton: {
        backgroundColor: 'green',
        color: 'white',
    },
}

function Option({ form, field, item }) {

    return (
        <Button
            style={styles.button}
            onClick={() => form.setFieldValue(field, item)}
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
