import React,{Component} from 'react';
import AdminGateView from './AdminGateView';

export default class AdminGateController extends Component{
    constructor(props){
        super(props);

        //данные текущего пользователя и флаг отсутствия пользователей в принципе
        this.state={user:Meteor.userId(),isUserEmpty:false};

        this.Logout=this.Logout.bind(this);
        this.UpdateAuthUserData=this.UpdateAuthUserData.bind(this);
    }
    
    //выход из учетной записи
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

    //перепроверка состояния пользователя
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
    }

    //действия перед освобождением компонента
    componentWillUnmount(){
        //выкидываю пользователя при смене компонента
        //убираю функционал до тех пор, пока не пойму как адекватно реализовать весь модуль автоматического логаута
        //this.Logout();
    }

    //действия перед запуском компонента
    componentWillMount(){
        let componentPointer = this;
        //выбрасываем пользователя при закрытии окна 
        //!!!имеется баг при обновлении - рендерит неавторизованного
        //не будут работать серверные методы до повторной перезагрузки и авторизации
        //убираю функционал до тех пор, пока не пойму как адекватно реализовать 
        // window.onbeforeunload=function(event){
        //     Meteor.logout();
        //   }

        //проверяем наличие пользователей в системе
        Meteor.call("IsUsersEmpty",function(error,responce) {
            if (error){
                console.log("Ошибка во время выполнения: "+error);
            }
            else {
                //передаем флаг наличия учетных записей в компонент            
                componentPointer.setState({isUserEmpty:responce});
            }              
        });
    }

    render(){
        //если пользователей в принципе не существует - создание пользователя
        if(this.state.isUserEmpty){
            return(<AdminGateView type="create" UpdateAuthUserData={this.UpdateAuthUserData}/>);
        }
        //если не авторизован - авторизация
        if(this.state.user===null){        
            return(<AdminGateView type="auth" UpdateAuthUserData={this.UpdateAuthUserData}/>);
        }
        //если авторизован - админка
        else{
            return(<AdminGateView type="admin" Logout={this.Logout}/>);
        }
    }
}