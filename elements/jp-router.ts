import {html, render} from 'lit-html';
import {Store} from '../services/store';
import page from 'page';
import './jp-assessment';
import './jp-assessment-create';
import './jp-login';
import './jp-signup';
import './jp-profile';
import './jp-token-overview';
import './jp-token-earn';
import './jp-token-buy';

page('/:entity/:id/:behavior', (context: any) => {
    Store.dispatch({
        type: 'SET_ROUTE',
        entity: context.params.entity,
        entityId: context.params.id,
        entityBehavior: context.params.behavior,
        routePath: context.path
    });
});

page('/:entity/:behavior', (context: any) => {
    Store.dispatch({
        type: 'SET_ROUTE',
        entity: context.params.entity,
        entityBehavior: context.params.behavior,
        routePath: context.path
    });
});

page();

class JPRouter extends HTMLElement {
    connectedCallback() {
        Store.subscribe(() => render(this.render(Store.getState()), this));
    }

    render(state: any) {
        const routes = {
            assessment: {
                view: html`<jp-assessment .assessmentId=${state.currentEntityId}></jp-assessment>`,
                create: html`<jp-assessment-create></jp-assessment-create>`
            },
            user: {
                login: html`<jp-login></jp-login>`,
                signup: html`<jp-signup></jp-signup>`,
                profile: html`<jp-profile></jp-profile>`
            },
            token: {
                overview: html`<jp-token-overview></jp-token-overview>`,
                buy: html`<jp-token-buy></jp-token-buy>`,
                earn: html`<jp-token-earn></jp-token-earn>`
            }
        };

        return routes[state.currentEntity][state.currentEntityBehavior];
    }
}

window.customElements.define('jp-router', JPRouter);