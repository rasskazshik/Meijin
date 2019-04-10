import { Meteor } from 'meteor/meteor';
import { FS } from 'meteor/cfs:base-package';
import {GridFS} from 'meteor/cfs:gridfs';

//хранилище GridFS
servicesImagesStore = new FS.Store.GridFS('servicesImages');

//коллекция изображений
export default servicesImagesCollection = new FS.Collection('servicesImages', {
    stores: [servicesImagesStore]
    });

if(Meteor.isServer)
{
    //набор разрешений для загрузки и показа файлов
    //загрузка файла на стороне клиента, поэтому разрешаем все на свете...
    servicesImagesCollection.allow({
        'insert': function () {
          return true;
        },
        'update': function () {
          return true;
        },
        'remove': function () {
          return true;
        },
        'download':function(){
          return true;
        }
      });

    //публикация коллекции
    Meteor.publish('servicesImages', function(){
      return servicesImagesCollection.find();
    });
}