import React,{Component} from 'react';
import Header from '../Header/Header';
import AdminNavigation from '../AdminNavigation/AdminNavigation';
import AdminCertificates from '../AdminCertificates/AdminCertificatesController';
import AdminServices from '../AdminServices/AdminServicesController';
import AdminUserData from '../AdminUserData/AdminUserDataController';

export default class AdminContent extends Component{
    constructor (props){
        super(props);
        this.state={contentType:'services'};

        this.SetContentType=this.SetContentType.bind(this);
    }

    SetContentType(contentType){
        this.setState({contentType:contentType});
    }

    render(){
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

        return(
            <div>
                <Header title='Меню администратора'/>
                <div className='row'>
                    <div className='col-md'>
                        {content}
                    </div>
                    <div className='col-md adminNavigation'>
                        <AdminNavigation Logout={this.props.Logout} SetContentType={this.SetContentType}/>
                    </div>
                </div>
            </div>
        );
    }
}