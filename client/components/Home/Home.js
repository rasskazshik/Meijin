import React,{Component} from 'react';
import Header from '../Header/Header';
import Feedback from '../Feedback/Feedback';
import Slider from '../Slider/Slider'

export default class Home extends Component{

    render(){
        return(
            <div>
                <Header title='Услуги массажа и реабилитации в городе Курске' text='Профессиональный массаж и восстановительная терапия. Индивидуальный подход и гибкий график работы кабинета.'/>                
                <div className='row contentRow align-items-center'>
                    <div className='col-md-8 content-left order-2 order-md-1'>     
                        <h4>Курирование реабилитации</h4>
                        <p>Планирование и проведение реабилитации после получение травм различной степени тяжести. Восстановление и нормальная жизнь возможна!</p>
                        <h4>Оперативная, профессиональная помощь при:</h4>
                        <ol>
                            <li>Растяжениях</li>
                            <li>Защемлениях</li>
                            <li>Прочей хрени</li>
                        </ol>
                        <h4>Что-либо еще</h4>
                        <p>Много букв, очень много букв! Много букв, очень много букв! Много букв, очень много букв! Много букв, очень много букв! Много букв, очень много букв! </p>
                        <h4>Что-либо еще</h4>
                        <p>Много букв, очень много букв! Много букв, очень много букв! Много букв, очень много букв! </p>
                    </div>
                    <div className='col-md-4 content-right text-center order-1 order-md-2'>
                        <img className='img-thumbnail' src='images/shap.jpg' alt='Шаповал Сергей'/>
                        <p className='name'>Шаповал Сергей</p>
                        <p>Обширный опыт работы, регулярное повышение квалификации, внимание к деталям и пожеланиям, конфиденциальность и профессионализм.</p>
                    </div>
                </div>
            </div>
        );
    }
}