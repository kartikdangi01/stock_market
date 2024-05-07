import { Link } from 'react-router-dom'
import './header.scss'
import { useState } from 'react'

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <div className="heading">
      <Link to={'/'} className='kdu-heading'><h1 style={{ margin: '0.25% 0' }}><i className="fi fi-rr-chart-histogram"></i> KDU Stock Market</h1></Link>
      <div className="other-heading">
        <h3 className='other-heading-title'>Summarizer</h3>
        <Link to={'/my-portfolio'} className='my-portfolio-link'><h3 className='other-heading-title'>My Portfolio</h3></Link>
      </div>
      <div className="other-heading-mobile">
          <p className='mobile-ham' onClick={() => setShow(prev => !prev)}><i className="fi fi-sr-grip-lines"></i></p>
      </div>
      <div className='hamburger-menu' style={{display: show === true ? 'flex' : 'none', flexDirection: 'column'}}>
        <h3 className='other-heading-mobile'>Summarizer</h3>
        <Link to={'/my-portfolio'} className='my-portfolio-link'><h3 className='other-heading-title'>My Portfolio</h3></Link>
      </div>
    </div>
  )
}
