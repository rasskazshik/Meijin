import React,{Component} from 'react';

export default class Feedback extends Component{
    constructor(props){
        super(props);

        this.Submit=this.Submit.bind(this);
    }

    Submit(event){
        event.preventDefault();
        let emailFild = document.getElementById("emailFild");
        let messageFild = document.getElementById("messageFild");
        if(emailFild.value.search(/^.+@.+\..+$/)===-1){
            emailFild.setCustomValidity("Поле электронной почты должно быть заполнено в соответствии с шаблоном: XXX@XXX.XXX");    
            event.target.reportValidity();
            return;
        }
        if(messageFild.value.search(/^.+$/)===-1){
            messageFild.setCustomValidity("Поле сообщения полжно быть заполнено");    
            event.target.reportValidity();
            return;
        }

    }

    render(){
        return(
            <form className='feedbackForm'>
                <h6 className='text-center'>Форма обратной связи</h6>
                <input id="emailFild" className='w-100 mb-1' type="email" autoComplete="off" placeholder="Ваша электронная почта"/>
                <textarea id="messageFild" className='w-100' autoComplete="off" placeholder="Текст сообщения"></textarea>
                <input className='w-100' type="submit" onClick={this.Submit} value="Отправить сообщение"/>
            </form>
        );
    }
}