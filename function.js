class Function{
  constructor(coefficients){
    this.coefficients = coefficients;
    this.derivatives = [];
    for(let i = 1; i < this.coefficients.length; i++){
      this.derivatives[i - 1] = this.coefficients[i] * i;
    }
    // first element represents constant
  }
  
  evaluate(cInput){
    let pArray = [new Complex(1, 0)];
    
    for(let i = 1; i < this.coefficients.length; i++){
      pArray[i] = pArray[i - 1].multiply(cInput);
    }
    
    let complexOutput = new Complex(0, 0);
    for(let i = 0; i < this.coefficients.length; i++){
      complexOutput = complexOutput.add(pArray[i].multiplyByReal(this.coefficients[i]));
    }
    
    return complexOutput;
  }
  
  evaluateDerivative(cInput){
    let pArray = [new Complex(1, 0)];
    
    for(let i = 1; i < this.derivatives.length; i++){
      pArray[i] = pArray[i - 1].multiply(cInput);
    }
    
    let complexOutput = new Complex(0, 0);
    for(let i = 0; i < this.derivatives.length; i++){
      complexOutput = complexOutput.add(pArray[i].multiplyByReal(this.derivatives[i]));
    }
    
    return complexOutput;
  }
  
  
}