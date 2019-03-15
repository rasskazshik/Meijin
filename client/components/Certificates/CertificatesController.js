import React,{Component} from 'react';
import CertificatesView from './CertificatesView';
import CertificatesCollection from '../../../lib/collections/certificates/certificates';
import { withTracker } from 'meteor/react-meteor-data';

class CertificatesController extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return <CertificatesView certificates={this.props.certificates}/>;
    }
}

export default withTracker((props) => {
    Meteor.subscribe('certificates');
    return {
        certificates: CertificatesCollection.find({}).fetch()
    };
})(CertificatesController);