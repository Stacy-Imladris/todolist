import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {App} from './app';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {HashRouter} from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)

reportWebVitals()