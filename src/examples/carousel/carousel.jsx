import React from 'react';

import './carousel.css'


const contentList = [
   {
    id: 1,
    title: "Slide 1",
    text: "Welcome to the carousel",
  },
  {
    id: 2,
    title: "Slide 2",
    text: "This is built completely from scratch",
  },
  {
    id: 3,
    title: "Slide 3",
    text: "No external carousel library",
  },
  {
    id: 4,
    title: "Slide 4",
    text: "Using React and CSS only",
  },  
]

export const Carousel = () => {

    const [current, setCurrent] = React.useState(0);

    const onNext = React.useCallback(() => { 
        setCurrent(prev=> (prev + 1)% contentList.length)
    }, [])
    
    const onPrev = React.useCallback(() => { 
        setCurrent(prev=> (prev - 1 + contentList.length) % contentList.length)
    } , [])

    return (
        <div className='carousel'>
            <div
                className='carousel-track'
                style={{  transform : `translateX(-${current * 100}%)` ,}}
            >
                {contentList.map((item , i) => (
                    <div className={`slide  ${ i === current ? 'active' : ''}`} key={item.id}>
                        <div className='title'>
                            { item.title}
                        </div>
                        <div className='content'>
                            { item.text}
                        </div>
                    </div>
                )) }
            </div>
            <button className='next' onClick={onNext}>
                {'->'}
            </button>
            <button className='previous' onClick={onPrev}>
                {'<-'}
            </button>
        </div>
    )
}