import React,{Component} from 'react';
//компонент заголовка
import Header from '../Header/Header';
//компонент слайдера с изображениями услуги
import ServiceSlider from '../ServiceSlider/ServiceSliderController';
//компонент добавления услуги
import UploadService from '../UploadService/UploadServiceController';

export default class AdminServicesView extends Component{
    constructor(props){
        super(props);

        this.DeleteService=this.DeleteService.bind(this);
        this.UpdateService=this.UpdateService.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
        this.ServiceUp=this.ServiceUp.bind(this);
        this.ServiceDown=this.ServiceDown.bind(this);        
        this.FormEnable=this.FormEnable.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
        this.ClearFileUpdate=this.ClearFileUpdate.bind(this);
    }

    componentDidMount(){
        //делигированная обработка клика по элементу списка услуг (анимированное открытие и закрытие)
        $(".servicesContainer").on("click",".servicesItem",function(event){
            let serviceId = $(event.target).attr("serviceid");
            $("div[serviceid='"+serviceId+"']").slideToggle();
        });
    }

    //удаление услуги
    DeleteService(event){
        if(confirm('Вы уверены в том, что хотите удалить услугу?')){
            let serviceId = $(event.target).attr('serviceid');
            this.props.DeleteService(serviceId);
        }
    }

    //передача данных для обновления в метод контроллера
    UpdateService(event){
        event.preventDefault();
        //получаем идентификатор
        let serviceId = $(event.target).attr('serviceid');
        //указатель на компонент для доступа из вложенных функций
        let componentPointer = this;
        //данные синтетического события для доступа из вложенных функций (форма)
        let targetForm = event.target;
        let title = $(".updateServiceForm[serviceid='"+serviceId+"'] .title").val();
        let description = $(".updateServiceForm[serviceid='"+serviceId+"'] .description").val();
        let price = $(".updateServiceForm[serviceid='"+serviceId+"'] .price").val();
        let images = document.querySelector(".updateServiceForm[serviceid='"+serviceId+"'] .file").files;
        //не недооценивай мощь юзверей
        //проверяем что юзверь вопреки предлагаемому фильтру не загрузил файл не изображения
        Array.from(images).forEach(function(file){
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
                    document.querySelector(".updateServiceForm[serviceid='"+serviceId+"'] .file").setCustomValidity('Вопреки предложенному фильтру вы выбрали для загрузки не корректный тип файла...');
                    break;
            }
        })
        //проверяем форму на валидность после проверки типов файлов
        if(event.target.reportValidity()){
            if(confirm('Вы уверены в том, что хотите обновить информацию об услуге?')){
                //блокируем объект на время выполнения запроса
                componentPointer.FormDisable(targetForm,serviceId);
                this.props.UpdateService(serviceId,title, description, price, images,function(error){
                    if(error){
                        alert('Во время выполнения операции возникли ошибки. ('+error+')');
                        //разблокировка объекта по завершению обработки запроса
                        componentPointer.FormEnable(targetForm,serviceId);
                    }
                    else{
                        //разблокировка объекта по завершению обработки запроса
                        componentPointer.FormEnable(targetForm,serviceId);
                        componentPointer.ClearFileUpdate(serviceId);
                    }
                });
            }
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    //передача данных в контроллер для поднятия в списке
    ServiceUp(){
        let serviceId = $(event.target).attr("serviceid");
        this.props.ServiceUp(serviceId,function(error){
            if(error){
                alert('Во время выполнения операции возникли ошибки. ('+error+')');
            }
        });
    }

    //передача данных в контроллер для поднятия в списке
    ServiceDown(){
        let serviceId = $(event.target).attr("serviceid");
        this.props.ServiceDown(serviceId,function(error){
            if(error){
                alert('Во время выполнения операции возникли ошибки. ('+error+')');
            }
        });
    }

    //блокировка формы
    FormDisable(form, serviceId){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", true );
        });
        $("form[serviceid='"+serviceId+"'] h4").html('Идет обработка запроса');
    }

    //разблокировка формы
    FormEnable(form, serviceId){
        Array.from(form).forEach(function(input){
            $(input).prop( "disabled", false );
        });
        $("form[serviceid='"+serviceId+"'] h4").html('');
    }

    //чистим инпут файл
    ClearFileUpdate(serviceId){
        $("form[serviceid='"+serviceId+"'] .file").val('');
    }

    render(){
        //формируем список услуг
        let servicesItems;
        if(this.props.services.length<1){
            servicesItems=(<div className="text-center">Список пуст</div>);
        }
        else{
            servicesItems=this.props.services.map((item)=>
                <div className='servicesItemContainer' key={item._id}>                    
                    <form className='updateServiceForm' serviceid={item._id} onSubmit={this.UpdateService}>
                        <h4 className='w-100 text-center'></h4>
                        <h4 className='servicesItem' serviceid={item._id}>{item.title}</h4>                    
                        <div serviceid={item._id}>
                            <p>
                                Наименование: 
                                <input type='text' className='w-100 title' defaultValue={item.title} required autoComplete='off'/>
                            </p>                       
                            <p>
                                Описание: 
                                <textarea className='w-100 description' defaultValue={item.description} required autoComplete='off'/>
                            </p>
                            <p>
                                Ориентировочная стоимость: 
                                <input type='text' className='w-100 price' defaultValue={item.price} required autoComplete='off'/>
                            </p>
                            <p>
                                Изображение (если не выбрать - останется неизменным): 
                                <input type='file' multiple onChange={this.ClearValidity} accept=".jpg,.jpeg,.png,.bmp,.gif" className='w-100 file'/>
                            </p>
                            <ServiceSlider serviceId={item._id}/>
                            <input type='button' className='w-100' serviceid={item._id} onClick={this.DeleteService} value='Удалить услугу'/>
                            <input type='submit' className='w-100' serviceid={item._id} value='Обновить текст и изображение'/>
                            <div className='row w-100 positionButtonRow'>
                                <div className='col-md'>
                                    <input type='button' className='w-100' serviceid={item._id} onClick={this.ServiceUp} value='Поднять в списке'/>
                                </div>
                                <div className='col-md'>
                                    <input type='button' className='w-100' serviceid={item._id} onClick={this.ServiceDown} value='Опустить в списке'/>
                                </div>
                            </div>  
                        </div>      
                    </form>              
                </div>
            );
        }

        return(
            <div>
                <Header title='Администрирование оказываемых услуг' text='В этом меню можно добавить, удалить и изменить оказываемые услуги и информацию о них'/>
                <UploadService/>
                <div className='servicesContainer'>
                    {servicesItems}
                </div>
            </div>
        );
    }
}
