import { motion, Variants } from 'framer-motion'
import { useEffect, useState } from 'react';

const itemVariants: Variants = {
    open: 
    {
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: 
    { 
        scale: 0, 
        transition: { duration: 0.2 } 
    }
};

interface InputProps
{
    index:number;
    data:string[];
    setData:React.Dispatch<React.SetStateAction<string[]>>;  
    isBias?:boolean;
}
const TypedInput = (props:InputProps) =>
{
    return (
        <div
        style=
        {{
            alignItems:'center',
            justifyContent:'center',
            display:'flex',
            flexDirection:'column',
            margin:'5px',
        }}
        >
            <motion.div
            initial = "closed"
            animate = "open"
            exit="closed"
            variants={itemVariants}
            whileHover={{scale:1.05}} 
            style=
            {{
                display:'flex',
                flexDirection:'column', 
                alignItems:'center',
            }}>
            
                <input
                value={`${props.data[props.index]}`}
                onChange={(e)=>
                {
                    let newWeights = [...props.data]
                    newWeights[props.index] = e.target.value
                    props.setData(newWeights)
                }}
                
                style={{
                    margin:0,
                    textAlign:'center',
                    color:'#F3F3F3',
                    fontSize:'clamp(10px,3vw,30px)',
                    height:50, 
                    width:50, 
                    cursor:'pointer',
                    backgroundColor:'transparent',
                    border: 'solid 3px #F3F3F3',
                    borderRadius: '0.6rem',
                }} />

            </motion.div>
            
            <p style={{margin:'1vh' ,color:'#F3F3F3',fontSize:'clamp(8px,1.5vw,14px)'}}>{`W${props.isBias ? 0 : props.index}`}</p> 
        </div>
    )
}

export default TypedInput