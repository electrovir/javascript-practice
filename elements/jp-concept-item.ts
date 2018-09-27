import {html, render} from 'lit-html';
import {Store} from '../services/store';
import {highlightColor, selectedColor} from '../services/constants';

class JPConceptItem extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
        
        setTimeout(() => {
            Store.dispatch({
                type: 'TRIGGER_RENDER'
            });
        });
    }

    render(state: any) {
        //TODO this will all be done on the server
        // const numTotalQuestions = Object.values(state.questions).length;
        // const numUserCompletedQuestions = Object.values(state.questions).reduce((result, question) => {
        //     return result + (question.userCompleted === true ? 1 : 0);
        // }, 0);
        // const percentage = (numUserCompletedQuestions / numTotalQuestions) * 100;
        const percentage = 0;

        return html`
            <style>
                .concept {
                    position: relative;
                    flex-grow: 1;
                    padding: 2em;
                    cursor: pointer;
                    transition: background-color .5s ease;
                    font-weight: bold;
                    font-size: calc(12px + 1vmin);
                }

                .concept:hover {
                    background-color: ${highlightColor};
                }

                .concept-focused {
                    background-color: ${selectedColor};
                }

                .concept-overlay {
                    position: absolute;
                    height: 100%;
                    background-color: rgba(6, 150, 14, .5);
                    top: 0;
                    left: 0;
                    z-index: -1;
                }
            </style>

            <div class="concept${state.currentConcept && state.currentConcept.id === this.id ? ' concept-focused' : ''}">
                ${this.title}
                <div class="concept-overlay" style="width: ${percentage}%">
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-concept-item', JPConceptItem);
