import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Br} from 'react-router-dom'
import { Provider } from 'react-redux';
import  {store}  from './store'
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';


ReactDOM.render(
  <Provider store={store}>
  <Br>
    <App />
  </Br>
  </Provider>,
    document.getElementById('root')
);


