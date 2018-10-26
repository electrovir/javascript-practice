import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { request } from '../services/graphql';
import { jpContainerCSSClass } from '../services/constants';
import page from 'page';

class JPAssessmentEdit extends HTMLElement {
    _assessmentId: string = '';

    set assessmentId(val: string) {
        this._assessmentId = val;
        this.loadAssessment(val);
    }

    get assessmentId() {
        return this._assessmentId;
    }

    connectedCallback() {
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

    async submit() {
        const conceptSelect = this.querySelector(`#concept-select`);
        const orderInput = this.querySelector(`#order-input`);
        const assessMLTextarea = this.querySelector(`#assessml-textarea`);
        const javaScriptTextarea = this.querySelector(`#javascript-textarea`);

        const conceptId = conceptSelect ? conceptSelect.value : null;
        const order = orderInput ? parseInt(orderInput.value) : null;
        const assessML = assessMLTextarea ? assessMLTextarea.value : null;
        const javaScript = javaScriptTextarea ? javaScriptTextarea.value : null;

        const response = await request(`
            mutation(${this.assessmentId ? `$assessmentId: ID!, ` : ''}$conceptId: ID!, $order: Int!, $assessML: String!, $javaScript: String!) {
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
            javaScript
        });

        if (response) {
            //TODO use the notification system
            alert('Question saved successfully');

            if (!this.assessmentId) {
                page(`/assessment/${response.createAssessment.id}/edit`);
            }
        }
    }

    viewClick() {
        page(`/assessment/${this.assessmentId}/view`);
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <!--TODO fix scrollbars, make this all responsive-->
            <div class="jp-container" style="height: 100%">
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

                <div>
                    <h1>AssessML</h1>
                    <textarea id="assessml-textarea" style="width: 100%; height: 50vh; font-size: 2em">${this.assessML}</textarea>
                </div>

                <div>
                    <h1>JavaScript</h1>
                    <textarea id="javascript-textarea" style="width: 100%; height: 50vh; font-size: 2em">${this.javaScript}</textarea>
                </div>

                <div>
                    <button @click=${(e: any) => this.viewClick()}>View</button>
                    <button @click=${(e: any) => this.submit()}>Submit</button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-assessment-edit', JPAssessmentEdit);