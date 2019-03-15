import { Meteor } from 'meteor/meteor';
import { FS } from 'meteor/cfs:base-package';
import {GridFS} from 'meteor/cfs:gridfs';

certificatesImagesStore = new FS.Store.GridFS('certificatesImages');

export default CertificatesImagesCollection = new FS.Collection('certificatesImages', {
    stores: [certificatesImagesStore]
    });

if(Meteor.isServer)
{
    //набор разрешений для загрузки и показа файлов
    CertificatesImagesCollection.allow({
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

    Meteor.publish('certificatesImages', function(){
         return CertificatesImagesCollection.find();
        });
}