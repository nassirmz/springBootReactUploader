import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Button, Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

import FieldInput from './FieldInput';
import ErrorDisplay from "../Message/ErrorDisplay";

const propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

let UploadComponent = (props) => {
    const { handleSubmit, errorMessage } = props;

    return (

        <Form onSubmit={handleSubmit}>
            <Modal.Body>
                <FormGroup>
                    <Field name="attachment" component={FieldInput} type="file" />
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <FormGroup>
                    <ErrorDisplay errorMessage={errorMessage}/>
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
