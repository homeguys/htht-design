import React from 'react'
import { Link } from 'react-router-dom'
import config from './config'
import './style.scss'

function Home () {
  return (
    <div id='home'>
      <div className='banner'>
        <h2>Htht Design</h2>
        <p>基于 React.js 实现的精致UI组件库</p>
        <div className='rec-btns'>
          <Link to='/comp-docs' className='btn-link'>
            <span>快速上手</span>
          </Link>
        </div>
      </div>
      <section className='features'>
        <ul>
          {config.map(item => (
            <li key={item.key}>
              <img src={item.img} alt='' />
              <div className='text'>
                <h1 className='h1'>{item.h1}</h1>
                <h1 className='h2'>{item.h2}</h1>
                <p>{item.p}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer>© 2019-2020 NanJingHangTianHongTu. All Rights Reserved.</footer>
    </div>
  )
}

export default Home
