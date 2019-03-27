import {Mongo} from 'meteor/mongo';

//структура {description ,imagesURL, imageId}
export default servicesCollection = new Mongo.Collection('services');

if(Meteor.isServer)
{
    servicesCollection.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });

    Meteor.publish('services', function(){
         return servicesCollection.find();
        });
}