/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Icon } from 'antd'
import Highlight from '../highlight'
import { varibles } from '../../../config'
import CodeMeta from '../code_meta'
import './style.scss'

const { hthtPrefix } = varibles

function MainContent(props) {
  const { mainDesc, data } = props

  return (
    <div id={`${hthtPrefix}-main-content`}>
      <div className="content-wrapper">
        <article>
          <section className="markdown">
            <h1>
              {mainDesc.value}
              <span>{mainDesc.name}</span>
            </h1>
            <p className="main-desc">{mainDesc.detail}</p>
            <h2>
              代码演示
              <Icon type="appstore" />
            </h2>
          </section>
          <div className="code-box-wrapper">
            {data.map((item, index) => {
              return (
                <section className="code-box" key={index}>
                  <section className="code-box-demo">{<item.component />}</section>
                  <CodeMeta item={item} />
                  <section className="highlight-wrapper">
                    <div className="highlight">
                      <Highlight className="javascript,js,jsx">{item.code}</Highlight>
                    </div>
                  </section>
                </section>
              )
            })}
          </div>
        </article>
      </div>
    </div>
  )
}

export default MainContent
