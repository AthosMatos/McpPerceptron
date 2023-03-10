import { motion, Variants } from 'framer-motion'

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
    style?:React.CSSProperties;
    text: string;
    data:string;
    setData:React.Dispatch<React.SetStateAction<string>>;
}
const TypedInput = (props:InputProps) =>
{
    return (
        <div style=
        {Object.assign(
            {
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
            },props.style
        )}>
            <motion.div
            initial = "closed"
            animate = "open"
            exit="closed"
            variants={itemVariants}
            whileHover={{scale:1.05}} 
            style=
            {{
                display:'flex',
                justifyContent:'center',
            }}>
            
                <input
                value={`${props.data}`}
                onChange={(e)=>props.setData(e.target.value)}
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
            
            <p style={{margin:'1vh' ,color:'#F3F3F3',fontSize:'clamp(8px,1vw,27px)'}}>{props.text}</p> 
        
        </div>
    )
}

export default TypedInput