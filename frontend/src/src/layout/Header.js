import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './Header.module.css';
import UserContext from "../context/UserContext";

const Header = ({ activeRoute, onClick }) => {
    return (
        <div className={styles.header}>
            <div className={styles.buttons}>
                <Button variant="queued" className={styles.button} active={activeRoute === 'booking'} onClick={() => { onClick('booking'); }}>Buche einen Termin</Button>
                <Button variant="queued" className={styles.button} active={activeRoute === 'overview'} onClick={() => { onClick('overview'); }}>Übersicht deiner Termine</Button>
            </div>
            <div className={styles.user}>
                <UserContext.Consumer>
                    { (uuid) => <div>User: {uuid}</div> }
                </UserContext.Consumer>
            </div>
        </div>
    );
}

Header.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Header;

