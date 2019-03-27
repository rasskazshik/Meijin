import React,{Component} from 'react';
import AdminContent from '../AdminContent/AdminContent';
import Authorization from '../Authorization/Authorization';
import CreateUser from '../CreateUser/CreateUser';

export default class AdminGateView extends Component{
    constructor(props){
        super(props);

    }

    render(){
        switch(this.props.type){
            case 'create':
                return (<CreateUser UpdateAuthUserData={this.props.UpdateAuthUserData}/>);
                break;
            case 'auth':
                return (<Authorization UpdateAuthUserData={this.props.UpdateAuthUserData}/>);
                break;
            case 'admin':
                return (<AdminContent Logout={this.props.Logout}/>);
                break;
            default:
                return(<div className='text-center'>Что-то пошло не так... Зовите разработчика...</div>);
                break;
        }
    }
}