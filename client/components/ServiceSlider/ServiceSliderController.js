import React,{Component} from 'react';
//компонент отображения слайдера
import ServiceSliderView from './SeviceSliderView';
//коллекция услуг
import servicesCollection from '../../../lib/collections/services/services';
import {withTracker} from 'meteor/react-meteor-data';

class ServicesSliderController extends Component{
    constructor (props){
        super(props);

        this.state={images:false};
    }

    //рендер с пробросом данных услуги
    render(){
        return(
            <ServiceSliderView service={this.props.service} />
        );
    }
}

//подписка на документ услуги
export default withTracker((props)=>{
    Meteor.subscribe('services');
    //берем только массив путей изображений нужной услуги
    return {
        service: servicesCollection.findOne({_id:props.serviceId},{images:1})
    };    
})(ServicesSliderController)