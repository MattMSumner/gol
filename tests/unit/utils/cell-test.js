import Cell from '../../../utils/cell';
import { module, test } from 'qunit';

module('Unit | Utility | cell');

test('it works', function(assert) {
  const cell = Cell.create({alive: true});
  assert.ok(cell.get('alive'));
});

test('an alive cell with less then 2 neighbours dies', function(assert) {
  const cellWithNoLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });
  const cellWithOneLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: true},  {alive: false}, {alive: false}, {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });

  Ember.run(function() {
    cellWithNoLivingNeighbours.step();
    cellWithOneLivingNeighbours.step();
  });

  assert.ok(!cellWithNoLivingNeighbours.get('alive'));
  assert.ok(!cellWithOneLivingNeighbours.get('alive'));
});

test('an alive cell with 2 or 3 neighbours stays alive', function(assert) {
  const cellWithTwoLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: true},  {alive: true},  {alive: false}, {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });
  const cellWithThreeLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: true},  {alive: true},  {alive: true},  {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });

  Ember.run(function() {
    cellWithTwoLivingNeighbours.step();
    cellWithThreeLivingNeighbours.step();
  });

  assert.ok(cellWithTwoLivingNeighbours.get('alive'));
  assert.ok(cellWithThreeLivingNeighbours.get('alive'));
});

test('an alive cell with 4 or more neighbours dies', function(assert) {
  const cellWithFourLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: true},  {alive: true},  {alive: true},  {alive: true},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });
  const cellWithEightLivingNeighbours = Cell.create({
    alive: true,
    neighbours: [
      {alive: true}, {alive: true}, {alive: true}, {alive: true},
      {alive: true}, {alive: true}, {alive: true}, {alive: true},
    ],
  });

  Ember.run(function() {
    cellWithFourLivingNeighbours.step();
    cellWithEightLivingNeighbours.step();
  });

  assert.ok(!cellWithFourLivingNeighbours.get('alive'));
  assert.ok(!cellWithEightLivingNeighbours.get('alive'));
});

test('a dead cell with 3 live neighbours becomes alive', function(assert) {
  const cellWithTwoLivingNeighbours = Cell.create({
    alive: false,
    neighbours: [
      {alive: true},  {alive: true},  {alive: false}, {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });
  const cellWithThreeLivingNeighbours = Cell.create({
    alive: false,
    neighbours: [
      {alive: true},  {alive: true},  {alive: true},  {alive: false},
      {alive: false}, {alive: false}, {alive: false}, {alive: false},
    ],
  });

  Ember.run(function() {
    cellWithTwoLivingNeighbours.step();
    cellWithThreeLivingNeighbours.step();
  });

  assert.ok(!cellWithTwoLivingNeighbours.get('alive'));
  assert.ok(cellWithThreeLivingNeighbours.get('alive'));
});
