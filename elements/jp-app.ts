import {html, render} from 'lit-html';
import './jp-concept-map';
import 'prendus-question-elements/prendus-view-question.ts';
import {Store} from '../services/store';

class JPApp extends HTMLElement {

    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });

        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    nextQuestionClick() {
        window.location.href = 'plans-and-pricing.html';
    }

    questionResponse(e: any) {
        Store.dispatch({
            type: 'UPDATE_NUM_USER_COMPLETED_QUESTIONS',
            correct: e.detail.checkAnswerResponse === 'Correct'
        });
    }

    render(state: any) {
        return html`
            <style>
                /* This is just to hack the input boxes temporarily */
                span {
                    min-width: 100px !important;
                }

                .main-grid {
                    display: grid;
                    grid-template-columns: 20em 100vw;
                }

                .question-container {
                    margin-top: 10vh;
                    width: 75em;
                    height: 25vh;
                    margin-left: 10vw;
                }

                .question-wrapper {
                    background-color: white;
                    padding: 5em;
                    position: relative;
                    box-shadow: 0px 0px 1px black;
                }

                .next-question-button {
                    position: absolute;
                    right: 0;
                    bottom: -75px;
                    border: none;
                    background-color: white;
                    padding: 1.5em;
                    cursor: pointer;
                    font-family: monospace;
                    transition: background-color .5s ease;
                    color: black;
                    box-shadow: 0px 0px 1px black;
                }

                .next-question-button:hover {
                    background-color: rgba(1, 1, 1, .05);
                }

                .javascript-logo {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    width: 50px;
                    padding: 5px;
                    box-shadow: 0px 0px 5px black;
                }
            </style>

            <div class="main-grid">
                <jp-concept-map></jp-concept-map>

                <div class="question-container">
                    <div class="question-wrapper">
                        <prendus-view-question .question=${state.currentQuestion} @question-response=${(e: any) => this.questionResponse(e)}>Loading...</prendus-view-question>
                        <button class="next-question-button" @click=${(e: any) => this.nextQuestionClick()}>Next question</button>
                    </div>
                </div>
            </div>

            <a href="/">
                <img src="javascript-logo.png" class="javascript-logo">
            </a>
        `;
    }
}

window.customElements.define('jp-app', JPApp);
