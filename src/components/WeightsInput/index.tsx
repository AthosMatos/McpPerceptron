import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react';
import WInput from './input';

interface WeightsInputProps
{
    setWeights:React.Dispatch<React.SetStateAction<string[]>>;
    weights:string[];
}

const WeightsInput = (props:WeightsInputProps) =>
{
    const [inputs, setInputs] = useState
    ([
        <WInput key={0} index={0} setData={props.setWeights} data={props.weights}/>,
        <WInput key={1}  index={1} setData={props.setWeights} data={props.weights}/>,
        <WInput key={2}  index={2} setData={props.setWeights} data={props.weights}/>,
        <WInput key={3}  index={3} setData={props.setWeights} data={props.weights} />
    ])
    useEffect(()=>
    {
        //console.log(props.weights)
        if(props.weights.length > inputs.length)
        {
            setInputs([...inputs, <WInput key={inputs.length} index={inputs.length} setData={props.setWeights} data={props.weights}/>])
        }
        else if(props.weights.length < inputs.length)
        {
            setInputs(inputs.slice(0, inputs.length-1))
        }
    },[props.weights])

    return (
        <div 
        style={{
            display:'flex',
            flexDirection:'row',
            marginBottom:'10px',
        }}>
            {
                inputs.map((input, index) => input )
            }
        </div>
    )
}

export default WeightsInput