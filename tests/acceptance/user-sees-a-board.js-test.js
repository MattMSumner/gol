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

test('visiting / the user sees a game board and can change the width and height', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(gameBoardRows(), 10, 'there should be 10 rows');
    assert.equal(gameBoardCells(), 100, 'there should be 100 cells');
  });

  fillIn('#board-width', '20');
  fillIn('#board-height', '30');

  andThen(function() {
    assert.equal(gameBoardRows(), 30, 'there should be 30 rows');
    assert.equal(gameBoardCells(), 600, 'there should be 600 cells');
  });
});

function gameBoardRows() {
  return find('.row').length;
}

function gameBoardCells() {
  return find('.cell').length;
}
