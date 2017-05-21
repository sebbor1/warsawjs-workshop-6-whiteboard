// All rooms-related publications

import { Meteor } from 'meteor/meteor';
import { Rooms } from '../rooms.js';

Meteor.publish('rooms.all', function () {
  return Rooms.find();
});

Meteor.publish('rooms.show', function (roomId) {
  return Rooms.find({_id: roomId});
});
