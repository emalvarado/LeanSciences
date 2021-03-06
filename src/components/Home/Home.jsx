import React from 'react'
import { Parallax, /*Background*/ } from 'react-parallax'
import './Home.scss'

function Home(props) {


  return (
    <div className='homePage'>

    <Parallax
        blur={0}
        bgImage={require('../../images/2830647-arnold-schwarzenegger-working-out___people-wallpapers.jpg')}
        // bgImage={require('../../images/IMG_2090.JPG')}
        strength={500}
        bgImageStyle={{maxWidth: '150vw', height:'auto', minWidth: '1278px'}}
      >
      <div style={{ height: 500 }}>
        <div className='homeHeading'>
        <h1> Lean Sciences </h1>
        <p>In home and online training and nutrition coaching</p></div>
      </div>
      </Parallax>
     


      <div className='homeInfo' >
        <h3>Science based training and nutrition designed to <span className='boldInline'> fit you</span></h3>
        <p>Exercise and dieting are integral portions of our daily lives, but we tend to prioritize everything and anything except caring for ourselves. Because no two people are the same, we have different goals, preferences, schedules, limitations, etc.; therefore a one-size-fits-all exercise and diet program is a quick fix at best. Lifestyle changes are what produce the long term results you need. I’m here to show you how to:</p>
        <ul>
          <li>Stop <span className='boldInline'>exercising aimlessly</span> and start <span className='boldInline'> training </span>for your goals</li>
          <li>Stop <span className='boldInline'>dieting endlessly</span> and start <span className='boldInline'>fueling</span> to live and perform</li>
          <li>Stop <span className='boldInline'>riding an emotional rollercoaster</span> and start <span className='boldInline'>enjoying a balanced life</span></li>
        </ul>
      </div>

    <Parallax
        blur={0}
        bgImage={require('../../images/arnold_schwarzenegger_sports_bodybuilding_dumbbells_108090_1920x1080.jpg')}
        strength={700}
        bgImageStyle={{maxWidth: '300vw', height:'auto', minWidth: '2000px'}}
      >
      <div style={{ height: 500 }}>
      </div>
      </Parallax>

      <div className='homeQuote' >
        <h3>“Strength does not come from the physical capacity. It comes from an indomitable will.”</h3>
        <p> – Ghandi</p>
      </div>


    </div>
  )
}

export default Home