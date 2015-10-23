import React from 'react';
import { render } from 'react-dom';
import createStore from 'store/index';
import { Provider } from 'react-redux'

import TitleBar from 'titlebar';
import ItemList from 'itemlist';

const store = createStore();
render(
    <Provider store={store}>
        <div>
            <TitleBar/>
            <div id='content'>
                <ItemList/>
            </div>
        </div>
    </Provider>,
    document.getElementById('main')
);