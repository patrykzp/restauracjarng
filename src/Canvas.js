import React, { useEffect, useRef } from "react"

const Canvas = props => {
    const ref = useRef()
    const {draw, ...rest} = props
    
    useEffect(()=>{
        const canvas = ref.current
        const context = canvas.getContext('2d');
        let frame = 0
        let animationID
        const renderer = () => {
            frame++
            draw(context,frame)
            animationID = window.requestAnimationFrame(renderer)
        }
        renderer()
        return () => window.cancelAnimationFrame(animationID)
    },{draw})


    return (
        <>
            <canvas ref={ref} {...props} />
        </>
    )
}

export default Canvas