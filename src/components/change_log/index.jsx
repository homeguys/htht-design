import React from 'react'
import { Timeline } from 'antd'
import DocContent from '../../site/template/doc_content'
import changes from './config'
import './style.scss'

function ChangeLog () {
  return (
    <DocContent>
      <div className='change-log'>
        <h1>更新日志</h1>
        <section className='time-line'>
          <Timeline>
            {changes.map(change => {
              return (
                <Timeline.Item color='green' key={change.edition}>
                  <div className='change-detail'>
                    <h1 className='edition'>{change.edition}</h1>
                    <p className='change-date'>
                      <span>{change.changeDate}</span>
                    </p>
                    <ul>
                      {change.list &&
                        change.list.map((item, index) => {
                          return <li key={index}>{item}</li>
                        })}
                    </ul>
                  </div>
                </Timeline.Item>
              )
            })}
          </Timeline>
        </section>
      </div>
    </DocContent>
  )
}

export default ChangeLog
