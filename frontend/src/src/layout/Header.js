import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './Header.module.css';

const Header = ({ activeRoute, onClick }) => {
    return (
        <div className={styles.header}>
            <Button className={styles.button} active={activeRoute === 'booking'} onClick={() => { onClick('booking'); }}>Buche einen Termin</Button>
            <Button className={styles.button} active={activeRoute === 'overview'} onClick={() => { onClick('overview'); }}>Übersicht deiner Termine</Button>
        </div>
    );
}

Header.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Header;

