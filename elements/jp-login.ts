import { html, render } from 'lit-html';
import { Store } from '../services/store';
import {
    authenticationInputCSSClass,
    authenticationInputsContainerCSSClass,
    authenticationInputRowCSSClass
} from '../services/constants';
import { request } from '../services/graphql';
import './jp-button';
import page from 'page';

class JPLogin extends HTMLElement {
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

    async loginClick() {
        Store.dispatch({
            type: 'SHOW_LOAD_INDICATOR'
        });

        const email = this.querySelector('#login-email-input').value;
        const password = this.querySelector('#login-password-input').value;

        if (email === '') {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Email cannot be empty'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        if (password === '') {
            Store.dispatch({
                type: 'ADD_NOTIFICATION',
                notification: 'Password cannot be empty'
            });

            Store.dispatch({
                type: 'HIDE_LOAD_INDICATOR'
            });

            return;
        }

        //TODO we should somehow combine this with init/load-user, because we're repeating the user selection/loading in 3 places
        const loginResponse = await request(`
            mutation($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                    user {
                        id
                        email
                        tokens
                        termsAcceptedVersion
                        assessmentInfos {
                            assessment {
                                concept {
                                    id
                                }
                            }
                            answeredCorrectly
                        }
                    }
                    jwt
                }
            }
        `, {
            email,
            password
        });

        if (loginResponse && loginResponse.login.jwt) {
            Store.dispatch({
                type: 'LOGIN_USER',
                user: loginResponse.login.user,
                userJWT: loginResponse.login.jwt
            });

            const termsAndPrivacyVersionResponse = await request(`
                query {
                    constant(where: {
                        key: TERMS_AND_PRIVACY_VERSION
                    }) {
                        value
                    }
                }
            `);

            if (loginResponse.login.user.termsAcceptedVersion !== termsAndPrivacyVersionResponse.constant.value) {
                page('/legal/accept-new-terms');
                return;
            }

            page(`/assessment/${Store.getState().currentAssessment.id}/view`);
        }

        Store.dispatch({
            type: 'HIDE_LOAD_INDICATOR'
        });
    }

    passwordInputKeydown(e: any) {
        if (e.keyCode === 13) {
            this.loginClick();
        }
    }

    render(state: any) {
        return html`
            <style>
                ${authenticationInputCSSClass}
                ${authenticationInputsContainerCSSClass}
                ${authenticationInputRowCSSClass}
            </style>

            <div class="authentication-inputs-container">
                <div class="authentication-input-row">
                    <input id="login-email-input" type="text" class="authentication-input" placeholder="email">
                </div>

                <div class="authentication-input-row">
                    <input
                        id="login-password-input"
                        type="password"
                        class="authentication-input"
                        placeholder="password"
                        @keydown=${(e: any) => this.passwordInputKeydown(e)}
                    >
                </div>

                <div class="authentication-input-row">
                    <jp-button @click=${() => this.loginClick()} .text=${"Login"}></jp-button>
                </div>
            </div>
        `;
    }
}

window.customElements.define('jp-login', JPLogin);