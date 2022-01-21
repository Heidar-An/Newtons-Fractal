let screenSize = 800;
let roots = []; 

let dragged = false; 
let BeingDraggedIndex = -1; 
let offsetX = 0; 
let offsetY = 0; 


function setup() {
  createCanvas(screenSize, screenSize);
  noStroke(); 
  loadPixels();

 roots.push(...[new Complex(-100, -200 * pow(3, 0.5) * 0.5), new Complex(-100, 200 * pow(3, 0.5) * 0.5), new Complex(200, 0)])
  
  let polynomial = polynomialFinder(roots);
  for(let r = -(screenSize / 2); r < screenSize / 2; r++){
    for(let i = -(screenSize / 2); i < screenSize / 2; i++){
      let colour = newtonRaphson(2, polynomial, new Complex(r, i), roots);
      
      let pixelIndex = (screenSize / 2 + r) + screenSize * (screenSize / 2 - i); 
      pixels[4 * pixelIndex] = red(colour);
      pixels[4 * pixelIndex + 1] = green(colour); 
      pixels[4 * pixelIndex + 2] = blue(colour); 
      pixels[4 * pixelIndex + 3] = alpha(colour); 
    }
  }
  
  updatePixels();
}

function draw() {
  
  if (dragged == true && BeingDraggedIndex != -1)
  { 
    roots[BeingDraggedIndex].real = mouseX + offsetX - screenSize/2; 
    roots[BeingDraggedIndex].imaginary = screenSize/2 - (mouseY + offsetY); 
    
    for (let i = 0; i < roots.length; i++)
    { 
      if (roots[i].imaginary == -1 * roots[BeingDraggedIndex].imaginary)
      {
        roots[i].real = roots[BeingDraggedIndex].real; 
        roots[i].imaginary = -1 * roots[BeingDraggedIndex].imaginary; 
        break; 
      }
      
    }
  }
  
  smooth(); 
  updatePixels() 
  
  for (let i = 0; i < roots.length; i++)
  { 
    let xCoordinate = screenSize/2 + roots[i].real; 
    let yCoordinate = screenSize/2 - roots[i].imaginary; 
    ellipse(xCoordinate, yCoordinate, screenSize/30, screenSize/30);         
  }
}

function mousePressed()
{ 
  let mouseComplexNum = new Complex(mouseX - screenSize/2, screenSize/2 - mouseY); 
  for (let i = 0; i < roots.length; i++)
  {   
    let distance = mouseComplexNum.calculateDistance(roots[i]);
    if (mouseComplexNum.calculateDistance(roots[i]) <(screenSize / 30)) 
    {
      dragged = true; 
      let screenX = roots[i].real + screenSize/2; 
      let screenY = screenSize/2 - roots[i].imaginary; 
      
      offsetX = screenX - mouseX; 
      offsetY = screenY - mouseY; 
      
      BeingDraggedIndex = i; 
      
      break; 
    }
  }

}

function mouseReleased()
{ 
  dragged = false; 
  BeingDraggedIndex = -1;
}

function newtonRaphson(iterationCount, polynomial, cInput, roots) // returns the colour of the pixel
{
  for (let i = 0; i < iterationCount; i++)
  { 
    let fractionPart = polynomial.evaluate(cInput).divide(polynomial.evaluateDerivative(cInput));
    cInput = cInput.subtract(fractionPart);
  }
  
  let currentMinIndex = 0; 
  let currentMinDistance = Infinity; 
  for (let j = 0; j < roots.length; j++)
  { 
    let tempDistance = cInput.calculateDistance(roots[j]); 
    if (tempDistance < currentMinDistance)
    { 
      currentMinDistance = tempDistance; 
      currentMinIndex = j; 
    }
  }
  
  let t = currentMinIndex / (roots.length - 1);

  return color((255 * pow(1 - t, 2)), 2 * 255 * (1 - t) * t, 255 * pow(t, 2));
}

function polynomialFinder(roots){
  let coefficients = []
  let multiple = -1;
  
  for(let subset = 1; subset < roots.length + 1; subset++){

    let rootsCopy = [...roots]; 
    let subsets = subsetFinder(subset, rootsCopy); 
    
    let total = new Complex(0, 0);
    
    for(let i = 0; i < subsets.length; i++){
      let tempMult = new Complex(1, 0);
      
      for(let j = 0; j < subsets[i].length; j++){
        tempMult = tempMult.multiply(subsets[i][j]);
      }
      
      total = total.add(tempMult); 
    }
    total = total.multiply(new Complex(multiple, 0));
    multiple *= -1;
  
    coefficients.push(total.real); 
  }
  coefficients.reverse(); 
  coefficients.push(1); 
  
  print(coefficients)
  
  return new Function(coefficients); 
}

function subsetFinder(n, data){
  if ((n == 0) || (data.length == 0)){
    return null
  }
  if (n == data.length){
    return [data]
  }
  
  let output = []
  let a = data[0]
  
  data = data.splice(1, data.length - 1)
  
  let arr1 = subsetFinder(n - 1, [...data])
  if (arr1 != null){
    for (let i = 0; i < arr1.length; i++)
      { 
        let singleElementArr = [a]
        singleElementArr.push(...arr1[i])
        
        output.push(singleElementArr)
      }
  }else{
    output.push([a])
  }
  
  let arr2 = subsetFinder(n, [...data])
  if (arr2 != null){
    for (let j = 0; j < arr2.length; j++)
    { 
      output.push(arr2[j])
    }
  }
  
  return output
}