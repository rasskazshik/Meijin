import React,{Component} from 'react';
//компонент админки
import AdminContent from '../AdminContent/AdminContent';
//компонент авторизации
import Authorization from '../Authorization/Authorization';
//компонент создания учетной записи
import CreateUser from '../CreateUser/CreateUser';

export default class AdminGateView extends Component{
    constructor(props){
        super(props);

    }

    render(){
        //рендер соответствующего компонента согласно проброшенным из контроллера данным
        //дальнейший проброс методов связанных с учетными данными
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