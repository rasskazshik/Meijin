import React,{Component} from 'react';
import servicesImagesCollection from '../../../lib/collections/services/servicesImages';
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
    InsertService(serviceTitle, serviceDescription, servicePrice, files){
        //массив путей изображений связанных с услугой
        let serviceImages = [];
      
        //запись в коллекцию асинхронна, поэтому у меня не успевал формироваться список путей к изображениям до записи
        //чтобы пофиксить - наркоманим с циклом (счетчиком изображений) и функцией обратного вызова
        //перебираем все файлы
        for(let i=0;i<files.length;i++) {
            //доступ к файлу на стороне клиента (при таком подходе не могу сделать это в серверном методе)
            //осуществляем запись в коллекцию файлов
            servicesImagesCollection.insert(files[i], function (err, fileObj) {
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
                    if(i===files.length-1)  {
                        //осуществляем вызов "доверенного и безопасного" серверного метода для работы с коллекцией
                        Meteor.call("InsertService",serviceTitle, serviceDescription, servicePrice, serviceImages,function(error,responce) {
                            if (error){
                                console.log("Нашкобнулась запись в коллекцию: "+error);
                                //удаляем связанные файлы
                                serviceImages.forEach(function(item) {
                                    Meteor.call("RemoveServiceImage",item["imageId"],function(error) {
                                        if (error){
                                            console.log("Нашкобнулось сервисное удаление файла: "+error);
                                        }
                                    });
                                });
                            }
                            else {
                                console.log("Данные успешно добавлены в коллекции");
                            }              
                        });
                    }            
                }
            });
        };
    }

    render(){
        return (<UploadServiceView InsertService={this.InsertService}/>);
    }
}

