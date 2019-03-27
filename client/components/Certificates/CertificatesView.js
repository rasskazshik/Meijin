import React,{Component} from 'react';
import UploadCertificate from '../UploadCertificate/UploadCertificateController';
import Header from '../Header/Header';

export default class CertificatesView extends Component{
    constructor(props){
        super(props);

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
                <div className='row mt-1 mb-2 pb-2 certificateItem align-items-center' key={certificate._id}>
                    <div className='col-md-6'>
                        <img className="w-100 img-thumbnail" src={certificate.imagesURL} alt={certificate.imagesURL}/>
                    </div>
                    <div className='col-md-6'>
                        <p>{certificate.description}</p>
                    </div>
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