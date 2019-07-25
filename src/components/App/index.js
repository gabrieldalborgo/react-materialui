import React from 'react';
import Gnomes from '../Gnomes';
import { Provider } from 'react-redux';
import { CommonsContext } from '../Commons';

import store from '../../store';

const App = () => (
    <Provider store={store}>
        <CommonsContext.Provider>
            <Gnomes />
        </CommonsContext.Provider>
    </Provider>
);

export default App;