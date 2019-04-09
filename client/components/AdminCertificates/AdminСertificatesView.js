import React,{Component} from 'react';
import UploadCertificate from '../UploadCertificate/UploadCertificateController';
import Header from '../Header/Header';

export default class AdminCertificatesView extends Component{
    constructor(props){
        super(props);

        this.DeleteCertificate=this.DeleteCertificate.bind(this);
        this.UpdateCertificate=this.UpdateCertificate.bind(this);
        this.ClearValidity=this.ClearValidity.bind(this);
        this.CertificateUp=this.CertificateUp.bind(this);
        this.CertificateDown=this.CertificateDown.bind(this);
        this.FormEnable=this.FormEnable.bind(this);
        this.FormDisable=this.FormDisable.bind(this);
        this.ClearFileUpdate=this.ClearFileUpdate.bind(this);
    }

    //передача данных для удаления сертификакта в контроллер
    DeleteCertificate(event){
        if(confirm("Вы уверены в том, что хотите удалить подтверждение квалификации?")){
            let certificateId = $(event.target).attr("certificateid");
            this.props.DeleteCertificate(certificateId,function(error){
                if(error){
                    alert('Во время выполнения операции возникли ошибки. ('+error+')');
                }
            });
        }
    }

    //передача данных в контроллер для обновления сертификата
    UpdateCertificate(event){
        let certificateId = $(event.target).attr("certificateid");
        let componentPointer = this;
        //валидация
        //странное поведение в хроме - не всплывает подсказка если валидация внутри условия с конфирм
        if(document.querySelector('form[certificateid="'+certificateId+'"]').reportValidity()){      
            if(confirm("Вы уверены в том, что хотите обновить данные документа подтверждения квалификации?")){
                let certificateDescription = document.querySelector('textarea[certificateid="'+certificateId+'"]').value;
                let certificateImageFiles = document.querySelector('input[type="file"][certificateid="'+certificateId+'"]').files;
                //блокировка формы на время выполнения запроса
                componentPointer.FormDisable(certificateId);
                this.props.UpdateCertificate(certificateId,certificateDescription,certificateImageFiles,function(error){
                    if(error){
                        alert('Во время выполнения операции возникли ошибки. ('+error+')');
                        //блокировка формы на время выполнения запроса
                        componentPointer.FormEnable(certificateId);
                    }
                    else{
                        //блокировка формы на время выполнения запроса
                        componentPointer.FormEnable(certificateId);
                        componentPointer.ClearFileUpdate(certificateId);
                    }
                });
            }  
        }
    }

    //снимаем флаг ошибки при изменении данных инпута
    ClearValidity(event){
        event.target.setCustomValidity('');
    }

    CertificateUp(){
        let certificateId = $(event.target).attr("certificateid");
        this.props.CertificateUp(certificateId,function(error){
            if(error){
                alert('Во время выполнения операции возникли ошибки. ('+error+')');
            }
        });
    }

    CertificateDown(){
        let certificateId = $(event.target).attr("certificateid");
        this.props.CertificateDown(certificateId,function(error){
            if(error){
                alert('Во время выполнения операции возникли ошибки. ('+error+')');
            }
        });
    }

    //блокировка элемента
    FormDisable(certificateid){
        $('.AdminCertificateItem input[certificateid="'+certificateid+'"], .AdminCertificateItem textarea[certificateid="'+certificateid+'"]').prop('disabled', true);
        $('.AdminCertificateItem h4[certificateid="'+certificateid+'"]').html('Запрос обрабатывется');
    }

    //разблокировка элемента
    FormEnable(certificateid){
        $('.AdminCertificateItem input[certificateid="'+certificateid+'"], .AdminCertificateItem textarea[certificateid="'+certificateid+'"]').prop('disabled', false);
        $('.AdminCertificateItem h4[certificateid="'+certificateid+'"]').html('');
    }

    //чистим инпут файл
    ClearFileUpdate(certificateid){
        $("input[type='file'][certificateid='"+certificateid+"']").val('');
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
                    <h4 className='text-center w-100' certificateid={certificate._id}></h4>          
                    <div className='col-md-6'>
                        <img className="w-100 img-thumbnail"  src={certificate.imagesURL} alt={certificate.imagesURL}/>
                        Изображение (если не выбрать - останется неизменным): 
                        <input type='file' certificateid={certificate._id} className='sertificateImage mb-1'/>
                    </div>
                    <div className='col-md-6'>                        
                        Описание документа:
                        <form certificateid={certificate._id}>
                            <textarea className='w-100 certificateDescription' onChange={this.ClearValidity} certificateid={certificate._id} autoComplete='off' required placeholder="Описание загружаемого сертификата" defaultValue={certificate.description}/>
                        </form>                       
                    </div>
                    <input className='w-100' type='button' certificateid={certificate._id} value='Удалить подтверждение квалификации' onClick={this.DeleteCertificate}/>
                    <input className='w-100' type='button' certificateid={certificate._id} value='Обновить данные документа квалификации' onClick={this.UpdateCertificate}/>
                    <div className='row w-100 positionButtonRow'>
                        <div className='col-md'>
                            <input type='button' className='w-100' certificateid={certificate._id} onClick={this.CertificateUp} value='Поднять в списке'/>
                        </div>
                        <div className='col-md'>
                            <input type='button' className='w-100' certificateid={certificate._id} onClick={this.CertificateDown} value='Опустить в списке'/>
                        </div>
                    </div>
                </div>
                );
            }
        }
        
        return(
            <div className="certificatesRow">
                <Header title='Администрирование документов подтверждающих квалификацию' text='В этом меню можно добавить, удалить и изменить информацию подтверждающую квалификацию'/> 
                <UploadCertificate/>               
                {certificate}
            </div>
        );
    }
}