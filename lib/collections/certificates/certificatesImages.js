import { Meteor } from 'meteor/meteor';
import { FS } from 'meteor/cfs:base-package';
import {GridFS} from 'meteor/cfs:gridfs';

//хранилище GridFS
certificatesImagesStore = new FS.Store.GridFS('certificatesImages');

//коллекция изображений
export default CertificatesImagesCollection = new FS.Collection('certificatesImages', {
  stores: [certificatesImagesStore]
});

if(Meteor.isServer)
{
    //набор разрешений для загрузки и показа файлов
    //загрузка файла на стороне клиента, поэтому разрешаем все на свете...
    CertificatesImagesCollection.allow({
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
    Meteor.publish('certificatesImages', function(){
      return CertificatesImagesCollection.find();
    });
}