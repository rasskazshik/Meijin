import React,{Component} from 'react';
import {Route} from 'react-router';
//компонент начальной страницы
import Home from '../Home/Home';
//компонент навигации
import Navigation from '../Navigation/Navigation';
//компонент с адресами и формой обратной связи
import HowFind from '../HowFind/HowFind';
//компонент с отображением документов квалификации
import Certificates from '../Certificates/CertificatesController';
//компонент с отображением списка услуг
import Services from '../Services/ServicesController';
//компонент админки
import AdminGate from '../AdminGate/AdminGateController';
//футер с админкой и почтой разработчика
import Footer from '../Footer/Footer';
//компонент битого маршрута роутера
import Page404 from '../Page404/Page404';

export default class App extends Component
{
    //рендер каркаса страницы с реакт-роутингом
    render(){
        return (
        <div className='container totalContainer'>
            <Navigation/>
            <div className='content'>
                <Route exact path='/' component={Home}/>
                <Route exact path='/howFind' component={HowFind}/>
                <Route exact path='/certificates' component={Certificates}/>
                <Route exact path='/services' component={Services}/>
                <Route exact path='/admin' component={AdminGate}/>
                <Route path="*" component={Page404}/>
            </div>
            <Footer/>
        </div>
        );
    }
}