import React from 'react';
import People from '../People';
import { Provider } from 'react-redux';
import { CommonsContext } from '../Commons';

import store from '../../store';

const App = () => (
    <Provider store={store}>
        <CommonsContext.Provider>
            <People />
        </CommonsContext.Provider>
    </Provider>
);

export default App;