import Ember from 'ember';
import computed from 'ember-computed-decorators';
import Cell from 'gol/utils/cell';

export default Ember.Component.extend({
  height: 0,
  width: 0,
  initialState: null,

  @computed('height', 'width', 'initialState')
  board(height, width, initialState) {
    const board = generateBoard(width, height, initialState);

    registerNeighbours(board);

    return board;
  },

  actions: {
    step() {
      const board = this.get('board');

      board.forEach(function(row) {
        row.invoke('step');
      })
    },
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

function registerNeighbours(board) {
  return board.map((row, rowIndex, board) => {
    return row.map((cell, cellIndex) => {
      const left = wrapAround(cellIndex - 1, row.length);
      const right = wrapAround(cellIndex + 1, row.length);
      const up = wrapAround(rowIndex - 1, board.length);
      const down = wrapAround(rowIndex + 1, board.length);

      const neighbours = [
        board[up][left],
        board[up][cellIndex],
        board[up][right],
        board[rowIndex][left],
        board[rowIndex][right],
        board[down][left],
        board[down][cellIndex],
        board[down][right]
      ];

      cell.set('neighbours', neighbours);
      return cell;
    });
  });
}

function wrapAround(index, length) {
  if (index === -1) {
    return length - 1;
  } else if (index === length) {
    return 0;
  } else {
    return index;
  }
}
