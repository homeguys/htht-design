/* eslint-disable react/no-array-index-key */
import React from 'react'
import { Icon, BackTop } from 'antd'
import Highlight from '../highlight'
import DocContent from '../doc_content'
import CodeMeta from '../code_meta'
import ApiTable from '../api_table'
import './style.scss'

function MainContent(props) {
  const { mainDesc, data, tableData } = props

  return (
    <DocContent>
      <article>
        <section className="content-title">
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
        <ApiTable dataSource={tableData} />
      </article>
      <BackTop target={() => document.getElementById('htht-main-content')} />
    </DocContent>
  )
}

export default MainContent
