import React, { useEffect, useState } from 'react';
import Dataset from './DatasetClass';
import Perceptron from './PerceptronClass';
import { PreTrained3Bit, generateTrainData} from './trainData'
import Selectbutton from './components/Selectbutton';
import Button from './components/Button';
import BinaryInput from './components/BinaryInput';
import TypedInput from './components/TypedInput';
import WeightsInput from './components/WeightsInput';
import {motion} from 'framer-motion'

const perceptronAnd = new Perceptron();
const perceptronNand = new Perceptron();
const perceptronOr = new Perceptron();
const perceptronNor = new Perceptron();

function App() 
{
  const backColor = '#5D1594';
  const [bin, setBin] = useState([0,0,0])
  const [currentPerceptron, setCurrentPerceptron] = useState({name:'AND', perceptron:perceptronAnd})
  const [currentResult, setCurrentResult] = useState(-1)
  const [taxaAprendizado, setTaxaAprendizado] = useState(0.1)
  const [currentPesos, setCurrentPesos] = useState(undefined)
  const [weights, setWeights] = useState(['0','0','0','0'])   
  const [startWSelected, setStartWSelected] = useState('Pesos Aleatorios')
  const [testing, setTesting] = useState(false)
  const [criterioParada, setCriterioParada] = useState(0)
  const [maxEpocas, setMaxEpocas] = useState(200)
  const [training, setTraining] = useState(false)

  function updateCurrentPesos()
  {
    //console.log(currentPerceptron.perceptron.pesos)
    let str = '';

    for(let i = 0; i<currentPerceptron.perceptron.pesos.length - 1; i++)
    {
      str += `w${i+1}: [${parseFloat(currentPerceptron.perceptron.pesos[i].toFixed(1))}] `
    }

    str += `w0: [${parseFloat(currentPerceptron.perceptron.pesos[currentPerceptron.perceptron.pesos.length - 1].toFixed(1))}]`  

    str += ` | Epocas: [${currentPerceptron.perceptron.epocas}] | Taxa de Acerto: [${parseFloat(currentPerceptron.perceptron.taxaAcerto.toFixed(2)) * 100}%]`

    setCurrentPesos(str)
    //console.log(str)
  }

  useEffect(()=>
  {
    if(currentPerceptron.perceptron.pesos.length>0) updateCurrentPesos()
    //console.log(currentPerceptron.perceptron.pesos)
  })
  
  useEffect(()=>
  {
    updateDatasetAndPerceptron(currentPerceptron.name)
  },[weights])

  useEffect(()=>
  {
    runMCP(perceptronAnd,new Dataset(PreTrained3Bit.and));
    runMCP(perceptronNand,new Dataset(PreTrained3Bit.not_and));
    runMCP(perceptronOr,new Dataset(PreTrained3Bit.or));
    runMCP(perceptronNor,new Dataset(PreTrained3Bit.not_or));
    
  },[])

  function runMCP (perceptron:Perceptron, data:Dataset, InputPeso:number[])
  {
    perceptron.reset();
    let epoca = 0;
    let runs = 0;
    let hits = 0;

    console.log("weights.length: "+weights.length)

    if(InputPeso) perceptron.ultilizarPesos(InputPeso)
    else perceptron.gerarPesosAleatorios(weights.length);
     //gera pesos iniciais aleatorios para o perceptron
    //log&& console.log(`Pesos Iniciais: |w1:${perceptron.pesos.w1} w2:${perceptron.pesos.w2} w3:${perceptron.pesos.w3} w0:${perceptron.pesos.w0}|`)

    data.NovoInputAleatorio(); //pega um input aleatorio para comecar o processo
    //log&& console.log(`Input Inicial: |${data.currentInput}|`)

    while(epoca < maxEpocas)
    {
      runs++

      const soma = perceptron.somatorio(data.currentInput) //calcula o somatorio
      //console.log(`Somatorio: ${soma}`)
      
      const ativação = perceptron.funcaoAtivacao(soma) //calcula a ativação
      //console.log(`Ativação: ${ativação}`)
      //console.log(`Input: ${dataset.currentInput} | Output: ${dataset.currentOutput} | Ativação: ${ativação}`)
      //console.log(`GetInputsGone |${dataset.getInputsGone()}|`)
      const erro = perceptron.CalcularErro(data.currentOutput, ativação) //calcula o erro
      //console.log(`Erro: ${erro}`)

      if(erro == 0)
      {
        hits++

        if(!data.NovoInputAleatorio()) //se não tiver mais inputs reseta o dataset para pegar um novo input e passar pra uma nova epoca
        {
          data.reset();
          perceptron.taxaAcerto = hits/runs;
          const taxaAcerto = perceptron.taxaAcerto;
          //log&& console.log(`[ Epoca: |${epoca}| ]  [Taxa de Acerto: |${taxaAcerto.toFixed(6)}%| ]`)

          if(criterioParada > 0 && taxaAcerto >= (criterioParada/100)) break

          epoca++;
          hits = 0;
          runs = 0;
        }
        //console.log(`Novo Input: |${dataset.currentInput}|`)
      }
      else
      {
        perceptron.CalcularNovosPesos(data.currentInput,erro, taxaAprendizado) //atualiza os pesos
        //console.log(`Novos Pesos: |w1:${perceptron.pesos.w1} w2:${perceptron.pesos.w2} w3:${perceptron.pesos.w3} w0:${perceptron.pesos.w0}|`)
      }
    }
    perceptron.epocas = epoca;
   // console.log(`Epoca Final: ${perceptron.epocas}`)
    //console.log(`Pesos Finais: [ |w1:${perceptron.pesos.w1.toFixed(3)}| |w2:${perceptron.pesos.w2.toFixed(3)}| |w3:${perceptron.pesos.w3.toFixed(3)}| |w0:${perceptron.pesos.w0.toFixed(3)}| ]`)
    //console.log(`Teste ${inputTeste} = ${perceptron.testar(inputTeste)}`)
    console.log(perceptron)

  }
 
  function updateDatasetAndPerceptron(type:string)
  {
    setTraining(false)
    const trainData = new Dataset(generateTrainData(type.toLowerCase(),bin.length))

    //console.log(trainData)
    switch(type)
    {
      case 'and':
        perceptronAnd.reset()
        break;
      case 'nand':
        perceptronNand.reset()
        break;
      case 'or':
        perceptronOr.reset()
        break;
      case 'nor':
        perceptronNor.reset()
        break;
    }
  
    if(startWSelected != 'Pesos Aleatorios')
    {
      let Ws = []
      for(let i = 0; i < weights.length; i++)
      {
        Ws.push(parseFloat(weights[i]))
      }
      switch(type.toLowerCase())
      {
        case 'and':
          runMCP(perceptronAnd, trainData,Ws)
          break;
        case 'nand':
          runMCP(perceptronNand, trainData,Ws)
          break;
        case 'or':
          runMCP(perceptronOr, trainData,Ws)
          break;
        case 'nor':
          runMCP(perceptronNor, trainData,Ws)
          break;
      }
    }
    else
    {
      //console.log('Pesos Aleatorios')
      //console.log(type)
      switch(type.toLowerCase())
      {
        case 'and':
          runMCP(perceptronAnd, trainData)
          break;
        case 'nand':
          runMCP(perceptronNand, trainData)
          break;
        case 'or':
          runMCP(perceptronOr, trainData)
          break;
        case 'nor':
          runMCP(perceptronNor, trainData)
          break;
      }
    } 
    switch(type.toLowerCase())
    {
      case 'and':
        setCurrentPerceptron({name:type.toUpperCase(), perceptron:perceptronAnd})
        break;
      case 'nand':
        setCurrentPerceptron({name:type.toUpperCase(), perceptron:perceptronNand})
        break;
      case 'or':
        setCurrentPerceptron({name:type.toUpperCase(), perceptron:perceptronOr})
        break;
      case 'nor':
        setCurrentPerceptron({name:type.toUpperCase(), perceptron:perceptronNor})
        break;
    }

    setTraining(true)
  }

  return (
    <div style=
    {{
      display:'flex',
      height:'100vh',
      width:'100vw',
      alignItems:'center',
      backgroundColor:backColor,
      flexDirection:'column',
    }}>
      <div style={{
        display:'flex',
        marginTop:'clamp(20px, 5vh, 100px)',
        //border:'1px solid #000',
        alignItems:'center',
        justifyContent:'center',
      }}>
        <h1 style=
        {{
         // border:'1px solid #000',
          fontSize:'clamp(40px,8vw,100px)',
          color:'#F3F3F3',
          margin:0,
          
        }}>Athos's Perceptron</h1>
      </div>
      
      <div 
      style=
      {{
        //border:'1px solid #000',
        height:'70%',
        display:'flex',
        width:'65%',
        justifyContent:'space-around',
        alignItems:'center',
      }}>
        <div
        style={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'space-evenly',
          height:'clamp(300px, 40vh, 600px)',
        }}>
          <Selectbutton name='And' currentSelected = {currentPerceptron.name} onPress={()=>setCurrentPerceptron({name:'AND', perceptron:perceptronAnd})}/>
          <Selectbutton name='Nand' currentSelected = {currentPerceptron.name} onPress={()=>setCurrentPerceptron({name:'NAND', perceptron:perceptronNand})}/>
          <Selectbutton name='Or' currentSelected = {currentPerceptron.name} onPress={()=>setCurrentPerceptron({name:'OR', perceptron:perceptronOr})} />
          <Selectbutton name='Nor' currentSelected = {currentPerceptron.name} onPress={()=>setCurrentPerceptron({name:'NOR', perceptron:perceptronNor})} />
        </div>

        <div style=
        {{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'column',
        }}>
          <motion.p 
          onAnimationComplete={()=>setTraining(false)}
          animate={training ? {x: [0,-10, 10, -10, 10, -5, 5, -2, 2, 0],color:'#DDC766'}: {}}
          transition={{ duration: 0.5,}} 
          style={{color:'#FEFEFE'}}>{`${currentPesos}`}</motion.p>
          
          <motion.div
          onAnimationComplete={()=>setTesting(false)}
          animate={testing ? {x: [0,-10, 10, -10, 10, -5, 5, -2, 2, 0],backgroundColor:'#DDC766'}: {}}
          transition={{ duration: 0.5,}} 
          style=
          {{
            display:'flex',
            //border: '6px solid #000',
            width:'clamp(60px, 12vw, 100px)',
            height:'clamp(60px, 12vw, 100px)',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:'50%',
            backgroundColor:'#F3F3F3',
            //borderColor:'#F3F3F3',
          }}>
            <p style=
            {{
              fontWeight:'bolder', 
              fontSize:'clamp(10px,4.5vw,60px)',
              margin:0,
              color:backColor,
            }}>{currentResult}</p>
          </motion.div>

          <BinaryInput 
          bin={bin} 
          setBin={setBin}
          onMore={()=>{
            setWeights([...weights, '0'])
          }}
          onLess={()=>{
            setWeights(weights.slice(0, weights.length-1))
          }}
          />

          <WeightsInput setWeights={setWeights} weights={weights}/>
          
          <div>
            <TypedInput style={{marginBottom:'10px'}} text='Taxa de aprendizado' setData={setTaxaAprendizado} data={taxaAprendizado}/>
            <TypedInput style={{marginBottom:'10px'}} text='Criterio de parada (%)' setData={setCriterioParada} data={criterioParada}/>  
            <TypedInput text='Num. Epocas' setData={setMaxEpocas} data={maxEpocas}/>  
          </div>
        </div>

        <div>
          <div style={{
            display:'flex',
            flexDirection:'row',
            marginBottom:'20px',
            justifyContent:'space-between',
          }}>
            <Button 
            style={{width:'100px'}}
            onPress={()=>
            {
             
              switch(currentPerceptron.name)
              {
                case 'AND':
                  updateDatasetAndPerceptron('AND')
                  break;
                case 'NAND':
                  updateDatasetAndPerceptron('NAND')
                  break;
                case 'OR':
                  updateDatasetAndPerceptron('OR')
                  break;
                case 'NOR':
                  updateDatasetAndPerceptron('NOR')
                  break;
              }
            
            }} 
            name='Treinar'/>

            <Selectbutton
            style={{marginLeft:'20px',}}
            showLine={false}
            name='Pesos Aleatorios' 
            currentSelected={startWSelected} 
            onPress={()=>
            {
              setStartWSelected((startWSelected == 'Pesos Aleatorios') ? 'Pesos do Usuário' : 'Pesos Aleatorios')
            }}/>
          
          </div>

          <Button 
          style={{width:'220px',}}
          onPress={()=>
          {
            setTesting(false)
            const res = currentPerceptron.perceptron.testar(bin)
            //console.log(`Teste ${bin} = ${res}`)
            setCurrentResult(res)
            setTesting(true)
            
          }} 
          name='Testar'/>
          
          <Button
          style={{
            margin:'20px 0px 20px 0px',
            width:'220px',
          }} 
          onPress={()=>
          {
            const link = document.createElement("a")
            let jsontxt = '{\n'
            jsontxt += `"${currentPerceptron.name}":{\n`
            jsontxt += `"pesos":[\n`
            
            for(const key in currentPerceptron.perceptron.pesos)
            {
              jsontxt += `${currentPerceptron.perceptron.pesos[key]},\n`
            }

            jsontxt = jsontxt.slice(0,-2)
            jsontxt += `],\n`
            jsontxt += `"taxaAcerto":${currentPerceptron.perceptron.taxaAcerto},\n`
            jsontxt += `"Epocas":${currentPerceptron.perceptron.epocas}\n`
            jsontxt += `}\n`
            jsontxt += `}`
            const file = new Blob([jsontxt], { type: 'text/plain' });
            link.href = URL.createObjectURL(file);
            link.download = "DataSet.json";
            link.click();
            URL.revokeObjectURL(link.href);
          }} 
          name='Baixar Dataset'/>
      
          <Button 
          htmlFor='setTrainedFiles'
          style={{
            margin:'20px 0px 20px 0px',
            width:'220px',
          }} 
          name='Carregar Dataset'/>

          <input
          onChange={(event)=>
          {
            var reader = new FileReader();
            reader.onload = (event)=>
            {
              const json =  JSON.parse(event.target.result)
              //console.log(json)
              if(json[currentPerceptron.name])
              {
                currentPerceptron.perceptron.pesos = json[currentPerceptron.name].pesos
                currentPerceptron.perceptron.taxaAcerto = json[currentPerceptron.name].taxaAcerto
                currentPerceptron.perceptron.epocas = json[currentPerceptron.name].Epocas 

                
                updateCurrentPesos()
              }
              else alert(`Esses pesos não são para esse perceptron\n[${currentPerceptron.name}] != [${Object.keys(json)[0]}]`)
            }
            reader.readAsText(event.target.files[0])
          }}
           id="setTrainedFiles" 
           style={{visibility:'hidden',height:0,width:0}} 
           type="file" multiple />

        </div>
      </div>
    </div>
  );
}

export default App;
