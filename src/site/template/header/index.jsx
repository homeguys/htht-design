import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import logoPic from '../../../static/images/icon_logo.jpeg'
import { Links } from '../../../router/main_router'
import { varibles } from '../../../config'
import { setActive } from '../../../utils/utils'
import './style.scss'

const { hthtPrefix } = varibles

@withRouter
class Header extends React.Component {
  constructor (props) {
    super(props)
    this.lis = null
  }

  componentDidMount () {
    const nav = document.getElementById('nav')
    this.lis = nav.querySelectorAll('li')
    nav.addEventListener(
      'click',
      e => {
        const li = e.target.parentNode
        setActive(this.lis, li, 'active')
      },
      false
    )
    this.setHighLight()
  }

  componentDidUpdate () {
    this.setHighLight()
  }

  setHighLight () {
    const { location } = this.props
    const { pathname } = location
    this.lis.forEach(item => {
      const tagPath = item.className.split(' ')[1]
      if (pathname.includes(tagPath)) {
        setActive(this.lis, item, 'active')
      }
    })
  }

  render () {
    return (
      <div id={`${hthtPrefix}-header`}>
        <div id='logo'>
          <Link to='/'>
            <img src={logoPic} alt='logo' />
            <h1>南京航天宏图组件库</h1>
          </Link>
        </div>
        <div id='nav'>
          <Links />
        </div>
      </div>
    )
  }
}

export default Header
