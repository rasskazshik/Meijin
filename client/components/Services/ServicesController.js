import React,{Component} from 'react';
//компонент отображения списка услуг
import ServicesView from './ServicesView';
import { withTracker } from 'meteor/react-meteor-data';
//коллекция услуг
import servicesCollection from '../../../lib/collections/services/services';

class ServicesController extends Component{
    constructor(props){
        super(props);

    }

    //рендер компонента отображения с пробросом данных
    render(){
        return(<ServicesView services={this.props.services}/>);
    }
}

export default withTracker((props) => {
    Meteor.subscribe('services');
    return {
        services: servicesCollection.find({},{sort:{position: -1}}).fetch()
    };
})(ServicesController);