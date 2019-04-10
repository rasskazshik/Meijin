import React,{Component} from 'react';
//компонетн представления списка документов подтверждающих квалификацию
import CertificatesView from './CertificatesView';
//коллекция документов подтверждающих квалификацию
import CertificatesCollection from '../../../lib/collections/certificates/certificates';
import { withTracker } from 'meteor/react-meteor-data';

class CertificatesController extends Component{
    constructor(props){
        super(props);

    }

    //рендер представления с пробросом данных
    render(){
        return <CertificatesView certificates={this.props.certificates}/>;
    }
}

//подписка на данные с сортировкой списка
export default withTracker((props) => {
    Meteor.subscribe('certificates');
    return {
        certificates: CertificatesCollection.find({},{sort:{position: -1}}).fetch()
    };
})(CertificatesController);