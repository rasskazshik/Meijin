import {Mongo} from 'meteor/mongo';

//структура {description ,imagesURL, imageId}
export default CertificatesCollection = new Mongo.Collection('certificates');

if(Meteor.isServer)
{
    CertificatesCollection.deny({
        insert() { return true; },
        update() { return true; },
        remove() { return true; },
    });

    Meteor.publish('certificates', function(){
         return CertificatesCollection.find();
        });
}