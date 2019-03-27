import React,{Component} from 'react';
import CertificatesImagesCollection from '../../../lib/collections/certificates/certificatesImages';
import UploadCertificateView from './UploadCertificateView';

export default class UploadCertificateController extends Component{
    constructor(props){
        super(props);

        this.InsertCertificate=this.InsertCertificate.bind(this);
    }
    
    //добавление нового сертификата
    //file - объект input file
    //certificateDescription - текст описания сертификата
    InsertCertificate(file, certificateDescription){
        //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
        //осуществляем запись в коллекцию файлов
        CertificatesImagesCollection.insert(file, function (err, fileObj) {
            if (err){
                console.log("Нашкобнулась загрузка файла: "+error);
                return false;
            } 
            else {
                //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                let imageURL = '/cfs/files/certificatesImages/' + fileObj._id;
                //осуществляем вызов "доверенного и безопасного" серверного метода для работы с коллекцией
                Meteor.call("InsertCertificate",certificateDescription,imageURL,fileObj._id,function(error,responce) {
                    if (error){
                        console.log("Нашкобнулась запись в коллекцию: "+error);
                        //удаляем связанный файл
                        Meteor.call("DeleteCertificateImageByImageId",fileObj._id,function(error) {
                            if (error){
                                console.log("Нашкобнулось сервисное удаление файла: "+error);                                
                                return false;
                            }
                        return false;
                        });
                    }
                    else {
                        console.log("Данные успешно добавлены в коллекции");
                        return true;
                    }              
                });
            }
        });
    }

    render(){
        return(<UploadCertificateView InsertCertificate={this.InsertCertificate}/>);
    }
}