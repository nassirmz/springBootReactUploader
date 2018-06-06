import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import FieldInput from './FieldInput';

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const FileInput = ({
                       input: { value: omitValue, onChange, onBlur, ...inputProps },
                       meta: omitMeta,
                       ...props
                   }) => {
    return (
        <input
            onChange={adaptFileEventToValue(onChange)}
            onBlur={adaptFileEventToValue(onBlur)}
            type="file"
            {...props.input}
            {...props}
        />
    );
};

let UploadComponent = (props) => {
    const { handleSubmit } = props;

    return (

        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <FormGroup>
                    <Field name="attachment" component={FileInput} type="file" />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <FormGroup>
                    <Button type="submit">
                        UPLOAD
                    </Button>
                </FormGroup>
            </Modal.Footer>
        </Form>
    );
};



UploadComponent.propTypes = propTypes;

UploadComponent = reduxForm({
    'form': 'uploadcomponent'
})(UploadComponent);


export default UploadComponent;
