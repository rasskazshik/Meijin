import React,{Component} from 'react';
import Header from '../Header/Header';

export default class AdminUserDataView extends Component{
    constructor(props){
        super(props);

        this.SubmitUpdateUserData=this.SubmitUpdateUserData.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
    }

    //пересылка данных в контроллер для изменения учетных данных
    SubmitUpdateUserData(event){
        event.preventDefault();
        let email = $('.updateUserDataForm .email').val();
        let oldPassword = $('.updateUserDataForm .oldPassword').val();
        let newPassword = $('.updateUserDataForm .newPassword').val();
        let repeatPassword = $('.updateUserDataForm .repeatPassword').val();
        //если повтор пароля верен
        if(newPassword===repeatPassword){
            this.props.UpdateUserData(email,oldPassword,newPassword,function(err,responce){
                if(err){
                    alert("Во время выполнения операции возникла ошибка, свяжитесь с разработчиком. (Ошибка: "+err+")");
                }
                else{
                    if(responce.fail){
                        alert("Операция не была завершена успешно. ("+responce.fail+")");
                    }
                    else{
                        alert("Данные успешно изменены")
                    }
                }
            });
        }
        else{
            //сообщаем об ошибке (не забудь снять флаг ошибки при вводе)
            let invalidInput = document.querySelector('.updateUserDataForm .repeatPassword');
            invalidInput.setCustomValidity('Повтор пароля не совпадает');
            event.target.reportValidity();
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.setCustomValidity('');
    }
    render(){
        return(
            <div>
                <Header title="Изменение учетных данных администратора" text="В этом меню можно изменить электронную почту и пароль, необходимые для авторизации"/>
                <form className='container p-2 updateUserDataForm' onSubmit={this.SubmitUpdateUserData}>
                    <input className='w-100 email' type='email' defaultValue={this.props.oldEmail} required autoComplete='off' placeholder='Введите новую электронную почту'/>
                    <input className='w-100 newPassword' type='password' required autoComplete='off' placeholder='Введите новый пароль'/>
                    <input className='w-100 repeatPassword' onChange={this.ClearValidity} type='password' required autoComplete='off' placeholder='Повторите новый пароль'/>
                    <input className='w-100 oldPassword' type='password' required autoComplete='off' placeholder='Введите старый пароль'/>
                    <input className='w-100' type='submit' value='Изменить учетные данные'/>
                </form>
            </div>
        );
    }
}