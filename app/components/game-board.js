import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  height: 0,
  width: 0,

  @computed('height', 'width')
  board(height, width) {
    return generateBoard(width, height);
  },
});

function generateBoard(width, height) {
  const board = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      row.pushObject({});
    }
    board.pushObject(row);
  }

  return board;
}
