import React,{Component} from 'react';
import {Route} from 'react-router';

import Home from '../Home/Home';
import Navigation from '../Navigation/Navigation';
import HowFind from '../HowFind/HowFind';
import Certificates from '../Certificates/CertificatesController';
import Services from '../Services/Services';
import AdminGate from '../AdminGate/AdminGateController';
import Footer from '../Footer/Footer';

export default class App extends Component
{
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
            </div>
            <Footer/>
        </div>
        );
    }
}