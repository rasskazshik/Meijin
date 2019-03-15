import { Meteor } from 'meteor/meteor';
//коллекция изображений сертификатов
import CertificatesImagesCollection from '../lib/collections/certificates/certificatesImages';
//коллекция описаний сертификатов связанных с изображениями
import CertificatesCollection from '../lib/collections/certificates/certificates';

Meteor.startup(() => {
  //определяем серверные функции для действий с коллекциями
  Meteor.methods({

    //добавление нового сертификата с описанием
    //sertificateDescription - описание сертификата 
    //imageURL - путь для доступа к файлу
    //imageId - идентификатор изображения сертификата
    InsertCertificate: function(certificateDescription,imageURL,imageId) { 
      CertificatesCollection.insert({description:certificateDescription ,imagesURL:imageURL, imageId:imageId});
    },

    //удаление изображения сертификата    
    RemoveCertificate: function(sertificateImageId){
      CertificatesImagesCollection.remove({_id:sertificateImageId});
    },

    //удаление сертификата
    DeleteCertificate: function(certificateId) {
      //берем данные сертификата
      let sertificate = CertificatesCollection.find({_id:certificateId});
      //чистим связанную коллекцию
      CertificatesImagesCollection.remove({_id:sertificate.imageId});
      //чистим коллекцию сертификата
      CertificatesCollection.remove({_id:certificateId})
    }

  });
});
