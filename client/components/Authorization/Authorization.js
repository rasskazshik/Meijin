import React,{Component} from 'react';
//компонент заглавия
import Header from '../Header/Header';

export default class Authorization extends Component{
    constructor(props){
        super(props);

        this.SubmitAuthorization = this.SubmitAuthorization.bind(this);
    }

    //авторизация пользователя
    SubmitAuthorization(event){
        event.preventDefault();
        let email = $(".email-tb").val();
        let password = $(".password-tb").val();
        //указатель на компонент для доступа из вложенных функций
        let componentPointer = this;
        //авторизация с паролем
        Meteor.loginWithPassword(email,password,function(err){
            if(err){
                console.log('Ошибка авторизации: '+err);
                if(err.error===403){
                    alert('Пользователь с указанными электронной почтой и паролем не найден');
                }
                else{
                    alert('Свяжитесь с разработчиком. Ошибка авторизации: '+err);
                }
            }
            else{
                //обновляем статус пользователя в родительском компоненте
                componentPointer.props.UpdateAuthUserData();
            }
        });  
    }

    render(){
        return(
            <div>
                <Header title='Авторизация администратора'/>
                <form className='container authorizationForm' onSubmit={this.SubmitAuthorization}>
                    <input type='email' className='email-tb w-100' required placeholder='Электронная почта'/>
                    <input type='password' className='password-tb w-100' required placeholder='Пароль'/>
                    <input type='submit' className='w-100' value="Авторизация"/>
                </form>
            </div>
        );
    }
}