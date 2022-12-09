import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import App from './App'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme/theme'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import './i18n'
import CssBaseline from '@material-ui/core/CssBaseline'
import WebsocketContainer from './components/containers/WebsocketContainer'
import UserContainer from './components/containers/UserContainer'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContainer>
        <WebsocketContainer host={'http://localhost:9000/chat(ws)'}>
          <CssBaseline/>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <BrowserRouter>
                <App/>
              </BrowserRouter>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </WebsocketContainer>
      </UserContainer>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
)
