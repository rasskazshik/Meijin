import React,{Component} from 'react';

export default class UploadCertificateView extends Component{
    constructor(props){
        super(props);

        this.SubmitFormCertificate=this.SubmitFormCertificate.bind(this);
    }

    //поднятие данных в контроллер
    SubmitFormCertificate(event){
        event.preventDefault();
        let form = event.target;
        let file = form[1].files[0];
        let certificateDescription = form[0].value;
        this.props.InsertCertificate(file, certificateDescription);
    }

    render(){
        return(
            <div className="container uploadCertificate">
                <form onSubmit={this.SubmitFormCertificate}>
                    <textarea className="w-100" id="description" name="description" required placeholder="Описание загружаемого сертификата"/>
                    <input className="w-100" type="file" id="certificateImage" name="certificateImage" placeholder="Добавить сертификат"/>
                    <input className="w-100" type="submit" defaultValue="Добавить сертификат"/>
                </form>
            </div>
        );
    }
}