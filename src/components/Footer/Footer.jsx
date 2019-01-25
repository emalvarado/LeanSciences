import React from 'react'
import './Footer.scss'

function Footer(props) {
  return (
    <div className='footer'>
      <footer>
       <div className='footerIcons'>
         <a href="http://www.facebook.com/2531771470382675"> <i className="fab fa-facebook"></i> </a>
         <a href="http://instagram.com/leansciences"> <i className="fab fa-instagram"></i></a>
         <a href="https://www.pinterest.com/leansciences/"><i className="fab fa-pinterest-square"></i> </a>
       </div>

       <div className="footerContact">
         <div>(413) 687-4644</div>
         <div>LEANSCIENCES@GMAIL.COM</div>
       </div>
    
      </footer>
    </div>
  )
}

export default Footer