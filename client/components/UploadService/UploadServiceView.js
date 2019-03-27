import React,{Component} from 'react';

export default class UploadServiceView extends Component{
    constructor(props){
        super(props);

        this.SubmitFormService=this.SubmitFormService.bind(this);
    }

    //поднятие данных в контроллер
    SubmitFormService(event){
        event.preventDefault();
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let price = document.getElementById("price").value;
        let files = document.getElementById("images").files;
        
        this.props.InsertService(title, description, price, files);
    }

    render(){
        return(
            <div className="container uploadService">
                <form onSubmit={this.SubmitFormService}>
                    <input className="w-100" type="text" id='title' name="title" required placeholder="Наименование услуги"/>
                    <input className="w-100" type="text" id='price' name="price" required placeholder="Текст примерной стоимости услуги"/>
                    <textarea className="w-100" id="description" name="description" required placeholder="Описание добавляемой услуги"/>
                    <input className="w-100" type="file" id="images" name="images" multiple/>
                    <input className="w-100" type="submit" value="Добавить услугу"/>
                </form>
            </div>
        );
    }
}