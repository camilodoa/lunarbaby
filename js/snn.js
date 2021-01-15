/*
camilo ortiz, 2021, camilodoa.ml
feed forward artificial neural network
dependencies:
math.js
*/
// Loop over all neurons connections and direct out voltage into post synaptic
// in methods

var snn = class {
  constructor(n) {
    // Create nxn adjacency matrix
    this.connectome = []
    // Create size n neuron list
    this.neurons = []
    // There will be a loss for each connection
    this.error = []
    // This can be combined into an overall loss
    this.loss = []
  }
  react = function(state) {
    // Given an observation return a dictionary of triggered motor neurons
    stimulated = this.see(state)
    for (const key in stimulated) {
      // Feed the cell the input voltage v
      stimulated[key].cell.in(stimulated[key].v)
    }
    // After stimulating the sensory neurons, check for other activations in
    // the connectome

    // Loop through every neuron connection and feed the presynaptic neuron's
    // out() method (multiplied by connection weight) into the postsynaptic's
    // in() method
    for (i = 0 ; i < this.connectome.length; i ++) {
      for (j = 0 ; j < this.connectome.length; j ++) {
        if (i != j) {
          this.neurons[j].in(this.neurons[i].out() * this.connectome[i][j])
        }
      }
    }

    // Assemble dictionary of motor neurons
    motor = {};

    for (neuron in this.neurons) {
      neuron.step();
    }

    return motor;
  }
  see = function(state){
    // For a given state, calculate which neurons will be activated and group
    // them into a dictionary
  }

}
