import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
    ServiceConfiguration.configurations.remove({
        service: "facebook"
    });
    
    ServiceConfiguration.configurations.insert({
        service: "facebook",
        appId: Meteor.settings.facebook.appId,
        secret: Meteor.settings.facebook.secret
    });
})