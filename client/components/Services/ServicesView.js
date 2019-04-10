import React,{Component} from 'react';
//компонент заглавия
import Header from '../Header/Header';
//компонент слайдера изображений услуги
import ServiceSlider from '../ServiceSlider/ServiceSliderController';

export default class ServicesView extends Component{
    constructor(props){
        super(props);

    }

    //действие после отрисовки компонента
    componentDidMount(){
        //делигированная обработка клика по элементу списка услуг (анимированное открытие и закрытие)
        $(".servicesContainer").on("click",".servicesItem",function(event){
            let serviceId = $(event.target).attr("serviceid");
            $("div[serviceid='"+serviceId+"']").slideToggle();
        });
    }

    render(){
        let servicesItems;
        if(this.props.services.length<1){
            servicesItems=(<div className="text-center">Список пуст</div>);
        }
        else{
            servicesItems=this.props.services.map((item)=>
                <div key={item._id} className='servicesItemContainer'>
                    <h4 className='servicesItem' serviceid={item._id}>{item.title}</h4>
                    <div serviceid={item._id}>
                        <p>{item.description}</p>
                        <p>Ориентировочная стоимость: {item.price}</p>
                        <ServiceSlider serviceId={item._id}/>
                    </div>                    
                </div>
            );
        }

        return(
            <div>
                <Header title='Виды оказываемых услуг' text='Ниже приведен список оказываемых услуг и их примерные цены.'/>
                <div className='servicesContainer'>
                    {servicesItems}
                </div>
            </div>
        );
    }
}