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

function renderedBoard(dom) {
  return dom.$('.row').map(function(index, row) {
    return [$(row).find('.cell').map(function(index, cell) {
      return $(cell).hasClass('alive');
    }).toArray()];
  }).toArray();
}
