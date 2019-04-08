import React,{Component} from 'react';

export default class Feedback extends Component{
    constructor(props){
        super(props);

        this.Submit=this.Submit.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
        this.FormEnable=this.FormEnable.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
    }

    //отправка сообщения на почту
    Submit(event){
        event.preventDefault();
        let componentPointer = this;
        let form = event.target;
        let emailField = document.getElementById("emailFild");
        let messageField = document.getElementById("messageFild");
        //заплатка required для огнелиса-параноика (required textarea сразу срабатывает при загрузке страницы)
        if(messageField.value===''){
            messageField.setCustomValidity('Это поле должно быть заполнено');
        }
        if(event.target.reportValidity()){
            componentPointer.FormDisable(form);
            let message='От кого: '+emailField.value+'; Сообщение: '+messageField.value;
            Meteor.call('SendEmail',message,function(error){
                if(error){
                    alert('Во время выполнения операции возникли ошибки. ('+error+')');
                    componentPointer.FormEnable(form);
                }
                else{
                    alert('Сообщение было успешно отправлено');
                    componentPointer.FormEnable(form);
                    form.reset();
                }
            })
        }
    }

    FormDisable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", true );
        });
        $(".feedbackForm h6").html('Сообщение отправляется...');
    }

    FormEnable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", false );
        });
        $(".feedbackForm h6").html('Напишите мне, и я отвечу вам');
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    render(){
        return(
            <form className='feedbackForm mt-2' onSubmit={this.Submit}>
                <h6 className='text-center'>Напишите мне, и я отвечу вам</h6>
                <input id="emailFild" className='w-100 mb-1' type="email" autoComplete="off" required placeholder="Ваша электронная почта"/>
                <textarea id="messageFild" onChange={this.ClearValidity} className='w-100' autoComplete="off" placeholder="Текст сообщения"></textarea>
                <input className='w-100' type="submit" value="Отправить сообщение"/>
            </form>
        );
    }
}