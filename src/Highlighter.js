/* @flow */
import { findAll } from 'highlight-words-core'
import PropTypes from 'prop-types'
import { createElement } from 'react'
import memoizeOne from 'memoize-one'

Highlighter.propTypes = {
  activeClassName: PropTypes.string,
  activeIndex: PropTypes.number,
  activeStyle: PropTypes.object,
  autoEscape: PropTypes.bool,
  className: PropTypes.string,
  findChunks: PropTypes.func,
  highlightClassName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  highlightStyle: PropTypes.object,
  highlightTag: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  sanitize: PropTypes.func,
  searchWords: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(RegExp)
    ])
  ).isRequired,
  textToHighlight: PropTypes.string.isRequired,
  unhighlightClassName: PropTypes.string,
  unhighlightStyle: PropTypes.object
}

/**
 * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
 * This function returns an array of strings and <span>s (wrapping highlighted words).
 */
export default function Highlighter ({
  activeClassName = '',
  activeIndex = -1,
  activeStyle,
  autoEscape,
  caseSensitive = false,
  className,
  findChunks,
  highlightClassName = '',
  highlightStyle = {},
  highlightTag = 'mark',
  sanitize,
  searchWords,
  textToHighlight,
  unhighlightClassName = '',
  unhighlightStyle,
  ...rest
}) {
  const chunks = findAll({
    autoEscape,
    caseSensitive,
    findChunks,
    sanitize,
    searchWords,
    textToHighlight
  })
  const HighlightTag = highlightTag
  let highlightIndex = -1
  let highlightClassNames = ''
  let highlightStyles

  const lowercaseProps = object => {
    const mapped = {}
    for (let key in object) {
      mapped[key.toLowerCase()] = object[key]
    }
    return mapped
  }
  const memoizedLowercaseProps = memoizeOne(lowercaseProps)

  return createElement('span', {
    className,
    ...rest,
    children: chunks.map((chunk, index) => {
      console.log(textToHighlight)
      const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start)

      let isMatch = false

      let re = new RegExp(/[À-üA-Za-z]/g)

      if (index && index < chunks.length - 1) {
        const textStart = textToHighlight.substr(chunks[index - 1].start, chunks[index - 1].end - chunks[index - 1].start)
        const textEnd = textToHighlight.substr(chunks[index + 1].start, chunks[index + 1].end - chunks[index + 1].start)
        console.log(textStart[textStart.length - 1])
        let i = textStart[textStart.length - 1].match(re)
        let j = textEnd[0].match(re)
        if (i || j) isMatch = true
      }


      if (chunk.highlight && !isMatch) {
        highlightIndex++

        let highlightClass
        if (typeof highlightClassName === 'object') {
          if (!caseSensitive) {
            highlightClassName = memoizedLowercaseProps(highlightClassName)
            highlightClass = highlightClassName[text.toLowerCase()]
          } else {
            highlightClass = highlightClassName[text]
          }
        } else {
          highlightClass = highlightClassName
        }

        const isActive = highlightIndex === +activeIndex

        highlightClassNames = `${highlightClass} ${isActive ? activeClassName : ''}`
        highlightStyles = isActive === true && activeStyle != null
          ? Object.assign({}, highlightStyle, activeStyle)
          : highlightStyle

        const props = {
          children: text,
          className: highlightClassNames,
          key: index,
          style: highlightStyles
        }

        // Don't attach arbitrary props to DOM elements; this triggers React DEV warnings (https://fb.me/react-unknown-prop)
        // Only pass through the highlightIndex attribute for custom components.
        if (typeof HighlightTag !== 'string') {
          props.highlightIndex = highlightIndex
        }

        return createElement(HighlightTag, props)
      } else {
        return createElement('span', {
          children: text,
          className: unhighlightClassName,
          key: index,
          style: unhighlightStyle
        })
      }
    })
  })
}
