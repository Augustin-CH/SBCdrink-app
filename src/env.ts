declare global {
    interface Window {
        env: any
    }
}

// change with your own variables
type EnvType = {
    REACT_APP_ENABLE_REDUX_DEV_TOOLS: string,
    REACT_APP_ENVIRONMENT: string,
    REACT_APP_WEBSITE_DOMAIN: string,
    REACT_APP_API_URL: string,
}
export const env: EnvType = {...process.env, ...window?.env}
