import React,{Component} from 'react';
import Header from '../Header/Header';

export default class CreateUser extends Component{
    constructor(props){
        super(props);
        this.SubmitCreateUser=this.SubmitCreateUser.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
    }

    SubmitCreateUser(event){
        event.preventDefault();
        let email = $(".email-tb").val();
        let password = $(".password-tb").val();
        let repeat = $(".password-repeat-tb").val();
        let componentPointer = this;
        if(password===repeat){
            Accounts.createUser({username:"Admin",password:password,email:email},function(err){
                if(err){
                    console.log('Ошибка создания учетной записи администратора: '+err);
                    alert('Свяжитесь с разработчиком. Ошибка создания учетной записи администратора: '+err);
                }
                else{
                    console.log('Учетная запись создана');
                    componentPointer.props.UpdateAuthUserData();
                }
            });
        }
        else{
            document.querySelector(".password-repeat-tb").setCustomValidity('Повтор пароля не совпадает');
            event.target.reportValidity();
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    render(){
        return(
            <div>
                <Header title='Создание новой учетной записи администратора'/>
                <form className='container createUserForm' onSubmit={this.SubmitCreateUser}>
                    <input type='email' onChange={this.ClearValidity} className='email-tb w-100' required autoComplete='off' placeholder='Электронная почта'/>
                    <input type='password' onChange={this.ClearValidity} className='password-tb w-100' required autoComplete='off' placeholder='Пароль'/>
                    <input type='password' onChange={this.ClearValidity} className='password-repeat-tb w-100' required autoComplete='off' placeholder='Повторите пароль'/>
                    <input type='submit' className='w-100' value="Зарегистрировать администратора"/>
                </form>
            </div>
        );
    }
}