import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Cell from 'gol/utils/cell';

export default Ember.Component.extend({
  height: 0,
  width: 0,
  initialState: null,

  @computed('height', 'width', 'initialState')
  board(height, width, initialState) {
    return generateBoard(width, height, initialState);
  },
});

function generateBoard(width, height, initialState) {
  const board = [];
  for (let i = 0; i < height; i++) {
    const row = [];
    for (let j = 0; j < width; j++) {
      let alive;

      if ([true, false].contains(initialState && initialState[i] && initialState[i][j])) {
        alive = initialState[i][j];
      } else {
        alive = Math.random() > 0.8;
      }

      const cell = Cell.create({alive});
      row.pushObject(cell);
    }
    board.pushObject(row);
  }

  return board;
}
