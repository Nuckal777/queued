import React from 'react';
import styles from './App.module.css';
import Overview from "./views/Overview";
import Header from './layout/Header';
import Booking from "./views/Booking";
import Content from "./layout/Content";
import logo from './images/logo_queued_v2.png';

console.log(logo); //

const getContent = (route) => {
    switch (route) {
        default:
        case 'overview':
            return <Overview data={[{purchaseID: '1337', startDate: 1584808113000}, {purchaseID: '26781', startDate: 1585894113000}, {purchaseID: '29365', startDate: 15848136113000}]} />
        case 'booking':
            return <Booking />
    }
}

function App() {
    const [activeRoute, setRoute] = React.useState('booking')

    return (
    <div className={styles.container}>
        <img src={logo} alt="Logo" className={styles.header} />
        <Header onClick={setRoute} activeRoute={activeRoute} />
        <Content>
            {
                getContent(activeRoute)
            }
        </Content>
    </div>
  );
}

export default App;
