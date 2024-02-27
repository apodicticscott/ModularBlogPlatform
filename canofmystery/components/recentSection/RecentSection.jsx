import React, {useState} from 'react'

const RecentSection = () => {
    const [color, setColor] = useState("#000000")
    
    const handleColor = () => {
        if(color === "#000000"){
            setColor("#ffffff")
        }else{
            setColor("#000000")
        }
    }

    return(
        <>
            <button style={color} onClick={handleColor}>

            </button>
        </>
    )
}

export default RecentSection