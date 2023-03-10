import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence,Variants, MotionStyle } from 'framer-motion'

interface ButtonProps
{
    name: string;
    onPress?: () => void;
    style?:  MotionStyle;
    children?: React.ReactNode;
    htmlFor?: string;
}
const Button = (props:ButtonProps) =>
{
    const [isPressed, setIsPressed] = useState(false)
    
    return (
        <motion.button 
        whileHover={{scale:1.05}}
        whileTap={{scale:0.90}}
        onTap={()=>
        {
            setIsPressed(!isPressed)
            props.onPress && props.onPress()
        }}
        style=
        {Object.assign(
            {
                display:'flex', 
                flexDirection:'row', 
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer',
                border:'none',
                backgroundColor:'#F3F3F3',
                borderRadius:10,
                width:'clamp(80px, 16vw, 180px)',
                boxShadow:'1px 4px 8px rgba(0, 0, 0, 0.11)',
            },
            props.style
        )}
        >
            
            <motion.label
            htmlFor={props.htmlFor}
            style=
            {{
                color:'#5D1594',
                fontSize:'clamp(10px, 2vw, 20px)',
                fontWeight:'bold',
                margin:0,
                padding:'15px 0px 15px 0px', 
            }}> {props.name} 
            {props.children}
            </motion.label>   
        </motion.button>
    )
}

export default Button