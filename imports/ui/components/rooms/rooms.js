import { Rooms } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import './rooms.html';

Template.rooms.onCreated(function () {
  Meteor.subscribe('rooms.all');
});

Template.rooms.helpers({
  rooms() {
    return Rooms.find({});
  },
});

Template.rooms.events({
  'submit .rooms-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;

    Meteor.call('rooms.insert', title.value,  (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
      }
    });
  },
  'click .room-delete'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;

    console.log(this._id);
    Meteor.call('rooms.remove', this._id,  (error) => {
      if (error) {
        alert(error.error);
      } 
    });
  },
});
