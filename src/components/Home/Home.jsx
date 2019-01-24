import React from 'react'
import { Parallax, Background } from 'react-parallax'
import './Home.scss'

function Home(props) {
  // console.log(props)
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };
  const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };
  return (
    <div className='homePage'>

    <Parallax
        blur={0}
        bgImage='https://wallpaperplay.com/walls/full/3/3/f/140526.jpg'
        bgImageAlt="the cat"
        strength={2000}
      >
      <div style={{ height: 500 }}>
        <div className='homeHeading' style={insideStyles}>
        <h1> Lean Sciences </h1>
        <p>In home and online training and nutrition coaching</p></div>
      </div>
      </Parallax>
     


      <div style={{ height: '200px' }}>
        <h3>Science based training and nutrition designed to fit you</h3>
        <p>Exercise and dieting are integral portions of our daily lives, but we tend to prioritize everything and anything except caring for ourselves. Because no two people are the same, we have different goals, preferences, schedules, limitations, etc.; therefore a one-size-fits-all exercise and diet program is a quick fix at best. Lifestyle changes are what produce the long term results you need. I’m here to show you how to:</p>
        <ul>
          <li>Stop exercising aimlessly and start training for your goals</li>
          <li>Stop dieting endlessly and start fueling to live and perform</li>
          <li>Stop riding an emotional rollercoaster and start enjoying a balanced life</li>
        </ul>
      </div>

      <div style={{ height: '200px' }}>

      </div>

      <div style={{ height: '200px' }}>
        <h3>quoty mcquotequote??</h3>
        <p>im broccoli a quote??</p>
      </div>


    </div>
  )
}

export default Home