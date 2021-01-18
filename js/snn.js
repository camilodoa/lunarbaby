/*
camilo ortiz, 2021, camilodoa.ml
spiking artificial neural network
dependencies:
neuron.js
*/

var SNN = class {
  constructor(s, i, m) {
    this.s = s; // Number of sensory neurons
    this.i = i; // Number of interneurons
    this.m = m; // Number motor neurons
    this.n = s + i + m // Total number of neurons
    // Create nxn adjacency matrix (random init)
    this.connectome = math.matrix();
    this.connectome.resize([this.n, this.n])
    // Create size n neuron list
    this.neurons = [];
    for (let i = 0; i < this.n; i ++) this.neurons.push(new Neuron());
    // Loss history
    this.loss = []
  }
  step = function(state, output) {
    // One time step
    // Given a state and a loss, The return a dictionary of triggered motor neurons

    // Observation must depend on number of sensory neurons
    observation = this.see(state, this.s)
    for (let i = 0; i < this.s; i ++) {
      // Feed the cell the respective input voltage v
      this.neurons[i].in(observation[i].v)
    }
    // After stimulating the sensory neurons, check for other activations in
    // the connectome

    // Loop through every neuron connection and feed the presynaptic neuron's
    // out() method (multiplied by connection weight) into the postsynaptic's
    // in() method
    for (i = 0 ; i < this.connectome.length; i ++) {
      for (j = 0 ; j < this.connectome.length; j ++) {
        if (i !== j) {
          this.neurons[j].in(this.neurons[i].out() * this.connectome[i][j])
        }
      }
    }

    activations = []
    // Assemble output of motor neurons
    for (let j = this.s + this.i; j < this.neurons.length; j ++) {
      activations.push(this.neurons[j].out());
    }

    // TODO
    // Loop through every neuron connection and update the weight based on local
    // info
    // Compute output error -> you need to define what this is
    const eL = activations - output


    // Proceed to the next time step
    for (neuron in this.neurons) {
      neuron.step();
    }
    return activations;
  }
  see = function(state){
    // TODO
    // For a given state, calculate which neurons will be activated and group
    // them into a dictionary
  }

  save = function(){
    // TODO
    // Saves the connectome
  }
}
