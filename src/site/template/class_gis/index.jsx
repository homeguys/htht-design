/* eslint-disable react/no-array-index-key */
import React from 'react'
import './style.scss'
import Highlight from '../highlight'

function ClassContent (props) {
  const { codes, desc } = props
  return (
    <div id='gis-class-content'>
      <div className='gis-class-block'>
        <h1>{desc.title.value}</h1>
        <Highlight className="javascript,js,jsx">{codes[0]}</Highlight>
        <p>{desc.title.detail}</p>
      </div>
      <div className='gis-class-block'>
        <h2>{desc.Constructors.value}</h2>
        <p>Example:</p>
        <Highlight className="javascript,js,jsx">{codes[1]}</Highlight>
      </div>
      <div className='gis-class-block'>
        <h2>{desc.PropertyOverview.value}</h2>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Summary</th>
          </tr>
          </thead>
          <tbody>
          {desc.PropertyOverview.table.map((value, index) => {
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
      <div className='gis-class-block'>
        <h2>{desc.PropertyDetails.value}</h2>
        {desc.PropertyDetails.content.map((value, index) => {
          return (<div key={index}>
            <h3>{value.title}</h3>
            <p>{value.detail}</p>
            <p>Example:</p>
            <Highlight className="javascript,js,jsx">{codes[index + 2]}</Highlight>
          </div>)
        })}
      </div>
      <div className='gis-class-block'>
        <h2>{desc.MethodOverview.value}</h2>
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Return Type</th>
            <th>Summary</th>
          </tr>
          </thead>
          <tbody>
          {desc.MethodOverview.table.map((value, index) => {
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
      <div className='gis-class-block'>
        <h2>{desc.MethodDetails.value}</h2>
        <Highlight className="javascript,js,jsx">{codes[1]}</Highlight>
        <p>{desc.MethodDetails.detail}</p>
      </div>
    </div>
  )
}

export default ClassContent
