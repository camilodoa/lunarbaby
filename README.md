# [Lunarbaby](https://camilodoa.ml/lunarbaby)

![image](img/image.png)

SNN-controlled reinforcement learning agent in the browser.

Training follows the mathematical approximation of Spiking Time Dependent Plasticity (STDP) as defined [in this paper](https://www.frontiersin.org/articles/10.3389/fnbot.2018.00056/full).

A+ and A- are learning rates, t- and t+ are time constants, and ∆ti is the delay time from the presynaptic spike to the postsynaptic spike. In the paper, these are defined as follows:

- A+ = 0.925
- A- = 0.9
- t- = t+ = 20

in the equation
```javascript
∆wj = ∆ti < 0 ? A+ * exp(∆ti / t+) : - A- * exp(-∆ti / t-)
```
