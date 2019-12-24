/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import Clipboard from 'react-clipboard.js'
import { Tooltip } from 'antd'
import { getParents } from '../../../utils/utils'

function CodeMeta(props) {
  const [copyTips, setCopyTips] = useState('复制代码')
  const [copyClass, setCopyClass] = useState('icon-copy')

  // 复制代码成功
  const onSuccess = () => {
    setCopyTips('复制成功')
    setCopyClass('icon-done')
  }

  // 鼠标离开复制按钮
  const leaveCopyBtn = () => {
    setCopyTips('复制代码')
    setCopyClass('icon-copy')
  }

  // 收缩展示代码
  const toggleCode = e => {
    const codeBox = getParents(e.target, '.code-box')
    console.warn(codeBox)
    codeBox.classList.toggle('expend')
    // eslint-disable-next-line no-unused-expressions
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty()
  }

  const { item } = props
  let { desc } = item
  const defaultDesc = {
    title: '',
    detail: ''
  }

  if (!desc) {
    desc = defaultDesc
  }

  const { title } = desc // demo 标题
  const { detail } = desc // demo 详情

  return (
    <section className="code-box-meta">
      <div className="code-box-title">
        <b>{title}</b>
      </div>
      <div className="code-box-description">
        <div>
          <p>{detail}</p>
        </div>
      </div>
      <div className="code-box-actions">
        <Clipboard data-clipboard-text={item.code} onSuccess={onSuccess}>
          <Tooltip title={copyTips}>
            <i className={copyClass} onMouseLeave={leaveCopyBtn} />
          </Tooltip>
        </Clipboard>

        <Tooltip title="展开代码">
          <i className="icon-expend" onClick={toggleCode} />
        </Tooltip>
      </div>
    </section>
  )
}

export default CodeMeta
