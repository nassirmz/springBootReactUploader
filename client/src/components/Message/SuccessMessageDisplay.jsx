import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import { resetUploadData } from '../../actions/uploadAction';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string,
};

class SuccessMessageDisplay extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.name) {
            this.setState({ show: true });
        }
    }

    handleClose = () => {
        this.props.dispatch(resetUploadData());
        this.setState({show: false });
    }

    displayMessage = () => {
        const { name } = this.props;
        return (
            <div>file {name} uploaded successfully.</div>
        );
    }

    render() {
        return (
            <div>
                <Modal
                       show={this.state.show}
                       onHide={this.handleClose}
                >
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        {this.displayMessage()}
                        <Button onClick={this.handleClose}>OK</Button>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.upload.name,
    }
}

SuccessMessageDisplay.propTypes = propTypes;

export default connect(mapStateToProps)(SuccessMessageDisplay);