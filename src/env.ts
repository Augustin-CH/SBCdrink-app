declare global {
  interface Window {
    env: any
  }
}

// change with your own variables
interface EnvType {
  REACT_APP_ENABLE_REDUX_DEV_TOOLS: string
  REACT_APP_ENVIRONMENT: string
  REACT_APP_WEBSITE_DOMAIN: string
  REACT_APP_API_URL: string
  REACT_APP_SUPABASE_URL: string
  REACT_APP_SUPABASE_ANON_KEY: string
}
export const env: EnvType = { ...process.env, ...window?.env }
