import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gol/tests/helpers/start-app';

module('Acceptance | user sees a board.js', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting / the user sees a game board', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(gameBoardRows(), 10, 'there should be 10 rows');
    assert.equal(gameBoardCells(), 100, 'there should be 100 cells');
  });
});

function gameBoardRows() {
  return find('.row').length;
}

function gameBoardCells() {
  return find('.cell').length;
}
