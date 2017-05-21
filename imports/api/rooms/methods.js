// Methods related to rooms

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Rooms } from './rooms.js';

Meteor.methods({
  'rooms.insert'(title) {
    check(title, String);

    return Rooms.insert({
      title,
      createdAt: new Date(),
    });
  },
  'rooms.remove'(roomId) {
    check(roomId, String);
    return Rooms.remove(roomId);
  },
  'rooms.updateDataUrl'(roomId, dataUrl){
    if(dataUrl){
      // check(dataUrl, String);
      check(roomId, String);

       Rooms.update(roomId, {$set: {
        dataUrl,
        updatedAt: new Date()
        }
      });
    }
  },
});
