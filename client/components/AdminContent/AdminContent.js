import React,{Component} from 'react';
//компонент заглавия
import Header from '../Header/Header';
//компонент нафигации по разделам админки
import AdminNavigation from '../AdminNavigation/AdminNavigation';
//компонент админки сертификатов
import AdminCertificates from '../AdminCertificates/AdminCertificatesController';
//компонент админки услуг
import AdminServices from '../AdminServices/AdminServicesController';
//компонент админки учетных данных пользователя
import AdminUserData from '../AdminUserData/AdminUserDataController';

export default class AdminContent extends Component{
    constructor (props){
        super(props);
        //contentType:'services' - выбор раздела по умолчанию
        this.state={contentType:'services'};

        this.SetContentType=this.SetContentType.bind(this);
    }

    //обновление состояния с выбором раздела для ререндеринга
    SetContentType(contentType){
        this.setState({contentType:contentType});
    }

    render(){
        //выбор рендера компонента в зависимости от состояния
        let content;
        switch (this.state.contentType){
            case 'certificates':
                content=<AdminCertificates/>;
                break;
            case 'services':
                content=<AdminServices/>;
                break;
            case 'userData':
                content=<AdminUserData/>;
                break;
        }

        //проброс информации о текущем состоянии и методов изменения состояния и выхода из учетной записи
        return(
            <div>
                <Header title='Меню администратора'/>
                <div className='row adminContentRow'>
                    <div className='col-md order-2 order-md-1'>
                        {content}
                    </div>
                    <div className='col-md adminNavigation order-1 order-md-2'>
                        <AdminNavigation contentType={this.state.contentType} Logout={this.props.Logout} SetContentType={this.SetContentType}/>
                    </div>
                </div>
            </div>
        );
    }
}