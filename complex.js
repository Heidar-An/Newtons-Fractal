class Complex{
  constructor(real, imaginary){
    this.real = real;
    this.imaginary = imaginary;
  }
  
  multiply(complexTwo){
    let realOutput = (this.real * complexTwo.real) - (this.imaginary * complexTwo.imaginary);
    let imagOutput = (complexTwo.imaginary * this.real) + (this.imaginary * complexTwo.real);
    return new Complex(realOutput, imagOutput);
  }
  
  divide(complexTwo){
    let c = this.multiply(new Complex(complexTwo.real, -complexTwo.imaginary));
    let d = pow(complexTwo.real, 2) + pow(complexTwo.imaginary, 2);
    return (new Complex(c.real / d, c.imaginary / d));
  }
  
  add(complexTwo){
    return new Complex(this.real + complexTwo.real, this.imaginary + complexTwo.imaginary);
  }
  
  subtract(complexTwo){
    return new Complex(this.real - complexTwo.real, this.imaginary - complexTwo.imaginary);
  }
  
  multiplyByReal(constant){
    return new Complex(this.real * constant, this.imaginary * constant);
  }
  
  calculateDistance(complexTwo)
  { 
     return sqrt(pow(this.real - complexTwo.real, 2) + pow(this.imaginary - complexTwo.imaginary, 2)); 
  }
  
  
}