import App from './App';
import React, { Component } from 'react';
import _random from 'lodash/random';
import UserContext from "./context/UserContext";

class AppBootstrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bootstrapped: false,
            uuid: undefined
        }
    }

    componentDidMount() {
        let uuid = localStorage.getItem('uuid');
        if (!uuid) {
            uuid = _random(1000, 9999);
            localStorage.setItem('uuid', uuid)
        }
        this.setState({ uuid, bootstrapped: true });
    }

    render() {
        const { bootstrapped, uuid } = this.state;
        if (!bootstrapped) {
            return <div>Bootstrapping App...</div>;
        }
        return (
            <UserContext.Provider value={uuid}>
                <App />
            </UserContext.Provider>
        );
    }
}


export default AppBootstrapper;
