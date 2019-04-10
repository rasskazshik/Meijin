import React from 'react';
import ReactDOM from 'react-dom';
//компонент реакт-роутинга
import {BrowserRouter} from 'react-router-dom'
//базовый компонент приложения
import App from './components/App/App'

//берем корневой контейнер 
const root = document.getElementById('root');

//рендерим в корневой контейнер
ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
,root);