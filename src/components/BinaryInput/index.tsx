import {AiOutlinePlus , AiOutlineMinus} from 'react-icons/ai/'
import {motion, AnimatePresence} from 'framer-motion'
import { useState,useEffect } from 'react'
import Input from './Inputs'

interface BinaryInputProps
{
    bin: number[];
    setBin: React.Dispatch<React.SetStateAction<number[]>>;
    onMore: () => void;
    onLess: () => void;
}

const BinaryInput = (props:BinaryInputProps) =>
{
    const [inputs, setInputs] = useState
    ([
        <Input setBin={props.setBin} bin={props.bin} key={0} index={0}/>,
        <Input setBin={props.setBin} bin={props.bin} key={1} index={1}/>,
        <Input setBin={props.setBin} bin={props.bin} key={2} index={2}/>
    ])

    useEffect(() => 
    {
        //console.log(props.bin)
        //console.log(inputs)
    },[inputs])

    return (
        <div style=
        {{
            display:'flex',
            alignItems:'center', 
            justifyContent:'space-evenly',
            padding:'30px 20px 30px 20px',
            //border:'solid 1px #000',
            borderRadius:'0.6rem',
        }}>
            {props.bin.length > 3 &&
                <motion.div
                whileHover={{scale:1.1}}
                style=
                {{
                    //border:'solid 1px #000',
                    display:'flex',
                    cursor:'pointer', 
                    border: 'solid 3px #F3F3F3',
                    borderRadius:'50%',
                }} 
                whileTap={{scale:0.90}}
                onClick={()=> {
                    props.onLess&& props.onLess()
                    setInputs(inputs.slice(0, inputs.length-1))
                    props.setBin(props.bin.slice(0, props.bin.length-1))
                }}
                >
                    <AiOutlineMinus style={{color:'#F3F3F3'}} size={'clamp(10px,3vw,30px)'}/>
                </motion.div>
            }

            
            <AnimatePresence>
                {inputs.map((input, index) =>
                {
                    return input
                })}
            </AnimatePresence>
            

            {props.bin.length < 6 &&
            <motion.div
            whileHover={{scale:1.1}}
            style=
            {{
                display:'flex',
                cursor:'pointer', 
                border: 'solid 3px #F3F3F3',
                borderRadius:'50%',
            }} 
            whileTap={{scale:0.90}}
            onClick={()=> {
                props.onMore &&props.onMore()
                setInputs([...inputs, <Input bin={props.bin} setBin={props.setBin} key={inputs.length} index={inputs.length}/>])
                props.setBin([...props.bin, 0])
            }}
            >
                <AiOutlinePlus style={{color:'#F3F3F3'}} size={'clamp(10px,3vw,30px)'}/>
            </motion.div>
            
            }
        </div>
    )
}

export default BinaryInput