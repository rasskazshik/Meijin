import React,{Component} from 'react';
//компонент заглавия
import Header from '../Header/Header';

export default class AdminUserDataView extends Component{
    constructor(props){
        super(props);

        this.SubmitUpdateUserData=this.SubmitUpdateUserData.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
        this.ClearPasswordsFields=this.ClearPasswordsFields.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
        this.FormEnable=this.FormEnable.bind(this);
    }

    //пересылка данных в контроллер для изменения учетных данных
    SubmitUpdateUserData(event){
        event.preventDefault();
        //для доступа в кэллбэке к объекту события нужно заюзать event.presist()
        //но я думаю что лишь для сохранения ссылки на DOM узел это не целесообразно
        //сохраню сам узел
        let eventForm = event.target;
        let componentPointer = this;
        let email = $('.updateUserDataForm .email').val();
        let oldPassword = $('.updateUserDataForm .oldPassword').val();
        let newPassword = $('.updateUserDataForm .newPassword').val();
        let repeatPassword = $('.updateUserDataForm .repeatPassword').val();
        //если повтор пароля верен
        if(newPassword===repeatPassword){
            //отключаем форму на время выполнения запроса
            componentPointer.FormDisable(eventForm);
            this.props.UpdateUserData(email,oldPassword,newPassword,function(userCheckError){
                if(userCheckError){
                    switch(userCheckError.error){
                        case 403:
                            //сообщаем об ошибке
                            let invalidInput = document.querySelector('.updateUserDataForm .oldPassword');
                            invalidInput.setCustomValidity('Старый пароль введен не верно');
                            //включаем форму
                            componentPointer.FormEnable(eventForm);
                            eventForm.reportValidity();
                            break;
                        default:
                            alert("Во время выполнения операции возникли ошибки. ("+userCheckError.message+")");
                            //включаем форму
                            componentPointer.FormEnable(eventForm);
                            break;
                    }                        
                }
                else{
                    alert("Данные успешно изменены");
                    //включаем форму
                    componentPointer.FormEnable(eventForm);
                    //чистим поля
                    componentPointer.ClearPasswordsFields();
                }
            });
        }
        else{
            //сообщаем об ошибке
            let invalidInput = document.querySelector('.updateUserDataForm .repeatPassword');
            invalidInput.setCustomValidity('Повтор пароля не совпадает');
            event.target.reportValidity();
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    //чистим поля ввода паролей после успешного изменения
    ClearPasswordsFields(){
        let email = $('.updateUserDataForm .email').val();
        document.querySelector('.updateUserDataForm').reset();
        $('.updateUserDataForm .email').val(email);
    }
    
    //отключение формы
    FormDisable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", true );
        });
    }

    //включение формы
    FormEnable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", false );
        });
    }

    render(){
        return(
            <div>
                <Header title="Изменение учетных данных администратора" text="В этом меню можно изменить электронную почту и пароль, необходимые для авторизации"/>
                <form className='container p-2 updateUserDataForm' onSubmit={this.SubmitUpdateUserData}>
                    <input className='w-100 email' type='email' onChange={this.ClearValidity} defaultValue={this.props.oldEmail} required autoComplete='off' placeholder='Введите новую электронную почту'/>
                    <input className='w-100 newPassword' onChange={this.ClearValidity} type='password' required autoComplete='off' placeholder='Введите новый пароль'/>
                    <input className='w-100 repeatPassword' onChange={this.ClearValidity} type='password' required autoComplete='off' placeholder='Повторите новый пароль'/>
                    <input className='w-100 oldPassword' onChange={this.ClearValidity} type='password' required autoComplete='off' placeholder='Введите старый пароль'/>
                    <input className='w-100' type='submit' value='Изменить учетные данные'/>
                </form>
            </div>
        );
    }
}