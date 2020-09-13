import { Meteor } from 'meteor/meteor'
import { Cloudinary } from 'meteor/socialize:cloudinary'

Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({
        service: 'facebook',
    })

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: Meteor.settings.facebook.appId,
        secret: Meteor.settings.facebook.secret,
    })

    Cloudinary.config({
        cloud_name: Meteor.settings.public.cloudinary.cloudName,
        api_key: Meteor.settings.cloudinary.apiKey,
        api_secret: Meteor.settings.cloudinary.apiSecret,
    })
})
