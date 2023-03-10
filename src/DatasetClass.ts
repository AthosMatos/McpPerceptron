export interface dataSetType 
{
  inputs:number[];
  output:number;
}

class Dataset 
{
  data:dataSetType[] = [];
  currentInput:number[] = [];
  currentOutput:number = 0;
  inputsGone:number[] = [];

  constructor(trainData:dataSetType[])
  {
    this.data = trainData;
  }

  public getInputsGone()
  {
    return this.inputsGone;
  }

  public NovoInputAleatorio()
  {
    const maxRepetitions = this.data.length;
    let ranNum = Math.floor(Math.random() * this.data.length);
    let i = 0;

    while (this.inputsGone.includes(ranNum) && i <= maxRepetitions) 
    {
      ranNum = Math.floor(Math.random() * this.data.length);
      i++;
    }

    if(i < maxRepetitions)
    {
      this.currentInput = this.data[ranNum].inputs;
      this.currentOutput = this.data[ranNum].output;
      this.inputsGone.push(ranNum);

      return true
    }
    else 
    {
      //console.log("Todos os inputs foram usados");
      return false
    }
    
  }

  public reset()
  {
    this.inputsGone = [];
  }

}

export default Dataset;