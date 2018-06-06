import React, { Component } from 'react';
import Header from '../Header/index';
import SuccessMessage from "../Message/SuccessMessageDisplay";

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <SuccessMessage/>
            </div>
        );
    }
}

export default App;