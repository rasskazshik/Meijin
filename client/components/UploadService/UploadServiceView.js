import React,{Component} from 'react';

export default class UploadServiceView extends Component{
    constructor(props){
        super(props);

        this.SubmitFormService=this.SubmitFormService.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
        this.FormEnable=this.FormEnable.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
    }

    //поднятие данных в контроллер
    SubmitFormService(event){
        event.preventDefault();
        let title = document.getElementById("title").value;
        let textarea = document.getElementById("description");
        let description = textarea.value;
        let price = document.getElementById("price").value;
        let files = document.getElementById("images").files;
        //для обработки данных синтетического события выковыриваем их
        let eventForm = event.target;
        //указатель на компонент для вложенных функций
        let componentPointer = this;
        //заплатка required для огнелиса-параноика (required textarea сразу срабатывает при загрузке страницы)
        if(textarea.value===''){
            textarea.setCustomValidity('Это поле должно быть заполнено');
        }
        //не недооценивай мощь юзверей
        //проверяем что юзверь вопреки предлагаемому фильтру не загрузил файл не изображения
        Array.from(files).forEach(function(file){
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
                    document.getElementById("images").setCustomValidity('Вопреки предложенному фильтру вы выбрали для загрузки не корректный тип файла...');
                    break;
            }
        })
        //проверяем форму на валидность после проверки типов файлов
        if(event.target.reportValidity()){
            //блокируем компонент на период обработки запроса
            componentPointer.FormDisable(eventForm);
            //передаем в контроллер для загрузки и добавления
            this.props.InsertService(title, description, price, files,function(error){
                if(error){
                    alert('Во время выполнения операции возникли ошибки. ('+error+')');
                    //разблокировка формы на период обработки запроса
                    componentPointer.FormEnable(eventForm);
                }
                else{
                    //сбрасываем форму
                    eventForm.reset();
                    //разблокировка формы на период обработки запроса
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
        $(".uploadService h4").html('Обработка запроса...');
    }

    //разблокировка формы
    FormEnable(form){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", false );
        });
        $(".uploadService h4").html('Форма добавления новой услуги');
    }

    render(){
        return(
            <div className="container p-2 uploadService">
                <h4 className='text-center'>Форма добавления новой услуги</h4>
                <form onSubmit={this.SubmitFormService}>
                    <input className="w-100" type="text" onChange={this.ClearValidity} id='title' autoComplete='off' name="title" required placeholder="Наименование услуги"/>
                    <input className="w-100" type="text" onChange={this.ClearValidity} id='price' autoComplete='off' name="price" required placeholder="Текст примерной стоимости услуги"/>
                    <textarea className="w-100" id="description" onChange={this.ClearValidity} name="description"  autoComplete='off' placeholder="Описание добавляемой услуги"/>
                    <input className="w-100 mb-1" type="file" onChange={this.ClearValidity} accept=".jpg,.jpeg,.png,.bmp,.gif" id="images" name="images" multiple/>
                    <input className="w-100 mb-1" type="submit" value="Добавить услугу"/>
                </form>
            </div>
        );
    }
}