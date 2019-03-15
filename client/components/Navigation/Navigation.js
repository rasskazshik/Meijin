import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends Component{

    render(){

        return(
            <nav className='navigation row'>
                <Link className='col-md text-center' to='/'>Главная</Link>
                <Link className='col-md text-center' to='/certificates'>Квалификация</Link>
                <Link className='col-md text-center' to='/'>Виды услуг</Link>
                <Link className='col-md text-center' to='/howFind'>Как найти</Link>
            </nav>
        );
    }
}