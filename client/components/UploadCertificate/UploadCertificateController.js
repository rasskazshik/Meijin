import React,{Component} from 'react';
//коллекция изображений сертификатов
import CertificatesImagesCollection from '../../../lib/collections/certificates/certificatesImages';
//компонент представления загрузки сертификатов
import UploadCertificateView from './UploadCertificateView';

export default class UploadCertificateController extends Component{
    constructor(props){
        super(props);

        this.InsertCertificate=this.InsertCertificate.bind(this);
    }
    
    //добавление нового сертификата
    //file - объект input file
    //certificateDescription - текст описания сертификата
    //callback - проброс функции представления для реакции на завершение обработки команды
    InsertCertificate(file, certificateDescription, callback){
        //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
        //осуществляем запись в коллекцию файлов
        CertificatesImagesCollection.insert(file, function (error, fileObj) {
            if (error){
                callback(error);
            }
            else {
                //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                let imageURL = '/cfs/files/certificatesImages/' + fileObj._id;
                //далее - наркомания с опросом состояния загрузки файла на сервере...
                //это полный неадекват, но все же... Я не нашел другого способа дождаться или просигналить  
                //о загрузке файла на сервер...
                //делаем таймер в полсекунды и опрашиваем файл о том как он устроился на сервере
                //когда сказал что примостился - пишем связанную коллекцию
                let imageWaiter = Meteor.setInterval(function(){
                    //передаем серверу id файла для проверки наличия
                    Meteor.call('CertificateImageOnTheServer',fileObj._id,function(error,responce){
                        if (error){
                            //гасим таймер      
                            Meteor.clearInterval(imageWaiter);
                            //удаляем связанный файл
                            Meteor.call("DeleteCertificateImageByImageId",fileObj._id,function(error) {
                                if (error){                              
                                    callback(error);
                                }
                            });
                            callback(error);
                        }
                        else {                                     
                            //если файл лежит на сервере - пишем коллекцию
                            if(responce){    
                                //гасим таймер      
                                Meteor.clearInterval(imageWaiter);
                                //пишем в связанную коллекцию
                                //осуществляем вызов серверного метода для работы с коллекцией
                                Meteor.call("InsertCertificate",certificateDescription,imageURL,fileObj._id,function(error) {
                                    if (error){
                                        //удаляем связанный файл
                                        Meteor.call("DeleteCertificateImageByImageId",fileObj._id,function(error) {
                                            if (error){                              
                                                callback(error);
                                            }
                                        });
                                        callback(error);
                                    }
                                    else {
                                        callback();
                                    }              
                                });
                            }
                        }
                    });                    
                },500);                
            }
        });
    }

    render(){
        return(<UploadCertificateView InsertCertificate={this.InsertCertificate}/>);
    }
}