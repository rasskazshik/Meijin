import React,{Component} from 'react';

export default class AdminNavigation extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        let componentPointer = this;
        //делигированная обработка клика на элемент меню
        $('.adminContentList').on("click","p",function(event){
            //смотрим тип действия
            let content = $(event.target).attr('content');
            //если в контенте команда разлогиниться - выполняем
            if(content==="logout"){
                componentPointer.props.Logout();
            }
            //иначе - идем куда послали с помощью проброшенного метода (запускает ререндер родительского компонента)
            else{
                componentPointer.props.SetContentType(content);
            }
        });
    }

    //рендер с выделением активного компонента согласно проброшенным данным
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