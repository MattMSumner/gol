import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Object.extend({
  alive: false,
  neighbours: [],

  @computed('neighbours.@each.alive')
  aliveNeighboursCount(neighbours) {
    return neighbours.filter(neighbour => neighbour.alive).get('length');
  },

  @computed('alive', 'aliveNeighboursCount')
  nextState(alive, aliveNeighboursCount) {
    return (alive && aliveNeighboursCount === 2) ||
      (aliveNeighboursCount === 3)
  },

  step() {
    const nextState = this.get('nextState');

    Ember.run.schedule('sync', () => {
      this.set('alive', nextState);
    });
  },
});
