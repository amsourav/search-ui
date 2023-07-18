import React from 'react';
import { callApi } from './api';
import { get } from 'lodash';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isInputSelected: false, // Should open list?
      activeIndex: 0, // Which li is selected
      suggestionLength: 0, // store length of suggestion
      suggestion: [], // store all suggestion
      suggestionCompleted: '',
    };
  }
  handleKeys = (e) => {
    const { activeIndex, suggestionCompleted } = this.state;
    switch (e.keyCode) {
      // go down
      case 40: {
        this.setState(
          {
            activeIndex: activeIndex == null ? 0 : activeIndex + 1, // Increase index of selected suggesstion
          },
          () => {
            try {
              const suggestedText =
                document.getElementsByClassName('active')[0].innerText || '';
              this.refs.searchBar.value =
                suggestionCompleted + suggestedText + ' ';
            } catch (e) {
              console.log(e); // some times there is no active class in DOM
              return;
            }
          }
        );
        break;
      }
      // go up
      case 38: {
        this.setState(
          {
            activeIndex: activeIndex == null ? 0 : activeIndex - 1, // Decrease index of selected suggesstion
          },
          () => {
            try {
              const suggestedText =
                document.getElementsByClassName('active')[0].innerText || '';
              this.refs.searchBar.value =
                suggestionCompleted + suggestedText + ' ';
            } catch (e) {
              console.log(e); // some times there is no active class in DOM
              return;
            }
          }
        );
        break;
      }
      // escape / enter, Show list only if input is selected
      // escape/enter removes focos from input
      case 27:
      case 13: {
        const suggestedText =
          document.getElementsByClassName('active').length > 0
            ? document.getElementsByClassName('active')[0].innerText
            : '';
        this.setState({
          isInputSelected: true,
          suggestionCompleted: suggestionCompleted + suggestedText + ' ',
        });
        break;
      }
      default:
        break;
    }
  };
  handleChange = async (e) => {
    // Use async/await to deal with promise callback
    const { value: text } = e.target;
    if (text === '') {
      // Make no call with empty input and reset all variables
      this.setState({
        activeIndex: 0,
        suggestionLength: 0,
        suggestion: [],
        isInputSelected: false,
        suggestionCompleted: '',
      });
      return;
    }
    const updatedText = text.replace(this.state.suggestionCompleted, '');
    const suggestion = await callApi(updatedText); // make suggestion api call
    this.setState({
      activeIndex: null,
      suggestionLength: suggestion.length,
      suggestion,
      isInputSelected: false,
    });
  };

  handleMouseClick = (e) => {
    const { suggestionCompleted } = this.state;
    const suggestedText = e.target.innerText;
    this.refs.searchBar.value = suggestionCompleted + suggestedText + ' '; // Add empty space at end of election
    this.setState({
      isInputSelected: true,
      suggestionCompleted: suggestionCompleted + suggestedText + ' ',
    });
  };

  render() {
    const { activeIndex, suggestionLength, isInputSelected } = this.state;

    return (
      <div className="ac">
        <input
          className="input"
          // contentEditable
          ref="searchBar"
          onInput={this.handleChange}
          onKeyUp={this.handleKeys}
        />
        {get(this, 'state.suggestion', []).length > 0 && !isInputSelected ? (
          <ol>
            {this.state.suggestion.map((s, i) => (
              <li
                key={`sugg-${i}`}
                onClick={this.handleMouseClick}
                className={
                  (i === activeIndex % suggestionLength ||
                    -i === activeIndex % suggestionLength) &&
                  activeIndex !== null
                    ? 'active'
                    : ''
                } // Set active class on appropriate li
                dangerouslySetInnerHTML={{
                  __html: s,
                }}
              />
            ))}
          </ol>
        ) : null}
      </div>
    );
  }
}

export default Search;
