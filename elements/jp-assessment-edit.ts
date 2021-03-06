import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import page from 'page';
import 'assess-elements/assess-item-editor.ts';
import 'assess-elements/assess-item.ts';
import { CREATE_ASSESSMENT } from '../services/constants';
import { loadUser } from '../services/init';

class JPAssessmentEdit extends HTMLElement {
    _assessmentId: string = '';

    set assessmentId(val: string) {
        if (val === CREATE_ASSESSMENT) {
            return;
        }

        this._assessmentId = val;
        this.loadAssessment(val);
    }

    get assessmentId() {
        return this._assessmentId;
    }

    constructor() {
        super();

        // this is here in case the element is used in a template where its properties are set before its upgraded
        // apparently before the upgrade properties will be set on the prototype of the element, thus when the upgrade occurs
        // the property does not trigger the setter on the element itself
        const assessmentId = this.assessmentId;
        delete this.assessmentId;
        this.assessmentId = assessmentId;
    }

    async connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));

        setTimeout(() => {
            Store.dispatch({
                type: 'HIDE_GLOBAL_LOAD_INDICATOR'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });
        });
    }
    
    async loadAssessment(assessmentId: string) {
        const response = await request(`
            query($assessmentId: ID!) {
                assessment(where: {
                    id: $assessmentId
                }) {
                    assessML
                    javaScript
                    order
                    concept {
                        id
                        title
                    }
                }
            }
        `, {
            assessmentId
        });

        //TODO local redux
        this.assessML = response.assessment.assessML;
        this.javaScript = response.assessment.javaScript;
        this.order = response.assessment.order;
        this.concept = response.assessment.concept;

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    async save() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const conceptSelect = this.querySelector(`#concept-select`);
        const orderInput = this.querySelector(`#order-input`);
        const assessItemEditor = this.querySelector('#assess-item-editor');

        const conceptId = conceptSelect ? conceptSelect.value : null;
        const order = orderInput ? parseInt(orderInput.value) : null;
        const assessML = assessItemEditor.assessML;
        const javaScript = assessItemEditor.javaScript;

        const response = await request(`
            mutation(${this.assessmentId ? `$assessmentId: ID!, ` : ''}$conceptId: ID!, $order: Int!, $assessML: String!, $javaScript: String! ${this.assessmentId ? '' : ', $userId: ID!'}) {
                ${this.assessmentId ? `
                    updateAssessment(data: {
                        concept: {
                            connect: {
                                id: $conceptId
                            }
                        }
                        order: $order
                        assessML: $assessML
                        javaScript: $javaScript
                    }, where: {
                        id: $assessmentId
                    }) {
                        id
                    }
                ` : `
                    createAssessment(data: {
                        concept: {
                            connect: {
                                id: $conceptId
                            }
                        }
                        order: $order
                        assessML: $assessML
                        javaScript: $javaScript
                        verified: false
                        author: {
                            connect: {
                                id: $userId
                            }
                        }
                    }) {
                        id
                    }
                `}
            }
        `, {
            assessmentId: this.assessmentId,
            conceptId,
            order,
            assessML,
            javaScript,
            userId: Store.getState().user ? Store.getState().user.id : ''
        });

        if (response) {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Question saved successfully'
            });

            if (response.createAssessment) {
                const tokenRewardResponse = await request(`
                    query {
                        tokenReward(where: {
                            type: ASSESSMENT_SUBMITTED
                        }) {
                            amount
                        }
                    }
                `);

                Store.dispatch({
                    type: 'ADD_NOTIFICATION',
                    notification: `+${tokenRewardResponse.tokenReward.amount} ${tokenRewardResponse.tokenReward.amount === 1 ? 'token' : 'tokens'}`
                });

                await loadUser();
            }

            if (!this.assessmentId) {
                page(`/assessment/${response.createAssessment.id}/view`);
            }
        }

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    assessMLChanged(e) {
        this.assessML = e.detail.value;
        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    javaScriptChanged(e) {
        this.javaScript = e.detail.value;
        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    submit() {
        const assessItem = this.querySelector('#assess-item');
        assessItem.checkAnswer();
    }

    questionResponse(e) {
        Store.dispatch({
            type: 'ADD_NOTIFICATION',
            notification: e.detail.checkAnswerResponse
        });
    }

    showExercise() {
        const assessItem = this.querySelector('#assess-item');
        assessItem.showExercise();

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    showSolution() {
        const assessItem = this.querySelector('#assess-item');
        assessItem.showSolution();

        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    render(state: any) {
        return html`
            <div>
                <div>
                    <select id="concept-select" .value=${this.concept ? this.concept.id : ''}>
                        ${state.concepts.map((concept: any) => {
                            return html`<option value=${concept.id}>${concept.title}</option>`;
                        })}
                    </select>
                </div>

                <div>
                    order: <input id="order-input" type="number" value=${this.order}>
                </div>

                <br>

                <div style="background-color: white">
                    <assess-item-editor
                        id="assess-item-editor"
                        .assessML=${this.assessML || ''}
                        .javaScript=${this.javaScript || ''}
                        @assessml-changed=${(e) => this.assessMLChanged(e)}
                        @java-script-changed=${(e) => this.javaScriptChanged(e)}
                    ></assess-item-editor>
                </div>

                <br>

                <assess-item
                    id="assess-item"
                    @question-response=${(e) => this.questionResponse(e)}
                    .question=${{
                        assessML: this.assessML || '',
                        javaScript: this.javaScript || ''
                    }}
                ></assess-item>

                <button @click=${() => this.submit()}>Submit</button>
                <button ?hidden=${this.querySelector('#assess-item') && this.querySelector('#assess-item').showingExercise} @click=${() => this.showExercise()}>Show exercise</button>
                <button ?hidden=${this.querySelector('#assess-item')&& this.querySelector('#assess-item').showingSolution} @click=${() => this.showSolution()}>Show solution</button>

                <br>

                <div>
                    <button @click=${(e: any) => this.save()}>Save</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment-edit', JPAssessmentEdit);