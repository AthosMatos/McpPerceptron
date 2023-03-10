import React, { useEffect, useState } from 'react'
import { motion,Variants } from 'framer-motion'

interface ButtonProps
{
    Linestyle?: React.CSSProperties;
    style?: React.CSSProperties;
    name: string;
    currentSelected: string;
    onPress?: () => void;
    showLine?: boolean;
}

const itemVariants: Variants = {
    open: 
    {
        opacity:1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: 
    { 
        opacity:0,
        scale: 0, 
        transition: { duration: 0.2 } 
    }
};

const Selectbutton = (props:ButtonProps) =>
{
    const [isPressed, setIsPressed] = useState(props.name.toLowerCase() == props.currentSelected.toLowerCase()?true:false)
    const buttonColor = '#DDC766';

    useEffect(()=>
    {
        setIsPressed(props.name.toLowerCase() == props.currentSelected.toLowerCase()?true:false)
    },[props.currentSelected])

    return (
        <div style=
        {Object.assign(
            {
                display:'flex',
                flexDirection:'row', 
                alignItems:'center',
            },props.style
        )
        }>
            {props.showLine || props.showLine == undefined&&
                <motion.div
                variants={itemVariants}
                initial= {{opacity:0}}
                animate={isPressed ? 'open' : 'closed'}
                style={Object.assign(
                {
                    width:'0.4rem', 
                    backgroundColor:buttonColor, 
                    height:'clamp(20px, 6vh, 100px)', 
                    borderRadius:200, 
                    marginRight:10,
                    
                }, 
                props.Linestyle
                )}/>
            }
            

            <motion.button 
            whileHover={{scale:1.05}}
            whileTap={{scale:0.90}}
            animate = {{ backgroundColor:`${isPressed ? buttonColor : '#F3F3F3'}`,}}
            onTap={()=>
            {
                setIsPressed(!isPressed)
                props.onPress&& props.onPress()
            }}
            style=
            {{
                border:'none',
                display:'flex', 
                flexDirection:'row', 
                alignItems:'center',
                justifyContent:'center',
                cursor:'pointer',
                backgroundColor:'transparent',
                borderRadius:10,
                width:'clamp(50px, 8vw, 100px)',
                boxShadow:'1px 4px 8px rgba(0, 0, 0, 0.11)',
            }}>
                <motion.p
                style=
                {{
                    color:'#5D1594',
                    fontSize:'clamp(10px, 2vw, 20px)',
                    fontWeight:'bold',
                    margin:0,
                    padding:'20px 0px 20px 0px', 
                }}> {props.name} 

                </motion.p>   
            </motion.button>

        </div>
       
    )
}

export default Selectbutton