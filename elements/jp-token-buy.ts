import { html, render } from 'lit-html';
import { Store } from '../services/store';
import { jpContainerCSSClass } from '../services/constants';
import './jp-button';

class JPTokenBuy extends HTMLElement {
    price: string = '$5.00';

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

    buyNowClick() {
        Store.dispatch({
            type: 'ADD_NOTIFICATION',
            notification: 'Your credit card has been charged $100,000,000...thank you'
        });
    }

    numTokenInput(e: any) {
        this.price = isNaN(parseInt(e.target.value)) ? '' : `$${(parseInt(e.target.value) * .1).toFixed(2)}`;
        Store.dispatch({
            type: 'TRIGGER_RENDER'
        });
    }

    render(state: any) {
        return html`
            <style>
                ${jpContainerCSSClass(state)}
            </style>

            <div class="jp-container">
                <h1>Buy tokens</h1>
                <h2>1 token = $0.10</h2>
                <div>
                    <input
                        type="number"
                        value="50"
                        style="font-size: calc(12px + 1vmin)"
                        min="50"
                        @input=${(e: any) => this.numTokenInput(e)}
                    >
                </div>
                <div>${this.price}</div>
                <jp-button @click=${() => this.buyNowClick()} style="cursor: pointer" .text=${"Buy now"}></jp-button>
            </div>
        `;
    }
}

window.customElements.define('jp-token-buy', JPTokenBuy);