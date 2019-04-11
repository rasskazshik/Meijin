import { Meteor } from 'meteor/meteor';
//работа с аккаунтами пользователей
import { Accounts } from 'meteor/accounts-base';
//smtp отправка сообщения
import { Email } from 'meteor/email'
//коллекция изображений сертификатов
import CertificatesImagesCollection from '../lib/collections/certificates/certificatesImages';
//коллекция описаний сертификатов связанных с изображениями
import CertificatesCollection from '../lib/collections/certificates/certificates';
//коллекция изображений услуг
import servicesImagesCollection from '../lib/collections/services/servicesImages';
//коллекция описаний услуг связанных с изображениями
import servicesCollection from '../lib/collections/services/services';

Meteor.startup(() => {

  //настраиваем переменную окружения на использование smtp от gmail для локального запуска
  //process.env.MAIL_URL = 'smtps://user:password@smtp.gmail.com:465';

  //определяем серверные функции для действий с коллекциями
  Meteor.methods({    

    //костыль - проверка доступности изображений услуг на сервере
    //filesId - массив идентификаторов файлов для проверки
    ServiceImagesOnTheServer:function(filesId){
      //флаг наличия всех файлов на сервере
      let allFilesOnTheServer = true;
      //пробег по массиву файлов
      for(let i=0;i<filesId.length;i++)
      {
        //если не лежит на сервере
        if(!servicesImagesCollection.findOne({_id:filesId[i]}).hasStored('servicesImages')){    
          //снимаем флаг наличия файлов
          allFilesOnTheServer = false;
          break;
        }
      }
      //возвращаем флаг наличия файлов на сервере
      return allFilesOnTheServer;
    },

    //костыль - проверка доступности изображения сертификата на сервере
    //filesId - идентификатор файла для проверки
    CertificateImageOnTheServer:function(fileId){
      //флаг наличия файла на сервере
      let fileOnTheServer = CertificatesImagesCollection.findOne({_id:fileId}).hasStored('certificatesImages');
      //возвращаем флаг наличия файлов на сервере
      return fileOnTheServer;
    },

    //добавление нового сертификата с описанием
    //sertificateDescription - описание сертификата 
    //imageURL - путь для доступа к файлу
    //imageId - идентификатор изображения сертификата
    InsertCertificate: function(certificateDescription,imageURL,imageId) { 
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //вычисляем позицию добавляемого сертификата путем подсчета имеющихся
      let position = CertificatesCollection.find({}).count();
      //пишем в связанную коллекцию
      CertificatesCollection.insert({description:certificateDescription ,imagesURL:imageURL, imageId:imageId, position:position});
    },

    //удаление изображения сертификата по id изображения  
    DeleteCertificateImageByImageId: function(certificateImageId){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      CertificatesImagesCollection.remove({_id:certificateImageId});
    },

    //удаление изображения сертификата по id сертификата  
    DeleteCertificateImageByCertificateId: function(certificateId){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //берем данные сертификата
      let certificate = CertificatesCollection.find({_id:certificateId});
      //удаляем
      CertificatesImagesCollection.remove({_id:certificate.imageId});
    },

    //удаление сертификата
    DeleteCertificate: function(certificateId) {
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //берем данные сертификата
      let certificate = CertificatesCollection.findOne({_id:certificateId});
      //чистим связанную коллекцию
      CertificatesImagesCollection.remove({_id:certificate.imageId});
      //запоминаем позицию удаляемого сертификата
      let position = certificate.position;
      //чистим коллекцию сертификата
      CertificatesCollection.remove({_id:certificateId},function(){
        //смещаем позицию всех, кто выше на 1 вниз (множественная обработка - опция мульти)
        CertificatesCollection.update({position:{$gt: position}},{$inc: {position: -1}},{ multi: true });
      })
    },

    //обновление информации о сертификате
    UpdateCertificate:function(certificateId,certificateDescription,certificateImage){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //если требуется обновление данных изображения
      if(certificateImage.length>0){

        //это полный неадекват, но все же... Я не нашел другого способа дождаться или просигналить  
        //о загрузке файла на сервер...
        //делаем таймер в полсекунды и опрашиваем файл о том как он устроился на сервере
        //когда сказал что примостился - пишем связанную коллекцию
        let imageWaiter = Meteor.setInterval(function(){
          if(CertificatesImagesCollection.findOne({_id:certificateImage[0].imageId}).hasStored('certificatesImages')){          
            Meteor.clearInterval(imageWaiter);
            let position = CertificatesCollection.findOne({_id:certificateId}).position;
            //полная замена данных
            CertificatesCollection.update({_id:certificateId},{description:certificateDescription, imagesURL:certificateImage[0].imageURL, imageId:certificateImage[0].imageId, position:position});
          }
        },500);
      }
      else{
        //частичная замена данных ({$set{}})
        CertificatesCollection.update({_id:certificateId},{$set:{description:certificateDescription}});
      }
    },

    //добавление услуги в коллекцию
    InsertService:function(serviceTitle, serviceDescription, servicePrice, serviceImages){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //вычисляем позицию добавляемой услуги путем подсчета имеющихся
      let position = servicesCollection.find({}).count();
      //пишем в связанную коллекцию
      servicesCollection.insert({title:serviceTitle ,description:serviceDescription, price:servicePrice, images:serviceImages, position:position});
    },

    //удаление услуги и связанных с ней изображений
    DeleteService:function(serviceId){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //ищем данные услуги
      let service = servicesCollection.findOne({_id:serviceId});
      //чистим коллекцию изображений
      service.images.forEach(function(image){
        servicesImagesCollection.remove({_id:image.imageId});
      });
      //запоминаем позицию удаляемой услуги
      let position = service.position;
      //удаляем услугу
      servicesCollection.remove({_id:serviceId},function(){
        //смещаем позицию всех, кто выше на 1 вниз (множественная обработка - опция мульти)
        servicesCollection.update({position:{$gt: position}},{$inc: {position: -1}},{ multi: true });
      });
    },

    //удаление изображения услуги (по id изображения)
    RemoveServiceImage:function(imageId){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      servicesImagesCollection.remove({_id:imageId});
    },

    //удаление всех изображений услуги (по id услуги)
    RemoveServiceImages:function(serviceId){
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
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
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      if(serviceImages.length>0){
        //это полный неадекват, но все же... Я не нашел другого способа дождаться или просигналить  
        //о загрузке файла на сервер...
        //делаем таймер в полсекунды и опрашиваем каждый файл о том как он устроился на сервере
        //когда все сказали что примостились - пишем связанную коллекцию
        let imageWaiter = Meteor.setInterval(function(){
          //флаг готовности файлов
          let ready = true;
          //пробег по списку
          for(let i=0;i<serviceImages.length; i++){  
            //если не готов
            if(!servicesImagesCollection.findOne({_id:serviceImages[i].imageId}).hasStored('servicesImages'))
            {
              //сбрасываем флаг готовности
              ready=false;
              break;
            }
          }
          //если все готовы
          if(ready){
            //гасим таймер
            Meteor.clearInterval(imageWaiter);
            //сохраняем позицию
            let position = servicesCollection.findOne({_id:serviceId}).position;
            //полная замена данных
            servicesCollection.update({_id:serviceId},{title:title ,description:description, price:price, images:serviceImages, position:position});
          }
        },500);
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

    //получение электронной почты пользователя
    GetUserEmail:function(){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      let user=Meteor.users.findOne({_id:Meteor.userId()});
      return user.emails[0].address;
    },

    //обновление данных пользователя
    ChangeEmail:function(newEmail){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //заменяем данные почты
      let userId = Meteor.userId();
      let user = Meteor.users.findOne({_id:userId});
      //удаляем почту
      Accounts.removeEmail(userId, user.emails[0].address);
      //добавляем почту
      Accounts.addEmail(userId, newEmail);
    },

    //отправка сообшения через форму обратной связи
    SendEmail:function(message){ 
      //ловим ошибки smtp и пробрасываем их клиенту сконвертировав в ошибку метеора
      //эта зараза сообщает о не настроенном MAIL_URL лишь в стандартном выводе - хрен поймаешь
      //обязательно тестируй после деплоя глядя в терминал
      try{
        Email.send({ to:'rasskazshik@gmail.com', from:'studpostsmtp@gmail.com', subject:'Сообщение с сайта', text:message });
      }
      catch(error){
        throw new Meteor.Error(error.responseCode,error.message);
      }
    },

    //смещение вверх по списку сертификатов
    CertificateUp:function(id){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //получаем данные сертификата
      let target = CertificatesCollection.findOne({_id:id});
      let targetPosition = target.position;
      //если и так верхний - тихо закончим на этом
      if(targetPosition===CertificatesCollection.find({}).count()-1){
        return;
      }      
      let nextPosition = targetPosition+1;
      let next = CertificatesCollection.findOne({position:nextPosition});
      //частичная замена данных ({$set{}})
      CertificatesCollection.update({_id:target._id},{$set:{position:next.position}});
      CertificatesCollection.update({_id:next._id},{$set:{position:targetPosition}});
    },

    //смещение вниз по списку сертификатов
    CertificateDown:function(id){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //получение данных сертификата
      let target = CertificatesCollection.findOne({_id:id});
      let targetPosition = target.position;
      //если и так нижний - тихо закончим на этом
      if(targetPosition===0){
        return;
      }      
      let prev = CertificatesCollection.findOne({position:targetPosition-1});
      //частичная замена данных ({$set{}})
      CertificatesCollection.update({_id:target._id},{$set:{position:prev.position}});
      CertificatesCollection.update({_id:prev._id},{$set:{position:targetPosition}});
    },

    //смещение вверх по списку услуг
    ServiceUp:function(id){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //получение данных услуги
      let target = servicesCollection.findOne({_id:id});
      let targetPosition = target.position;
      //если и так верхний - тихо закончим на этом
      if(targetPosition===servicesCollection.find({}).count()-1){
        return;
      }      
      let nextPosition = targetPosition+1;
      let next = servicesCollection.findOne({position:nextPosition});
      //частичная замена данных ({$set{}})
      servicesCollection.update({_id:target._id},{$set:{position:next.position}});
      servicesCollection.update({_id:next._id},{$set:{position:targetPosition}});
    },

    //смещение вниз по списку услуг
    ServiceDown:function(id){
      //проверяем право выполнения
      if(Meteor.userId()===null){
        throw new Meteor.Error(403,'Выполнение метода в обход процедуры авторизации','Метод был вызван без данных авторизованного пользователя');
      }
      //получение данных услуги
      let target = servicesCollection.findOne({_id:id});
      let targetPosition = target.position;
      //если и так нижний - тихо закончим на этом
      if(targetPosition===0){
        return;
      }      
      let prev = servicesCollection.findOne({position:targetPosition-1});
      //частичная замена данных ({$set{}})
      servicesCollection.update({_id:target._id},{$set:{position:prev.position}});
      servicesCollection.update({_id:prev._id},{$set:{position:targetPosition}});
    }
  });
});
