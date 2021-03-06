import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import Chat from './components/Chat/Chat'
import 'normalize.css'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import axios from 'axios'
import config from '../config.json'

axios.defaults.baseURL = config.apiURL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:key" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
