import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home, Slicer } from 'Routes'

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/slicer" component={Slicer} />
  </BrowserRouter>
)

export default App
