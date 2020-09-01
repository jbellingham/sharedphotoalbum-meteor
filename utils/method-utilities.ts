import { Promise } from 'meteor/promise';

export const callWithPromise = (method, ...args: any[]) => {
    return new Promise((resolve, reject) => {
        Meteor.call(method, ...args, (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
}