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
    setBin:React.Dispatch<React.SetStateAction<number[]>>;
    bin:number[];
}
const Input = (props:InputProps) =>
{
    const [isPressed, setIsPressed] = useState(false)

    useEffect(()=> 
    {
        props.setBin((prevBin)=>
        {
            let newBin = [...prevBin]
            newBin[props.index] = isPressed?1:0;
            return newBin
        })
    }, [isPressed])

    return (
        <div style=
        {{
            display:'flex',
            flexDirection:'column', 
            alignItems:'center',
        }}>
            <p 
            style={{
                color:'#F3F3F3',
                position:'absolute',
                marginTop:'-22px',
                
            }}>
                {`X${props.index + 1}`}
            </p>
            <motion.button
            initial = "closed"
            animate = "open"
            exit="closed"
            variants={itemVariants}
            whileHover={{scale:1.05}}
            whileTap={{scale:0.97}}
            onTap={()=>setIsPressed(!isPressed)}
            style = {{
                height:50, 
                width:50, 
                cursor:'pointer',
                backgroundColor:'#F3F3F3',
                margin:'0px 10px 0px 10px',
                border: 'solid 3px #F3F3F3',
                borderRadius: '0.6rem',
              
            }}>
                <p
                style={{
                    color:'#5D1594',
                    fontSize:'25px',
                    fontWeight:'bold',
                    margin:0,
                    textAlign:'center',
                }} 
                >{isPressed?1:0}</p>
            </motion.button>
        </div>
    )
}

export default Input