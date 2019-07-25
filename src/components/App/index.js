import React from 'react';
import Gnomes from '../Gnomes';
import { Provider } from 'react-redux';

import store from '../../store';

const App = () => (
    <Provider store={store}>
        <Gnomes></Gnomes>
    </Provider>
);

export default App;