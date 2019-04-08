import React,{Component} from 'react';

export default class AdminNavigation extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        let componentPointer = this;
        //делигированная обработка клика на элемент меню
        $('.adminContentList').on("click","p",function(event){
            let content = $(event.target).attr('content');
            if(content==="logout"){
                componentPointer.props.Logout();
            }
            else{
                componentPointer.props.SetContentType(content);
            }
        });
    }

    render(){
        return(
            <div className='adminContentList'>
                <p content='logout'>Выход из учетной записи</p>
                <p className={this.props.contentType=='services'?'activeAdminNavigation':''} content='services'>Администрирование услуг</p>
                <p className={this.props.contentType=='certificates'?'activeAdminNavigation':''} content='certificates'>Администрирование квалификиции</p>
                <p className={this.props.contentType=='userData'?'activeAdminNavigation':''} content='userData'>Учетные данные администратора</p>
            </div>
        );
    }
}