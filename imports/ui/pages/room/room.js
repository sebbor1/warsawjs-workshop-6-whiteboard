import './room.html';
import './room.css';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Rooms } from '/imports/api/rooms/rooms.js';
import { Meteor } from 'meteor/meteor';
import { CanvasManager } from '/imports/utils/client/canvas_manager.js';

let init = false;
let canvas_manager = null;

Template.App_room.onCreated(function () {
    init = null;
  Meteor.subscribe('rooms.show', FlowRouter.getParam('id'));
});
Template.App_room.onRendered(function(){
  this.autorun(() => {
    if(!init){
        const canvas = $('#canvas')[0];
        const room = Rooms.findOne(FlowRouter.getParam('id'));
      if(room){
        canvas_manager = new CanvasManager(canvas, {
            instant: true,
            callback(){
                Meteor.call('rooms.updateDataUrl', room._id, canvas.toDataURL());
            }
        });
        canvas_manager.load(room.dataUrl);
        init = true;
       }
      }
    });
});

Template.App_room.helpers({
  room() {
    const room = Rooms.findOne(FlowRouter.getParam('id'));
    if(room && canvas_manager){
      if(room.dataUrl)  {
        canvas_manager.load(room.dataUrl);
      }else{
        canvas_manager.clear();
      }
    }
    return Rooms.findOne(FlowRouter.getParam('id'));
  },
})

Template.App_room.events({
  'click .color-selector .option': function (e) {
    e.preventDefault();
    if(canvas_manager){
      const color = $(e.currentTarget).data('color');
      canvas_manager.color = color;
    }
  },
  'change .size-selector input': function(e) {
    if(canvas_manager){
      const size = $(e.currentTarget).val();
      canvas_manager.size = size;
    }
  },
  'click .clear-all button': function (e) {
    if (confirm("Czy na pewno chcesz wszystko usunąć?")) {
        const room = Rooms.findOne(FlowRouter.getParam('id'));
        e.preventDefault();
        if(room && canvas_manager){
            canvas_manager.clear();
            Meteor.call('rooms.updateDataUrl', room._id, null);
        }
    }
  },
});