export const GRAPHQL_HTTP_ENDPOINT = {
    production: 'https://graphql.javascriptpractice.com',
    staging: 'https://graphql.javascriptpractice.com',
    development: 'http://localhost:4000'
}[window.process.env.NODE_ENV];

export const STRIPE_PUBLIC_KEY = {
    production: 'pk_live_DedmZk7SWzaSAFSKCCDlFyZi',
    staging: 'pk_live_DedmZk7SWzaSAFSKCCDlFyZi',
    development: 'pk_test_Deq4Kig1vsbwSZmXc3yBn2wf'
}[window.process.env.NODE_ENV];

export const DEFAULT_ASSESSMENT_ID = {
    production: 'cjnwajfsl5y740995lkooz1up',
    staging: 'cjnwajfsl5y740995lkooz1up',
    development: 'cjmjovn4p00hi0a58cfsjusdq'
}[window.process.env.NODE_ENV];

export const highlightColorCSSValue = `rgba(240, 219, 79, 1)`;
export const backgroundColorCSSValue = `rgba(229, 229, 229, 1)`;
export const selectedColorCSSValue = `rgba(200, 200, 200, 1)`;
export const zIndexLayerNegative1 = '-1';
export const zIndexLayer0 = '0';
export const zIndexLayer1 = '1';
export const zIndexLayer2 = '2';
export const zIndexLayer3 = '3';
export const zIndexLayer4 = '4';
export const zIndexLayer5 = '5';
export const zIndexLayer6 = '6';
export const zIndexLayer7 = '7';
export const zIndexLayer8 = '8';

export const menuItemCSSProperties = `
    position: relative;
    flex-grow: 1;
    padding: 2em;
    cursor: pointer;
    transition: background-color .5s ease;
    font-weight: bold;
    font-size: calc(12px + 1vmin);
`;

export const authenticationInputCSSClass = `
    .authentication-input {
        font-family: monospace;
        font-size: calc(20px + 1vmin);
        padding: calc(12px + 1vmin);
        border: none;
        box-shadow: 0px 0px 1px grey;
        background-color: ${selectedColorCSSValue};
    }
`;

export const authenticationInputsContainerCSSClass = `
    .authentication-inputs-container {
        display: grid;
        padding-top: 10vh;
    }
`;

export const authenticationInputRowCSSClass = `
    .authentication-input-row {
        padding-bottom: 5vh;
        text-align: center;
    }
`;

export const jpContainerCSSClass = (state: any) => `
    .jp-container {
        overflow-y: auto;
        overflow-wrap: break-word;
        font-size: calc(12px + 1vmin);
        width: ${state.desktopScreen ? '75%' : '96%'};
        margin-left: ${state.desktopScreen ? 'auto' : '2%'};
        margin-right: ${state.desktopScreen ? 'auto' : '2%'};
        height: 100%;
    }
`;

export const NO_MORE_EXERCISES = 'NO_MORE_EXERCISES';
export const CREATE_ASSESSMENT = 'CREATE_ASSESSMENT';