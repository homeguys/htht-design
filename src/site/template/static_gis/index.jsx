/* eslint-disable react/no-array-index-key */
import React from 'react'
import Highlight from '../highlight'
import './style.scss'
import DocContent from '../doc_content'


function StaticContent(props) {
  const { codes, desc} = props

  return (
    <DocContent>
      <div id='gis-static-content'>
        <div className='gis-static-block'>
          <h1>{desc.title.value}</h1>
          <Highlight className="javascript,js,jsx">{codes[0]}</Highlight>
          <p>{desc.title.detail}</p>
        </div>
        <div className='gis-static-block'>
          <h2>{desc.Overview.value}</h2>
          <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Summary</th>
            </tr>
            </thead>
            <tbody>
            {desc.Overview.table.map((value, index) => {
              return (<tr key={index}>
                <td>{value.Name}</td>
                <td>{value.Type}</td>
                <td>{value.Summary}</td>
              </tr>)
            })
            }
            </tbody>
          </table>
        </div>
        <div className='gis-static-block'>
          <h2>{desc.Details.value}</h2>
          {desc.Details.content.map((value, index) => {
            return (<div key={index}>
              <h3>{value.title}</h3>
              <p>{value.detail}</p>
              <Highlight className="javascript,js,jsx">{codes[index+1]}</Highlight>
            </div>)
          })}
        </div>
      </div>
    </DocContent>
  )
}

export default StaticContent
