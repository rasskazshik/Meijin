import React,{Component} from 'react';
import Header from '../Header/Header';

export default class Authorization extends Component{
    constructor(props){
        super(props);

        this.SubmitAuthorization = this.SubmitAuthorization.bind(this);
        this.Login=this.Login.bind(this);
    }

    Login(email,password){
        let componentPointer = this;
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
                componentPointer.props.UpdateAuthUserData();
            }
        });        
    }

    SubmitAuthorization(event){
        event.preventDefault();
        let email = $(".email-tb").val();
        let password = $(".password-tb").val();
        this.Login(email,password);
    }

    render(){
        return(
            <div>
                <Header title='Авторизация пользователя'/>
                <form className='container authorizationForm' onSubmit={this.SubmitAuthorization}>
                    <input type='email' className='email-tb w-100' required placeholder='Электронная почта'/>
                    <input type='text' className='password-tb w-100' required placeholder='Пароль'/>
                    <input type='submit' className='w-100' value="Авторизация"/>
                </form>
            </div>
        );
    }
}