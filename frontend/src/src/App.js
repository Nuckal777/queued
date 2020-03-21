import React from 'react';
import styles from './App.modules.css';
import Overview from "./views/Overview";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './layout/Header';
import Booking from "./views/Booking";
import Content from "./layout/Content";


const getContent = (route) => {
    switch (route) {
        default:
        case 'overview':
            return <Overview data={[{id: '1234', name: 'test'}, {id: '1234', name: 'test'}]} />
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
