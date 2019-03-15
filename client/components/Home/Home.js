import React,{Component} from 'react';
import Header from '../Header/Header';
import Feedback from '../Feedback/Feedback';
import Slider from '../Slider/Slider'

export default class Home extends Component{

    render(){
        return(
            <div>
                <Header title='Услуги массажа и реабилитации в городе Курске' text='Профессиональный массаж и восстановительная терапия. Индивидуальный подход и гибкий график работы кабинета.'/>                
                <div className='row contentRow'>
                    <div className='col-md-8 content-left order-2 order-md-1'>                       
                        <h4>Профессиональная помощь при:</h4>
                        <ol>
                            <li>Растяжениях</li>
                            <li>Защемлениях</li>
                            <li>Прочей хрени</li>
                        </ol>
                    </div>
                    <div className='col-md-4 content-right text-center order-1 order-md-2'>
                        <img className='img-thumbnail' src='images/shap.jpg' alt='Шаповал Сергей'/>
                        <p>Шаповал Сергей</p>
                        <p>Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст Текст </p>
                    </div>
                </div>
            </div>
        );
    }
}