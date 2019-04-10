import {Mongo} from 'meteor/mongo';

//структура {description ,imagesURL, imageId, position}
export default CertificatesCollection = new Mongo.Collection('certificates');

//разрешения и публикация
if(Meteor.isServer)
{
    //запрещаем любой доступ извне
    CertificatesCollection.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });

    //публикация коллекции
    Meteor.publish('certificates', function(){
        return CertificatesCollection.find();
    });
}