import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const propTypes = {
    errorMessage: PropTypes.string,
};

class ErrorDisplay extends Component {
    constructor() {
        super();
        this.state = {
            alertVisible: true,
        };
        this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    }

    handleAlertDismiss() {
        this.setState({ alertVisible: false });
    }

    render() {
        if (this.state.alertVisible && this.props.errorMessage) {
            return (
                <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
                    <p>{this.props.errorMessage}</p>
                </Alert>
            );
        }
        return null;
    }

}

ErrorDisplay.propTypes = propTypes;

export default ErrorDisplay;