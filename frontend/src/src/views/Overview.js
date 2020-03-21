import React from 'react';
import styles from './Overview.module.css';
import PropTypes from 'prop-types';

const Overview = (props) => {

    const { data } = props;

    return (
        <div className={styles.wrapper}>
            {
                data.map((entry) => <div>{entry.id}</div>)
            }
        </div>
    );
}


Overview.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
       id: PropTypes.string.isRequired
    }))
};

export default Overview;


