# Newtons-Fractal
A duo collaboration of Newton's Fractal created in p5.js. Inspired by the 3B1B video on the Fractal.
Works for n-degree polynomial, where n is any positive integer.
The program allows users to move roots around, by dragging them or setting them manually.

## What is the fractal? ##

The Newton-Raphson method is generally used for Real values to find roots of a polynomial. But, it can be extended to include the Complex plane - argand diagrams. The fractal works by applying the NR method, some chosen amount of times, then colouring it based on which root that it is closest to. 

## How did it work? ##
An augmentation of how Bezier curves work was used to uniquely decide what colour each root was. 
To find the equation of the polynomial, we used Vieta's addition formulae. For this, we had to make a subsetFinder function that calculated the combinations - not permutations. 
Then, we had to differentiate the polynomial.

Finally, the pixel values are changed colour of.

