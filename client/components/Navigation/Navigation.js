import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends Component{

    render(){

        return(
            <div>
                <button className="navigationButton dropdown-toggle w-100 d-md-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Навигация
                </button>
                <nav className='navigation-drop row dropdown-menu' aria-labelledby="dropdownMenuButton">
                    <Link className='dropdown-item' to='/'>Главная</Link>
                    <Link className='dropdown-item' to='/certificates'>Квалификация</Link>
                    <Link className='dropdown-item' to='/services'>Виды услуг</Link>
                    <Link className='dropdown-item' to='/howFind'>Как найти</Link>
                </nav>
                <nav className='navigation row d-none d-md-flex' >
                    <Link className='col-md text-center' to='/'>Главная</Link>
                    <Link className='col-md text-center' to='/certificates'>Квалификация</Link>
                    <Link className='col-md text-center' to='/services'>Виды услуг</Link>
                    <Link className='col-md text-center' to='/howFind'>Как найти</Link>
                </nav>
            </div>
        );
    }
}