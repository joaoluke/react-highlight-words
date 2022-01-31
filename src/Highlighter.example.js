import latinize from 'latinize'
import React, { Component } from 'react'
import Highlighter from './Highlighter'
import styles from './Highlighter.example.css'

export default class HighlighterExample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      searchText: 'separation.',
      textToHighlight: `A etapa fechada foi iniciada para o item 71. Fornecedor que apresentou lance entre R$ 19,9800 e R$ 21,5000 poderá enviar um lance único e fechado até às 14:13:35 do dia, teste push registro contratação encontrada data, teste push Wavecodetéste 83.869.954/0001-62, A etapa fechada foi iniciada para o item 71. Fornecedor que apresentou lance entre R$ 19,9800 e R$ 21,5000 poderá enviar um lance único e fechado até às 14:13:35 do dia 31/01/2022.`,
      activeIndex: -1,
      caseSensitive: false
    }
  }
  render () {
    const { ...props } = this.props
    const { activeIndex, caseSensitive, searchText, textToHighlight } = this.state
    const searchWords = [
      "54.545.454/5454-54",
      "54545454545454",
      "65.019.044/0001-09",
      "65019044000109",
      "83.083.611/0001-78",
      "83.869.954/0001-62",
      "83083611000178",
      "83869954000162",
      "Wavecodeteste",
      "Wavecodeteste ME10",
      "Wavecodeteste ME11",
      "Wavecodeteste ME20",
      "Wavecodeteste ME4",
      "Wavecodetéste",
      "Wavecodetéste ME20",
      "ata",
      "classificado",
      "data",
      "documentação",
      "enviar",
      "errado",
      "exo",
      "prego",
      "recurso",
      "recursos",
      "registro",
      "tem"
    ]
    

    return (
      <div {...props}>
        <div className={styles.Row}>
          <div className={styles.FirstColumn}>
            <h4 className={styles.Header}>
              Search terms
            </h4>
            <input
              className={styles.Input}
              name='searchTerms'
              value={searchText}
              onChange={event => this.setState({ searchText: event.target.value })}
            />
          </div>
          <div className={styles.SecondColumn}>
            <h4 className={styles.Header}>
              Active Index
            </h4>
            <input
              className={styles.Input}
              name='activeIndex'
              value={activeIndex}
              onChange={event => this.setState({ activeIndex: parseInt(event.target.value, 10) })}
              type='number'
            />
          </div>
          <div className={styles.SecondColumn}>
            <h4 className={styles.Header}>
              Case Sensitive?
            </h4>
            <input
              checked={caseSensitive}
              className={styles.Input}
              name='caseSensitive'
              onChange={event => this.setState({ caseSensitive: event.target.checked })}
              type='checkbox'
            />
          </div>
        </div>

        <h4 className={styles.Header}>
          Body of Text
        </h4>
        <textarea
          className={styles.Input}
          name='textToHighlight'
          value={textToHighlight}
          onChange={event => this.setState({ textToHighlight: event.target.value })}
        />

        <h4 className={styles.Header}>
          Output
        </h4>

        <Highlighter
          activeClassName={styles.Active}
          activeIndex={activeIndex}
          caseSensitive={caseSensitive}
          highlightClassName={styles.Highlight}
          highlightStyle={{ fontWeight: 'normal' }}
          sanitize={latinize}
          searchWords={searchWords}
          textToHighlight={textToHighlight}
        />

        <p className={styles.Footer}>
          <a href='https://github.com/bvaughn/react-highlight-words/blob/master/src/Highlighter.example.js'>
            View the source
          </a>
        </p>
      </div>
    )
  }
}
