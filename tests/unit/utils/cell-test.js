import Cell from '../../../utils/cell';
import { module, test } from 'qunit';

module('Unit | Utility | cell');

test('it works', function(assert) {
  const cell = Cell.create({alive: true});
  assert.ok(cell.get('alive'));
});
