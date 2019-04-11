import React,{Component} from 'react';
//обертка данными
import { withTracker } from 'meteor/react-meteor-data';
//компонент представления админки учетных данных пользователя
import AdminServicesView from './AdminServicesView'
//коллекция услуг
import servicesCollection from '../../../lib/collections/services/services';


class AdminServicesController extends Component{
    constructor(props){
        super(props);

        this.DeleteService=this.DeleteService.bind(this);
        this.UpdateService=this.UpdateService.bind(this);
        this.ServiceUp=this.ServiceUp.bind(this);
        this.ServiceDown=this.ServiceDown.bind(this);
    }

    //удаление услуги и связанных с ней изображений
    DeleteService(serviceId){
        Meteor.call('DeleteService',serviceId);
    }

    //обновление данных услуги    
    //callback - проброс функции представления, для сигнала о завершении операции
    UpdateService(serviceId,title, description, price, images,callback){
        //формируем массив путей изображений связанных с услугой
        //в случае отсутствия новых - передаем пустой, серверный метод разберется сам что с ним делать
        let serviceImages = [];       
        //если есть новые изображения
        if(images.length>0){
            //чистим старые изображения
            //для полной уверенности в очистке связанной коллекции до изменения данных
            //запуск обновления осуществляю в обратном вызове
            Meteor.call("RemoveServiceImages",serviceId,function(error){
                if(error){
                    callback(error);
                }
                else{
                    //запись в коллекцию асинхронна, поэтому у меня не успевал формироваться список путей к изображениям до записи
                    //чтобы пофиксить - наркоманим с циклом и функцией обратного вызова
                    //перебираем все файлы            
                    for(let i=0;i<images.length;i++) {
                        //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
                        //осуществляем запись в коллекцию файлов
                        servicesImagesCollection.insert(images[i], function (error, fileObj) {
                            if (error){
                                //удаляем уже загруженные файлы
                                serviceImages.forEach(function(item) {
                                    Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                        if (error){
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
                                //если обработали последний файл 
                                if(i===images.length-1){

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
                                                    Meteor.call("UpdateServiceData",serviceId,title, description, price, serviceImages,function(error){
                                                        if(error){
                                                            //удаляем связанные файлы
                                                            serviceImages.forEach(function(item) {
                                                                Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                                                    if (error){
                                                                        callback(error);
                                                                    }
                                                                });
                                                            });
                                                            callback(error);
                                                        }
                                                        else{
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
            });
        }
        //если без изображений
        else{
            //осуществляем вызов серверного метода для работы с коллекцией
            Meteor.call("UpdateServiceData",serviceId,title, description, price, serviceImages,function(error,responce){
                if(error){
                    callback(error);
                }
                else{
                    callback();
                }
            });
        }

    }

    //поднятие объекта в списке
    //callback - проброс функции представления, для сигнала о завершении операции
    ServiceUp(serviceId,callback){
        Meteor.call('ServiceUp',serviceId,function(error){
            if (error){
                callback(error);
            } 
            else {
                callback();
            }
        });
    }

    //понижение объекта в списке
    //callback - проброс функции представления, для сигнала о завершении операции
    ServiceDown(serviceId,callback){
        Meteor.call('ServiceDown',serviceId,function(error){
            if (error){
                callback(error);
            } 
            else {
                callback();
            }
        });
    }

    //ренденр с пробросом данных услуг и методов
    render(){
        return(<AdminServicesView services={this.props.services} DeleteService={this.DeleteService} UpdateService={this.UpdateService} ServiceUp={this.ServiceUp} ServiceDown={this.ServiceDown}/>);
    }
}

//подписка на данные с сортировкой позиции
export default withTracker((props) => {
    Meteor.subscribe('services');
    return {
        services: servicesCollection.find({},{sort:{position: -1}}).fetch()
    };
})(AdminServicesController);