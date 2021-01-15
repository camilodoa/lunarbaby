/*
camilo ortiz, 2021, camilodoa.ml
lif neuron
*/

var neuron = class {
  constructor(v = 0, threshold = 25, spike = 4, rest = 0, in = 0, min = -1,
    refactory = 5, leak = 0.25, counter = 5) {
    // Voltage spike parameters
    this.v = v; // current voltage
    this.threshold = threshold; // votlage threshold
    this.spike = spike; // spike voltage
    this.rest = rest; // resting voltage
    this.in = in; // input voltage of the cell
    this.min = -1; // minimum voltage the cell can have
    // Refactory parameters
    this.refactory = refactory; // refactory period max
    this.leak = leak; // voltage leak
    this.counter = counter; // refactory period counter
  }
  in(voltage) {
    // If cell is in the refactory period, do nothing
    // Otherwise integrate
    this.in += this.counter < this.refactory ? 0 : voltage;
    return this.in;
  }
  out() {
    return this.v > this.threshold ? this.spike : 0;
  }
  step() {
    if (this.v > this.threshold) {
      this.v = this.rest;
      this.counter = 0;
      return 0;
    } else if (this.counter < this.refactory) {
      this.counter ++;
      return 0
    }
    this.v = this.in;
    this.in = 0;
    return this.v
  }
  // step(in) {
  //   // First case, the neuron just spiked and is in
  //   // a refactory state
  //   if (this.counter <= this.refactory) {
  //     this.v = this.rest;
  //     this.counter++;
  //   }
  //   // Second case, the neuron is doing its regular thing
  //   // and it isn't in a refactory period
  //   else {
  //     // if the neuron is above the minimum voltage
  //     if (this.v > this.min) {
  //       // perfom integration of inputs
  //       this.v = this.v + in - this.leak;
  //       // otherwise, set internal counters back to minimum
  //     } else {
  //       this.v = 0;
  //       this.counter = 0;
  //     }
  //   }
  //   // Now check for spike
  //   if (this.v >= this.threshold) {
  //     this.v = this.spike;
  //     this.counter = 0;
  //   }
  // }
}

neuron = new neuron();
