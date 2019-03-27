import React,{Component} from 'react';
import AdminCertificatesView from './AdminСertificatesView';
import CertificatesCollection from '../../../lib/collections/certificates/certificates';
import { withTracker } from 'meteor/react-meteor-data';

class AdminCertificatesController extends Component{
    constructor(props){
        super(props);

        this.DeleteCertificate=this.DeleteCertificate.bind(this);
        this.UpdateCertificate=this.UpdateCertificate.bind(this);
    }

    //вызов серверного метода для удаления всех данных сертификата
    DeleteCertificate(sertificateId){
        Meteor.call('DeleteCertificate',sertificateId);
    }

    //вызов серверного метода обновления данных документа подтверждающего квалификацию
    UpdateCertificate(certificateId,certificateDescription,certificateImageFiles){
        //certificateImage.imageURL, imageId:certificateImage.imageId
        let certificateImage=[];
        //если обновляется изображение
        if(certificateImageFiles.length>0){
            //чистим связанную коллекцию и в обратном вызове добавляем данные
            Meteor.call('DeleteCertificateImageByCertificateId',certificateId,function(){
                //добавляем файл изображения в коллекцию
                CertificatesImagesCollection.insert(certificateImageFiles[0], function (err, fileObj) {
                    if (err){
                        console.log("Нашкобнулась загрузка файла: "+error);
                    } 
                    else {
                        //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                        let certificateImageItem = {};
                        certificateImageItem.imageURL = '/cfs/files/certificatesImages/' + fileObj._id;
                        certificateImageItem.imageId = fileObj._id;
                        certificateImage.push(certificateImageItem);
                        Meteor.call('UpdateCertificate',certificateId,certificateDescription,certificateImage);
                    }
                });
            });
        }
        else{
            Meteor.call('UpdateCertificate',certificateId,certificateDescription,certificateImageFiles);
        }        
    }

    render(){
        return <AdminCertificatesView certificates={this.props.certificates} DeleteCertificate={this.DeleteCertificate} UpdateCertificate={this.UpdateCertificate}/>;
    }
}

export default withTracker((props) => {
    Meteor.subscribe('certificates');
    return {
        certificates: CertificatesCollection.find({}).fetch()
    };
})(AdminCertificatesController);