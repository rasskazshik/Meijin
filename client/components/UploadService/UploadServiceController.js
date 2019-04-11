import React,{Component} from 'react';
//коллекция изображений услуг
import servicesImagesCollection from '../../../lib/collections/services/servicesImages';
//компонент представления загрузки услуги
import UploadServiceView from './UploadServiceView';

export default class UploadServicesController extends Component{
    constructor(props){
        super(props);

        this.InsertService = this.InsertService.bind(this);
    }

    //добавление новой услуги
    //serviceTitle - наименование услуги
    //serviceDescription - текст описания услуги
    //servicePrice - текст примерной стоимости услуги    
    //files - объект input file (массив файлов)
    InsertService(serviceTitle, serviceDescription, servicePrice, files, callback){
        //массив путей изображений связанных с услугой
        let serviceImages = [];
        //если изображений к услуге не имеется
        if(files.length<1){
            //осуществляем вызов "доверенного и безопасного" серверного метода для работы с коллекцией
            Meteor.call("InsertService",serviceTitle, serviceDescription, servicePrice, serviceImages,function(error) {
                if (error){
                    console.log("Нашкобнулась запись в коллекцию: "+error);
                    callback(error);
                }
                else {
                    console.log("Данные успешно добавлены в коллекции");
                    callback();
                }              
            });
        }
      
        //запись в коллекцию асинхронна, поэтому у меня не успевал формироваться список путей к изображениям до записи
        //чтобы пофиксить - наркоманим с циклом (счетчиком изображений) и функцией обратного вызова
        //перебираем все файлы
        for(let i=0;i<files.length;i++) {
            //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
            //осуществляем запись в коллекцию файлов
            servicesImagesCollection.insert(files[i], function (error, fileObj) {
                if (error){
                    console.log("Нашкобнулась загрузка файла: "+error);
                    //удаляем уже загруженные файлы
                    serviceImages.forEach(function(item) {
                        Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                            if (error){
                                console.log("Нашкобнулось сервисное удаление файла: "+error);
                                callback(error);
                            }
                        });
                    });
                    callback(error);
                } 
                else {
                    //путь по умолчанию складывается из перфикса "/cfs/files", имени коллекции и идентификатора
                    let imageItem = {};
                    imageItem.imageURL = '/cfs/files/servicesImages/' + fileObj._id;
                    imageItem.imageId = fileObj._id;;
                    //добавляем в массив путей
                    serviceImages.push(imageItem);  
                    //если все файлы переданы в коллекцию
                    if(i===files.length-1)  {
                        //далее - наркомания с опросом состояния загрузки файла на сервере...
                        //это полный неадекват, но все же... Я не нашел другого способа дождаться или просигналить  
                        //о загрузке файла на сервер...
                        //делаем таймер в полсекунды и опрашиваем файл о том как он устроился на сервере
                        //когда сказал что примостился - пишем связанную коллекцию
                        //формируем массив идентификаторов файлов (метод унифицирован для услуг и сертификатов)
                        let filesId = [];
                        for(let j=0;j<serviceImages.length;j++){
                            filesId.push(serviceImages[j].imageId);
                        }
                        let imageWaiter = Meteor.setInterval(function(){
                            //передаем серверу массив файлов для проверки наличия
                            Meteor.call('ServiceImagesOnTheServer',filesId,function(error,responce){
                                if (error){
                                    //гасим таймер      
                                    Meteor.clearInterval(imageWaiter);
                                    //удаляем связанные файлы
                                    serviceImages.forEach(function(item) {
                                        Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                            if (error){
                                                console.log("Нашкобнулось сервисное удаление файла: "+error);
                                                callback(error);
                                            }
                                        });
                                    });
                                    callback(error);
                                }
                                else {                                     
                                    //если весь массив файлов лежит на сервере - пишем коллекцию
                                    if(responce){    
                                        //гасим таймер      
                                        Meteor.clearInterval(imageWaiter);
                                        //пишем в связанную коллекцию
                                        //осуществляем вызов серверного метода для работы с коллекцией
                                        Meteor.call("InsertService",serviceTitle, serviceDescription, servicePrice, serviceImages,function(error) {
                                            if (error){
                                                //удаляем связанные файлы
                                                serviceImages.forEach(function(item) {
                                                    Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                                        if (error){
                                                            console.log("Нашкобнулось сервисное удаление файла: "+error);
                                                            callback(error);
                                                        }
                                                    });
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
                }
            });
        };
    }

    render(){
        return (<UploadServiceView InsertService={this.InsertService}/>);
    }
}

