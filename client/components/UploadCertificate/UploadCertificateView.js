import React,{Component} from 'react';

export default class UploadCertificateView extends Component{
    constructor(props){
        super(props);

        this.SubmitFormCertificate=this.SubmitFormCertificate.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
        this.FormEnable=this.FormEnable.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
    }

    //поднятие данных в контроллер
    SubmitFormCertificate(event){
        event.preventDefault();
        let file = document.getElementById('certificateImage').files[0];
        let textarea=document.getElementById('certificateDescription');
        let certificateDescription = textarea.value;
        //для обработки данных синтетического события во вложенной функци - выковыриваем их (данные)
        let eventForm = event.target;
        //указатель на компонент для вложенного метода
        let componentPointer = this;
        //не недооценивай мощь юзверей
        //проверяем что юзверь вопреки предлагаемому фильтру не загрузил файл не изображения
        //чекаем все mime типы для .jpeg, .jpg, .png, .gif 
        switch(file.type){
            case 'image/jpeg':
                break;
            case 'image/x-citrix-jpeg':
                break;
            case 'image/png':
                break;
            case 'image/x-citrix-png':
                break;
            case 'image/x-png':
                break;
            case 'image/gif':
                break;
            default:
                document.getElementById('certificateImage').setCustomValidity('Вопреки предложенному фильтру вы выбрали для загрузки не корректный тип файла...');
                break;
        }
        //заплатка required для огнелиса-параноика (required textarea сразу срабатывает при загрузке страницы)
        if(textarea.value===''){
            textarea.setCustomValidity('Это поле должно быть заполнено');
        }
        //проверяем форму на валидность после проверки типов файлов
        if(event.target.reportValidity()){
            //Блокируем элементы формы на время обработки запроса
            componentPointer.FormDisable(eventForm);
            //передаем в контроллер для загрузки и добавления
            this.props.InsertCertificate(file, certificateDescription,function(error){
                if(error){
                    alert('Во время выполнения операции возникли ошибки. ('+error+')');
                    //разблокировка формы по завершению обработки
                    componentPointer.FormEnable(eventForm);
                }
                else{
                    //сбрасываем форму
                    eventForm.reset();
                    //разблокировка формы по завершению обработки
                    componentPointer.FormEnable(eventForm);
                }
            });
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    //блокировка формы
    FormDisable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", true );
        });
        $(".uploadCertificate h4").html('Обработка запроса...');
    }

    //разблокировка формы
    FormEnable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", false );
        });
        $(".uploadCertificate h4").html('Форма добавления нового документа');
    }

    render(){
        return(
            <div className="container p-2 uploadCertificate">
                <h4 className='text-center'>Форма добавления нового документа</h4>
                <form onSubmit={this.SubmitFormCertificate}>
                    <textarea className="w-100" onChange={this.ClearValidity} id="certificateDescription" name="description"  autoComplete='off' placeholder="Описание загружаемого сертификата"/>
                    <input className="w-100 mb-1" onChange={this.ClearValidity} type="file" accept=".jpg,.jpeg,.png,.bmp,.gif" id="certificateImage" name="certificateImage" required placeholder="Добавить сертификат"/>
                    <input className="w-100" type="submit" value="Добавить документ"/>
                </form>
            </div>
        );
    }
}