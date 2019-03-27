import { Meteor } from 'meteor/meteor';
import { FS } from 'meteor/cfs:base-package';
import {GridFS} from 'meteor/cfs:gridfs';

servicesImagesStore = new FS.Store.GridFS('servicesImages');

export default servicesImagesCollection = new FS.Collection('servicesImages', {
    stores: [servicesImagesStore]
    });

if(Meteor.isServer)
{
    //набор разрешений для загрузки и показа файлов
    servicesImagesCollection.allow({
        'insert': function () {
          return true;
        },
        'update': function () {
          return true;
        },
        'download':function(){
          return true;
        }
      });

    Meteor.publish('servicesImages', function(){
         return servicesImagesCollection.find();
        });
}