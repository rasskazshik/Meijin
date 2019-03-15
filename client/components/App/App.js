import React,{Component} from 'react';
import {Route} from 'react-router';

import Home from '../Home/Home';
import Navigation from '../Navigation/Navigation';
import HowFind from '../HowFind/HowFind';
import Certificates from '../Certificates/CertificatesController';

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
            </div>
        </div>
        );
    }
}