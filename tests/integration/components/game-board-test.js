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
