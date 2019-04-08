import React,{Component} from 'react';

export default class UploadCertificateView extends Component{
    constructor(props){
        super(props);

        this.SubmitFormCertificate=this.SubmitFormCertificate.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
    }

    //поднятие данных в контроллер
    SubmitFormCertificate(event){
        event.preventDefault();
        let file = document.getElementById('certificateImage').files[0];
        let textarea=document.getElementById('certificateDescription');
        let certificateDescription = textarea.value;
        //для обработки данных синтетического события выковыриваем их
        let eventForm = event.target;
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
            //передаем в контроллер для загрузки и добавления
            this.props.InsertCertificate(file, certificateDescription,function(error){
                if(error){
                    alert('Во время выполнения операции возникли ошибки. ('+error+')');
                }
                else{
                    //сбрасываем форму
                    eventForm.reset();
                }
            });
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
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