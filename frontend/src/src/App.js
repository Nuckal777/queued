import React from 'react';
import styles from './App.module.css';
import Overview from "./views/Overview";
import Header from './layout/Header';
import Booking from "./views/Booking";
import Content from "./layout/Content";


const getContent = (route) => {
    switch (route) {
        default:
        case 'overview':
            return <Overview data={[{purchaseID: '1337', startDate: 1584804113}, {purchaseID: '26781', startDate: 1585894113}, {purchaseID: '29365', startDate: 15848136113}]} />
        case 'booking':
            return <Booking />
    }
}

function App() {
    const [activeRoute, setRoute] = React.useState('booking')

    return (
    <div className={styles.container}>
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
