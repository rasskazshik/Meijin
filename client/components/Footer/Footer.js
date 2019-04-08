import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Footer extends Component{
    constructor (props){
        super(props);

    }

    render(){
        return(
            <div className='footer'>
                <p className="text-center"><a href='mailto:rasskazshik@gmail.com?subject=Обратная связь с проектом Meijin'>Написать письмо разработчику</a></p>
                <p className="text-center"><Link to='/admin'>Администрирование сайта</Link></p>
            </div>
        );
    }
}