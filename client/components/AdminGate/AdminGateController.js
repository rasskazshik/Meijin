import React,{Component} from 'react';
import AdminGateView from './AdminGateView';

export default class AdminGateController extends Component{
    constructor(props){
        super(props);

        this.state={user:Meteor.userId()};

        this.Logout=this.Logout.bind(this);
        this.UpdateAuthUserData=this.UpdateAuthUserData.bind(this);
    }
    
    Logout(){
        let componentPointer = this;
        Meteor.logout(function(err){
            if(err){
                console.log('Ошибка выхода из учетной записи: '+err);
            }
            else{                
                Meteor.logout();
                componentPointer.setState({user:Meteor.userId()});
            }
        });
    }

    UpdateAuthUserData(){
        this.setState({user:Meteor.userId()});
    }

    componentWillUnmount(){
        //выкидываю пользователя при смене компонента
        //this.Logout();
    }

    componentWillMount(){
        //выбрасываем пользователя при закрытии окна 
        //!!!имеется баг при обновлении - рендерит неавторизованного
        //не будут работать серверные методы до повторной перезагрузки и авторизации
        // window.onbeforeunload=function(event){
        //     Meteor.logout();
        //   }
    }

    render(){
        //если пользователей в принципе не существует
        let isUserEmpty;
        Meteor.call("IsUsersEmpty",function(error,responce) {
            if (error){
                console.log("Ошибка серверного метода проверки наличия пользователя: "+error);
            }
            else {                
                isUserEmpty=responce;
            }              
        });
        if(isUserEmpty){
            return(<AdminGateView type="create" UpdateAuthUserData={this.UpdateAuthUserData}/>);
        }
        //если не авторизован
        if(this.state.user===null){        
            return(<AdminGateView type="auth" UpdateAuthUserData={this.UpdateAuthUserData}/>);
        }
        else{
            return(<AdminGateView type="admin" Logout={this.Logout}/>);
        }
    }
}