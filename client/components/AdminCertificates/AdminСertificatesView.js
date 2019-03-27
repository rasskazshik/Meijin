import React,{Component} from 'react';
import UploadCertificate from '../UploadCertificate/UploadCertificateController';
import Header from '../Header/Header';

export default class AdminCertificatesView extends Component{
    constructor(props){
        super(props);

        this.DeleteCertificate=this.DeleteCertificate.bind(this);
        this.UpdateCertificate=this.UpdateCertificate.bind(this);
    }

    //передача данных для удаления сертификакта в контроллер
    DeleteCertificate(event){
        if(confirm("Вы уверены в том, что хотите удалить подтверждение квалификации?")){
            let certificateId = $(event.target).attr("certificateid");
            this.props.DeleteCertificate(certificateId);
        }
    }

    UpdateCertificate(event){
        if(confirm("Вы уверены в том, что хотите обновить данные документа подтверждения квалификации?")){
            let certificateId = $(event.target).attr("certificateid");
            let certificateDescription = $('.certificateDescription[certificateid="'+certificateId+'"]').val();
            let selector = '.sertificateImage[certificateid="'+certificateId+'"]';
            let file = document.querySelector('.sertificateImage[certificateid="'+certificateId+'"]');
            let certificateImageFiles = document.querySelector('.sertificateImage[certificateid="'+certificateId+'"]').files;
            this.props.UpdateCertificate(certificateId,certificateDescription,certificateImageFiles);
        }
    }

    render(){
        let certificate;
        if(typeof this.props.certificates === "undefined")
        {
            certificate=(<div className='text-center container'>Данные с сервера еще не получены</div>);
        }
        else{
            if(this.props.certificates.length<1){
                certificate=(<div className='text-center container'>Сертификаты отсутствуют</div>);
            }
            else{
                certificate = this.props.certificates.map((certificate) =>
                <div className='row mt-1 mb-2 pb-2 AdminCertificateItem align-items-center' key={certificate._id}>                    
                    <div className='col-md-6'>
                        <img className="w-100 img-thumbnail"  src={certificate.imagesURL} alt={certificate.imagesURL}/>
                        <input type='file' certificateid={certificate._id} className='sertificateImage'/>
                    </div>
                    <div className='col-md-6'>
                        <textarea className='w-100 certificateDescription' certificateid={certificate._id} defaultValue={certificate.description}/>
                    </div>
                    <input className='w-100' type='button' certificateid={certificate._id} value='Удалить подтверждение квалификации' onClick={this.DeleteCertificate}/>
                    <input className='w-100' type='button' certificateid={certificate._id} value='Обновить данные документа квалификации' onClick={this.UpdateCertificate}/>
                </div>
                );
            }
        }
        
        return(
            <div className="certificatesRow">
                <Header title='Сертификаты' text='Ниже представлен список сертификатов, подтверждающих высокую квалификацию.'/> 
                <UploadCertificate/>               
                {certificate}
            </div>
        );
    }
}