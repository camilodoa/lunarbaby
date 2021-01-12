/*
camilo ortiz, 2021, camilodoa.ml
lif neuron
*/

var neuron = class {
  constructor() {
    this.rest = 0;
    this.min = -1;
    this.threshold = 25; // votlage threshold
    this.leak = 0.25; // voltage leak
    this.spike = 4; // spike voltage
    this.v = 0; // current voltage
    this.refactory = 5; // refactory period max
    this.counter = 6; // refactory period counter
  }
  step(in) {
    // First case, the neuron just spiked and is in
    // a refactory state
    if (this.counter <= this.refactory) {
      this.v = this.rest;
      this.counter++;
    }
    // Second case, the neuron is doing its regular thing
    // and it isn't in a refactory period
    else {
      // if the neuron is above the minimum voltage
      if (this.v > this.min) {
        // perfom integration of inputs
        this.v = this.v + in - this.leak;
        // otherwise, set internal counters back to minimum
      } else {
        this.v = 0;
        this.counter = 0;
      }
    }
    // Now check for spike
    if (this.v >= this.threshold) {
      this.v = this.spike;
      this.counter = 0;
    }
  }
}
