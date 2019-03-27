import React,{Component} from 'react';
import Header from '../Header/Header';
import ServiceSlider from '../ServiceSlider/ServiceSliderController';
import UploadService from '../UploadService/UploadServiceController';

export default class AdminServicesView extends Component{
    constructor(props){
        super(props);

        this.DeleteService=this.DeleteService.bind(this);
        this.UpdateService=this.UpdateService.bind(this);
    }

    componentDidMount(){
        //делигированная обработка клика по элементу списка услуг (анимированное открытие и закрытие)
        $(".servicesContainer").on("click",".servicesItem",function(event){
            let serviceId = $(event.target).attr("serviceid");
            $("div[serviceid='"+serviceId+"']").slideToggle();
        });
    }

    DeleteService(event){
        if(confirm('Вы уверены в том, что хотите удалить услугу?')){
            let serviceId = $(event.target).attr('serviceid');
            this.props.DeleteService(serviceId);
        }
    }

    //передача данных для обновления в метод контроллера
    UpdateService(event){
        if(confirm('Вы уверены в том, что хотите обновить информацию об услуге?')){
            let serviceId = $(event.target).attr('serviceid');
            let title = $(".servicesItemContainer[serviceid='"+serviceId+"'] .title").val();
            let description = $(".servicesItemContainer[serviceid='"+serviceId+"'] .description").val();
            let price = $(".servicesItemContainer[serviceid='"+serviceId+"'] .price").val();
            let images = document.querySelector(".servicesItemContainer[serviceid='"+serviceId+"'] .file").files;
            this.props.UpdateService(serviceId,title, description, price, images);
        }
    }

    render(){
        let servicesItems;
        if(this.props.services.length<1){
            servicesItems=(<div className="text-center">Список пуст</div>);
        }
        else{
            servicesItems=this.props.services.map((item)=>
                <div key={item._id}>
                    <h4 className='servicesItem' serviceid={item._id}>{item.title}</h4>                    
                    <div className='servicesItemContainer' serviceid={item._id}>
                        <input type='button' className='w-100' serviceid={item._id} onClick={this.DeleteService} value='Удалить услугу'/>
                        <input type='button' className='w-100' serviceid={item._id} onClick={this.UpdateService} value='Обновить текст и изображение'/>  
                        <p>
                            Наименование: 
                            <input type='text' className='w-100 title' defaultValue={item.title}/>
                        </p>                       
                        <p>
                            Описание: 
                            <textarea className='w-100 description' defaultValue={item.description}/>
                        </p>
                        <p>
                            Ориентировочная стоимость: 
                            <input type='text' className='w-100 price' defaultValue={item.price}/>
                        </p>
                        <p>
                            Изображение (если не выбрать - останется неизменным): 
                            <input type='file' className='w-100 file'/>
                        </p>
                        <ServiceSlider serviceId={item._id}/>
                    </div>                    
                </div>
            );
        }

        return(
            <div>
                <Header title='Виды оказываемых услуг' text='Ниже приведен список оказываемых услуг и их примерные цены.'/>
                <UploadService/>
                <div className='servicesContainer'>
                    {servicesItems}
                </div>
            </div>
        );
    }
}
