import React,{Component} from 'react';
import AdminUserDataView from './AdminUserDataView';

export default class AdminUserDataController extends Component{
    constructor(props){
        super(props);
        this.state={oldEmail:null}

        this.UpdateUserData=this.UpdateUserData.bind(this);
    }

    componentWillMount(){
        let componentPointer=this;
        Meteor.call('GetUserEmail',function(err,responce){
            if(err){
                componentPointer.setState({oldEmail:"Ошибка получения электронной почты"});
            }
            else{
                componentPointer.setState({oldEmail:responce});
            }
        });
    }

    UpdateUserData(email,oldPassword,newPassword,callback){
        Meteor.call('UpdateUserData',email,oldPassword,newPassword,function(err,responce){
            if(err){
                callback(err);
            }
            else{
                callback(err,responce);
            }
        });
    }

    render(){
        return(
            <AdminUserDataView oldEmail={this.state.oldEmail} UpdateUserData={this.UpdateUserData}/>
        );
    }
}