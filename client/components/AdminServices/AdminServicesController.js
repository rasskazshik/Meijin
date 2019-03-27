import React,{Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import AdminServicesView from './AdminServicesView'
import servicesCollection from '../../../lib/collections/services/services';


class AdminServicesController extends Component{
    constructor(props){
        super(props);

        this.DeleteService=this.DeleteService.bind(this);
        this.UpdateService=this.UpdateService.bind(this);
    }

    //удаление услуги и связанных с ней изображений
    DeleteService(serviceId){
        Meteor.call('DeleteService',serviceId);
    }

    UpdateService(serviceId,title, description, price, images){
        //формируем массив путей изображений связанных с услугой
        //в случае отсутствия новых - передаем пустой, серверный метод разберется сам что с ним делать
        let serviceImages = [];       
        //если есть новые изображения
        if(images.length>0){
            //чистим старые изображения
            //для полной уверенности в очистке связанной коллекции до изменения данных
            //запуск обновления осуществляю в обратном вызове
            Meteor.call("RemoveServiceImages",serviceId,function(){
                //запись в коллекцию асинхронна, поэтому у меня не успевал формироваться список путей к изображениям до записи
                //чтобы пофиксить - наркоманим с циклом и функцией обратного вызова
                //перебираем все файлы            
                for(let i=0;i<images.length;i++) {
                    //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
                    //осуществляем запись в коллекцию файлов
                    servicesImagesCollection.insert(images[i], function (err, fileObj) {
                        if (err){
                            console.log("Нашкобнулась загрузка файла: "+error);
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
                                //осуществляем вызов "доверенного и безопасного" серверного метода для работы с коллекцией
                                Meteor.call("UpdateServiceData",serviceId,title, description, price, serviceImages,function(err,responce){
                                    if(err){
                                        //удаляем связанные файлы
                                        serviceImages.forEach(function(item) {
                                            Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                                if (error){
                                                    console.log("Нашкобнулось сервисное удаление файла: "+error);
                                                }
                                            });
                                        });
                                    }
                                });
                            }            
                        }
                    });
                };
            });
        }
        else{
            //осуществляем вызов "доверенного и безопасного" серверного метода для работы с коллекцией
            Meteor.call("UpdateServiceData",serviceId,title, description, price, serviceImages,function(err,responce){
                if(err){
                    return false;
                }
                else{
                    return responce;
                }
            });
        }

    }

    render(){
        return(<AdminServicesView services={this.props.services} DeleteService={this.DeleteService} UpdateService={this.UpdateService}/>);
    }
}


export default withTracker((props) => {
    Meteor.subscribe('services');
    return {
        services: servicesCollection.find({},{images:0}).fetch()
    };
})(AdminServicesController);