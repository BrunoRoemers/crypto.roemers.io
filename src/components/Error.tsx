import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const Error = () => {
  const error = useRouteError()

  // special treatment for 404s
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (<p>404: Page not found, go back to the <a href="/" className="underline">home page</a>.</p>)
  }

  console.info('error received:', error)
  return (<p>error... (see console)</p>)
}

export default Error