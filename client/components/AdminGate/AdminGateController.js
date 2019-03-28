import React,{Component} from 'react';
import AdminGateView from './AdminGateView';

export default class AdminGateController extends Component{
    constructor(props){
        super(props);

        this.state={user:Meteor.userId(),isUserEmpty:false};

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
        let componentPointer = this;
        //проверяем наличие пользователей в системе и обновляем пользователя
        Meteor.call("IsUsersEmpty",function(error,responce) {
            if (error){
                console.log("Ошибка серверного метода проверки наличия пользователя: "+error);
            }
            else {            
                componentPointer.setState({isUserEmpty:responce,user:Meteor.userId()});
            }              
        });
        // let user= this.state.user;
        // let user2= Meteor.userId();
        // this.setState({user:Meteor.user2});
        //this.forceUpdate();
    }

    componentWillUnmount(){
        //выкидываю пользователя при смене компонента
        //this.Logout();
    }

    componentWillMount(){
        let componentPointer = this;
        //выбрасываем пользователя при закрытии окна 
        //!!!имеется баг при обновлении - рендерит неавторизованного
        //не будут работать серверные методы до повторной перезагрузки и авторизации
        // window.onbeforeunload=function(event){
        //     Meteor.logout();
        //   }

        //проверяем наличие пользователей в системе
        Meteor.call("IsUsersEmpty",function(error,responce) {
            if (error){
                console.log("Ошибка серверного метода проверки наличия пользователя: "+error);
            }
            else {            
                componentPointer.setState({isUserEmpty:responce});
            }              
        });
    }

    render(){
        //если пользователей в принципе не существует
        if(this.state.isUserEmpty){
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