import React,{Component} from 'react';
//представление компонента админки сертификатов
import AdminCertificatesView from './AdminСertificatesView';
//Коллекция сертификатов
import CertificatesCollection from '../../../lib/collections/certificates/certificates';
//"обертка" данных
import { withTracker } from 'meteor/react-meteor-data';

class AdminCertificatesController extends Component{
    constructor(props){
        super(props);

        this.DeleteCertificate=this.DeleteCertificate.bind(this);
        this.UpdateCertificate=this.UpdateCertificate.bind(this);
        this.CertificateUp=this.CertificateUp.bind(this);
        this.CertificateDown=this.CertificateDown.bind(this);
    }

    //вызов серверного метода для удаления всех данных сертификата
    //callback - проброс функции представления, для сигнала о завершении операции
    DeleteCertificate(sertificateId,callback){
        Meteor.call('DeleteCertificate',sertificateId,function(error){
            if(error){
                callback(error);
            }
            else{
                callback();
            }
        });
    }

    //вызов серверного метода обновления данных документа подтверждающего квалификацию
    //callback - проброс функции представления, для сигнала о завершении операции
    UpdateCertificate(certificateId,certificateDescription,certificateImageFiles,callback){
        //массив изображений
        let certificateImage=[];
        //если обновляется изображение
        if(certificateImageFiles.length>0){
            //чистим связанную коллекцию и в обратном вызове добавляем данные
            Meteor.call('DeleteCertificateImageByCertificateId',certificateId,function(error){
                if(error){
                    callback(error);
                }
                else{
                    //добавляем файл изображения в коллекцию
                    CertificatesImagesCollection.insert(certificateImageFiles[0], function (error, fileObj) {
                        if (error){
                            callback(error);
                        } 
                        else {
                            //объект с данными изображения
                            let certificateImageItem = {};
                            //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                            certificateImageItem.imageURL = '/cfs/files/certificatesImages/' + fileObj._id;
                            certificateImageItem.imageId = fileObj._id;
                            certificateImage.push(certificateImageItem);
                            //серверный метод обновления коллекции сертификатов
                            Meteor.call('UpdateCertificate',certificateId,certificateDescription,certificateImage,function(error){
                                if (error){
                                    callback(error);
                                } 
                                else {
                                    callback();
                                }
                            });
                        }
                    });
                }
            });
        }
        else{
            Meteor.call('UpdateCertificate',certificateId,certificateDescription,certificateImageFiles,function(error){
                if (error){
                    callback(error);
                } 
                else {
                    callback();
                }
            });
        }        
    }

    //вызов серверного метода для поднятия записи в списке
    //callback - проброс функции представления, для сигнала о завершении операции
    CertificateUp(certificateId,callback){
        Meteor.call('CertificateUp',certificateId,function(error){
            if (error){
                callback(error);
            } 
            else {
                callback();
            }
        });
    }

    //вызов серверного метода для понижения записи в списке
    //callback - проброс функции представления, для сигнала о завершении операции
    CertificateDown(certificateId,callback){
        Meteor.call('CertificateDown',certificateId,function(error){
            if (error){
                callback(error);
            } 
            else {
                callback();
            }
        });
    }

    //рендер представления с пробросом методов компонента контроллера и набором данных
    render(){
        return <AdminCertificatesView certificates={this.props.certificates} DeleteCertificate={this.DeleteCertificate} UpdateCertificate={this.UpdateCertificate} CertificateUp={this.CertificateUp} CertificateDown={this.CertificateDown}/>;
    }
}

//подписка на данные с сортировкой позиции
export default withTracker((props) => {
    Meteor.subscribe('certificates');
    return {
        certificates: CertificatesCollection.find({},{sort:{position: -1}}).fetch()
    };
})(AdminCertificatesController);