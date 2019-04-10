import {Mongo} from 'meteor/mongo';

//структура {description ,imagesURL, imageId}
export default servicesCollection = new Mongo.Collection('services');

//набор разрешений и публикация
if(Meteor.isServer)
{
    //запрещаем все
    servicesCollection.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });

    //публикуем коллекцию
    Meteor.publish('services', function(){
        return servicesCollection.find();
    });
}