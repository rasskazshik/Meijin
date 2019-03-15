import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Header from '../Header/Header';

class Services extends Component{
    constructor(props){
        super(props);

    }

    render(){
              
        return(
            <div>
                <Header/>
            </div>
        );
    }
}


export default withTracker((props) => {
    Meteor.subscribe('services');
    return {
        certificates: CertificatesCollection.find({}).fetch()
    };
})(Services);