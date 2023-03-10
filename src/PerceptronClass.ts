const bias = 1;


class Perceptron
{
    pesos:number[] = []
    epocas:number = 0;
    taxaAcerto = 0;

    public ultilizarPesos(pesos:number[])
    {
        this.pesos = pesos;
    }

    public gerarPesosAleatorios(inputSize:number)
    {
        function randomWeight()
        {
            return (Math.floor(Math.random() * (10 - (-10))) + (-10));
        }

        for(let i = 0; i < inputSize; i++)//amount of inputs + bias
        {
            this.pesos[i] = randomWeight();
        }
    }

    public somatorio(inputs:number[])
    {
       // console.log('inputs',inputs);
        let somatorio = 0;
        for(let i = 0; i < inputs.length; i++)
        {
            somatorio += inputs[i]*this.pesos[i];
        }
        somatorio += bias*this.pesos[inputs.length];

        return somatorio;
    }

    public funcaoAtivacao(somatorio:number)
    {
        if(somatorio >= 0) return 1;
        else return 0;
    }

    public CalcularErro(outputDesejado:number,outputCalculado:number)
    {
        return (outputDesejado - outputCalculado);
    }

    public CalcularNovosPesos(inputs:number[],erro:number, taxa_aprendizado:number)
    {
        
        for(let i = 0; i < inputs.length; i++)
        {
            this.pesos[i] += (taxa_aprendizado*erro*inputs[i]);
        }

        this.pesos[inputs.length] += (taxa_aprendizado*erro*bias);
    }

    public testar(inputs:number[])
    {
        const somatorio = this.somatorio(inputs);
        const output = this.funcaoAtivacao(somatorio);
        return output;
    }

    public reset()
    {
        this.taxaAcerto = 0;
        this.pesos = []
    }
}

export default Perceptron