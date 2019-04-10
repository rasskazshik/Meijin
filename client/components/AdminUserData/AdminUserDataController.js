import React,{Component} from 'react';
//компонент представления админки учетных данных
import AdminUserDataView from './AdminUserDataView';

export default class AdminUserDataController extends Component{
    constructor(props){
        super(props);
        //в состоянии храним информацию о старой почте
        this.state={oldEmail:null}

        this.UpdateUserData=this.UpdateUserData.bind(this);
    }

    //перед запуском компонента вычитываем данные о старой почте
    componentWillMount(){
        let componentPointer=this;
        //получаем данные о почте в ответе серверного метода
        Meteor.call('GetUserEmail',function(err,responce){
            if(err){
                componentPointer.setState({oldEmail:"Ошибка получения электронной почты"});
            }
            else{
                componentPointer.setState({oldEmail:responce});
            }
        });
    }

    //обновление данных
    UpdateUserData(email,oldPassword,newPassword,callback){
        //меняем пароль
        Accounts.changePassword(oldPassword, newPassword,function(error){
            if(error){
                callback(error);
            }
            //в случае успеха меняем логин
            else{                
                Meteor.call('ChangeEmail',email,function(error){
                    if(error){
                        callback(error);
                    }
                    callback();
                })   
            }
        });
    }

    render(){
        return(
            <AdminUserDataView oldEmail={this.state.oldEmail} UpdateUserData={this.UpdateUserData}/>
        );
    }
}