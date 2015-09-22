import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('game-board', 'Integration | Component | game board', {
  integration: true
});

test('it shows a game board', function(assert) {
  assert.expect(2);

  this.set('width', 5);
  this.set('height', 5);

  this.render(hbs`{{game-board width=width height=height}}`);

  assert.equal(this.$('.row').length, 5, 'there should be 5 rows');
  assert.equal(this.$('.cell').length, 25, 'there should be 25 cells');
});

test('still life does not change', function(assert) {
  assert.expect(1);

  this.set('width', 4);
  this.set('height', 4);
  this.set('initialState', [
    [false, false, false, false],
    [false, true,  true,  false],
    [false, true,  true,  false],
    [false, false, false, false],
  ]);

  this.render(hbs`
    {{game-board width=width height=height initialState=initialState}}
  `);

  Ember.run(() => {
    this.$('[data-role="step-action"]').click();
  });

  assert.deepEqual(renderedBoard(this), this.get('initialState'), 'board should not change');
});

test('oscillators oscillate at the edges', function(assert) {
  assert.expect(2);

  this.set('width', 5);
  this.set('height', 5);
  this.set('initialState', [
    [false, false, false, false, true ],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, true ],
    [false, false, false, false, true ],
  ]);

  this.render(hbs`
    {{game-board width=width height=height initialState=initialState}}
  `);

  Ember.run(() => {
    this.$('[data-role="step-action"]').click();
  });

  const expectedState = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [true,  false, false, true,  true ],
  ];

  assert.deepEqual(renderedBoard(this), expectedState, 'board should have changed');

  Ember.run(() => {
    this.$('[data-role="step-action"]').click();
  });

  assert.deepEqual(renderedBoard(this), this.get('initialState'), 'board should have changed back');
});

test('play button continues to play the game and can pause', function(assert) {
  assert.expect(3);

  this.set('width', 17);
  this.set('height', 17);
  this.set('initialState', [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, true,  false, false, false, false, true,  false, true,  false, false, false, false, true,  false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ]);

  this.render(hbs`
    {{game-board width=width height=height initialState=initialState}}
  `);

  Ember.run(() => {
    this.$('[data-role="play-action"]').click();
  });

  const expectedState1 = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, true,  false, false, false, false, false, true,  false, false, false, false, false],
    [false, false, false, false, false, true,  false, false, false, false, false, true,  false, false, false, false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, true,  true,  true,  false, false, true,  true,  false, true,  true,  false, false, true,  true,  true , false],
    [false, false, false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, false, false],
    [false, true,  true,  true,  false, false, true,  true,  false, true,  true,  false, false, true,  true,  true , false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, false, false, false, true,  false, false, false, false, false, true,  false, false, false, false, false],
    [false, false, false, false, false, true,  false, false, false, false, false, true,  false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  ];

  assert.deepEqual(renderedBoard(this), expectedState1, 'board should have changed to the second state');

  Ember.run(() => {
    this.$('[data-role="play-action"]').click();
  });

  assert.deepEqual(renderedBoard(this), expectedState1, 'board should still be the second state');

  Ember.run(() => {
    this.$('[data-role="play-action"]').click();
  });

  const expectedState2 = [
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  true,  false, false, false, false, false, true,  true,  false, false, false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, true,  false, false, true,  false, true,  false, true,  false, true,  false, false, true,  false, false],
    [false, false, true,  true,  true,  false, true,  true,  false, true,  true,  false, true,  true,  true,  false, false],
    [false, false, false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, true,  true,  true,  false, false, false, true,  true,  true,  false, false, false, false],
    [false, false, false, true,  false, true,  false, true,  false, true,  false, true,  false, true,  false, false, false],
    [false, false, true,  true,  true,  false, true,  true,  false, true,  true,  false, true,  true,  true,  false, false],
    [false, false, true,  false, false, true,  false, true,  false, true,  false, true,  false, false, true,  false, false],
    [false, false, false, false, false, true,  true,  false, false, false, true,  true,  false, false, false, false, false],
    [false, false, false, false, true,  true,  false, false, false, false, false, true,  true,  false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
  ];

  assert.deepEqual(renderedBoard(this), expectedState2, 'board should have changed to the third state');

  Ember.run(() => {
    this.$('[data-role="play-action"]').click();
  });
});

function renderedBoard(dom) {
  return dom.$('.row').map(function(index, row) {
    return [$(row).find('.cell').map(function(index, cell) {
      return $(cell).hasClass('alive');
    }).toArray()];
  }).toArray();
}
