import React,{Component} from 'react';
//обертка для доступа к данным маршрутизации
import { withRouter } from "react-router";
//компонент заголовка
import Header from '../Header/Header';

class Page404 extends Component{
    constructor(props){
        super(props);

        this.state={route:null};
    }


    render(){
        //роутер настроен на отрисовку компонента по любому маршруту, поэтому делаем проверку в компоненте
        //берем текущий путь и проверяем на наличие совпадений с "известными"
        //если совпадения есть - отменяем флаг неизвестной страницы 
        let isPage404 = true;
        switch (this.props.location.pathname){
            case '/':
                isPage404=false;
                break;
            case '/howFind':
                isPage404=false;
                break;
            case '/certificates':
                isPage404=false;
                break;
            case '/services':
                isPage404=false;
                break;
            case '/admin':
                isPage404=false;
                break;
        }
        //если страница неизвестная - сообщаем пользователю, что он заблудился
        if(isPage404){
            return(<Header title='Страница не найдена'/>);
        }
        //если страница "своя" - рендерим пустоту
        else{
            return(<div></div>);
        }
    }
}

//пробрасываем данные маршрутизации через обертку в пропы
export default withRouter(Page404);