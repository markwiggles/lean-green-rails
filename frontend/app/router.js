import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index',{path:'/'});
  this.route('why');
  this.route('training');
  this.route('vegucated');
  this.route('team');
});

export default Router;
