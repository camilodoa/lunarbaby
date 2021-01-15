/*
camilo ortiz, 2021, camilodoa.ml
lif neuron
*/

var Neuron = class {
  constructor(v = 0, threshold = 25, spike = 4, rest = 0, input = 0, min = -1,
    refactory = 5, leak = 0.25, counter = 5) {
    // Voltage spike parameters
    this.v = v; // current voltage
    this.threshold = threshold; // votlage threshold
    this.spike = spike; // spike voltage
    this.rest = rest; // resting voltage
    this.input = input; // input voltage of the cell
    this.min = -1; // minimum voltage the cell can have
    // Refactory parameters
    this.refactory = refactory; // refactory period max
    this.leak = leak; // voltage leak
    this.counter = counter; // refactory period counter
  }
  in = function(voltage) {
    // If cell is in the refactory period, do nothing
    // Otherwise integrate
    this.input += this.counter < this.refactory ? 0 : voltage;
    return this.input;
  }
  out = function() {
    return this.v > this.threshold ? this.spike : 0;
  }
  step = function() {
    if (this.v > this.threshold) {
      this.v = this.rest;
      this.counter = 0;
      return 0;
    } else if (this.counter < this.refactory) {
      this.counter ++;
      return 0
    }
    this.v = this.input;
    this.input = 0;
    return this.v
  }
}
