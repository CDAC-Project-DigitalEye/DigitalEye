
import React from 'react'

import { Carousel } from 'react-bootstrap'
import birthday from "../Videos/birthday1.mp4"
import cinamatography from "../Videos/cineman.mp4"
import Preweading from "../Videos/prewdn.mp4"
import wedding from "../Videos/weddingn.mp4"
import travling from "../Videos/traveln.mp4"
import ReactPlayer from 'react-player'
import './Styles/Video.css'

//import { TfiRulerAlt } from 'react-icons/tfi'

const VideoSlider = () => {
    const  videoProperties = [
        {
            id:1,
            title:"MARRIAGE",
            src: wedding,
            credit:"WHEN I SAW YOU,I FELL IN LOVE,AND YOU SMILED BECAUSE YOU KNEW.",

        },
        {
            id:2,
            title:"PREWEDDING",
            src: Preweading,
            credit:" CHEERS TO LOVE AND LAUGHTER, BUT ESPECIALLY TO EVER AFTER.",

        },
        {
            id:3,
            title:"BIRTHDAY",
            src: birthday,
            credit:"ABIRTHDAY ARE NATURE'S WAY OF TELLING US TO EAT MORE CAKE.",

        },
        {
            id:4,
            title:"TRAVELING",
            src: travling,
            credit:"LIFE IS EITHER A DARING ADVENTURE OR NOTHING AT ALL.",

        },
        {
            id:5,
            title:"CINEMATOGRAPHY",
            src: cinamatography,
            credit:"CINEMA CAN FILL IN THE EMPTY SPACE OF YOUR LIFE AND LONILYNESS.",

        },
    ]

  return (
    <div>
    <Carousel fade>
        {videoProperties.map((videoObj) =>{
            return(
                
                <Carousel.Item key={videoObj.id} width={"100%"} interval={1000} >
                    <ReactPlayer
                        url={videoObj.src}
                         controls={false}
                         loop ={true}
                         pip ={true}
                        muted={true}
                        width="100%"
                         playIcon={false}
                        // loop={true}
                         playing={true}
                        
                    />
                    <Carousel.Caption>
                        <h3 className='goldi'>{videoObj.title}</h3>
                        <p className='text-primary'>{videoObj.credit}</p>
                    </Carousel.Caption>
                </Carousel.Item>
                

                
            )
        })}
     </Carousel>
      
    </div>
  )
}

export default VideoSlider
