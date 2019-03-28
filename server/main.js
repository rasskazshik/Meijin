import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
//коллекция изображений сертификатов
import {Account} from 'meteor/accounts-base';
import CertificatesImagesCollection from '../lib/collections/certificates/certificatesImages';
//коллекция описаний сертификатов связанных с изображениями
import CertificatesCollection from '../lib/collections/certificates/certificates';
//коллекция изображений услуг
import servicesImagesCollection from '../lib/collections/services/servicesImages';
//коллекция описаний услуг связанных с изображениями
import servicesCollection from '../lib/collections/services/services';

Meteor.startup(() => {
  //определяем серверные функции для действий с коллекциями
  Meteor.methods({

    //добавление нового сертификата с описанием
    //sertificateDescription - описание сертификата 
    //imageURL - путь для доступа к файлу
    //imageId - идентификатор изображения сертификата
    InsertCertificate: function(certificateDescription,imageURL,imageId) { 
      if(Meteor.userId()===null){
        return false;
      }
      CertificatesCollection.insert({description:certificateDescription ,imagesURL:imageURL, imageId:imageId});
    },

    //удаление изображения сертификата по id изображения  
    DeleteCertificateImageByImageId: function(certificateImageId){
      if(Meteor.userId()===null){
        return false;
      }
      CertificatesImagesCollection.remove({_id:certificateImageId});
    },

    //удаление изображения сертификата по id сертификата  
    DeleteCertificateImageByCertificateId: function(certificateId){
      if(Meteor.userId()===null){
        return false;
      }
      //берем данные сертификата
      let certificate = CertificatesCollection.find({_id:certificateId});
      //удаляем
      CertificatesImagesCollection.remove({_id:certificate.imageId});
    },

    //удаление сертификата
    DeleteCertificate: function(certificateId) {
      if(Meteor.userId()===null){
        return false;
      }
      //берем данные сертификата
      let sertificate = CertificatesCollection.find({_id:certificateId});
      //чистим связанную коллекцию
      CertificatesImagesCollection.remove({_id:certificate.imageId});
      //чистим коллекцию сертификата
      CertificatesCollection.remove({_id:certificateId})
    },

    UpdateCertificate:function(certificateId,certificateDescription,certificateImage){
      //если требуется обновление данных изображения
      if(certificateImage.length>0){
        //полная замена данных
        CertificatesCollection.update({_id:certificateId},{description:certificateDescription ,imagesURL:certificateImage[0].imageURL, imageId:certificateImage[0].imageId});
      }
      else{
        //частичная замена данных ({$set{}})
        CertificatesCollection.update({_id:certificateId},{$set:{description:certificateDescription}});
      }
    },

    //добавление услуги в коллекцию
    InsertService:function(serviceTitle, serviceDescription, servicePrice, serviceImages){
      if(Meteor.userId()===null){
        return false;
      }
      servicesCollection.insert({title:serviceTitle ,description:serviceDescription, price:servicePrice, images:serviceImages});
    },

    //удаление услуги и связанных с ней изображений
    DeleteService:function(serviceId){
      if(Meteor.userId()===null){
        return false;
      }
      let service = servicesCollection.findOne({_id:serviceId});
      //чистим коллекцию изображений
      service.images.forEach(function(image){
        servicesImagesCollection.remove({_id:image.imageId});
      });
      servicesCollection.remove({_id:serviceId});
    },

    //удаление изображения услуги (по id изображения)
    RemoveServiceImage:function(imageId){
      if(Meteor.userId()===null){
        return false;
      }
      servicesImagesCollection.remove({_id:imageId});
    },

    //удаление всех изображений услуги (по id услуги)
    RemoveServiceImages:function(serviceId){
      if(Meteor.userId()===null){
        return false;
      }
      let service = servicesCollection.findOne({_id:serviceId});
      //чистим коллекцию изображений
      service.images.forEach(function(image){
        servicesImagesCollection.remove({_id:image.imageId});
      });
    },

    //обновление данных услуги
    UpdateServiceData:function(serviceId,title, description, price, serviceImages){
      if(Meteor.userId()===null){
        return false;
      }
      if(serviceImages.length>0){
        //полная замена данных
        servicesCollection.update({_id:serviceId},{title:title ,description:description, price:price, images:serviceImages});
      }
      else{
        //частичная замена данных ({$set{}})
        servicesCollection.update({_id:serviceId},{$set:{title:title ,description:description, price:price}});
      }
    },

    //проверка на отсутствие зарегистрированных пользователей
    IsUsersEmpty:function(){
      if(Meteor.users.find().count()<1){
        return true;
      }
      else{
        return false;
      }
    },

    GetUserEmail:function(){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        return "Попытка выполнения серверного метода в обход процедуры авторизации";
      }
      let user=Meteor.users.findOne({_id:Meteor.userId()});
      return user.emails[0].address;
    },

    //обновление данных пользователя
    ChangeEmail:function(newEmail){
      let userId = Meteor.userId();
      let user = Meteor.users.findOne({_id:userId});
      Accounts.removeEmail(userId, user.emails[0].address);
      Accounts.addEmail(userId, newEmail);
    }
  });
});
