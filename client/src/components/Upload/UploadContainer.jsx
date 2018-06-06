import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import UploadComponent from './UploadComponent';

import { startUpload } from '../../actions/uploadAction';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string
};

class UploadContainer extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    handleSubmit = (data) => {
        console.log(data, 'handleSubmit data');
        let formData = new FormData()
        formData.append('file', data.attachment);
        this.props.dispatch(startUpload(formData));
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.errorMessage && nextProps.name) {
            this.setState({show: false });
        }
    }

    handleClose = () => {
        this.setState({show: false });
    }

    render() {
        const { errorMessage } = this.props;
        return (
            <div>
                <Button
                    onClick={() => this.setState({show: true})}
                >
                    UPLOAD
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Upload File
                        </Modal.Title>
                    </Modal.Header>
                    <UploadComponent onSubmit={this.handleSubmit} errorMessage={errorMessage}/>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.error.errorMessage,
        name: state.upload.name
    }
}

UploadContainer.propTypes = propTypes;

export default connect(mapStateToProps)(UploadContainer);