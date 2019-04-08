import React,{Component} from 'react';
import AdminCertificatesView from './AdminСertificatesView';
import CertificatesCollection from '../../../lib/collections/certificates/certificates';
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
    UpdateCertificate(certificateId,certificateDescription,certificateImageFiles,callback){
        //certificateImage.imageURL, imageId:certificateImage.imageId
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
                            //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                            let certificateImageItem = {};
                            certificateImageItem.imageURL = '/cfs/files/certificatesImages/' + fileObj._id;
                            certificateImageItem.imageId = fileObj._id;
                            certificateImage.push(certificateImageItem);
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

    render(){
        return <AdminCertificatesView certificates={this.props.certificates} DeleteCertificate={this.DeleteCertificate} UpdateCertificate={this.UpdateCertificate} CertificateUp={this.CertificateUp} CertificateDown={this.CertificateDown}/>;
    }
}

export default withTracker((props) => {
    Meteor.subscribe('certificates');
    return {
        certificates: CertificatesCollection.find({},{sort:{position: -1}}).fetch()
    };
})(AdminCertificatesController);