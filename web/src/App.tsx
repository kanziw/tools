import { Layout } from 'antd'
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home, Slicer, MergePDF } from 'Routes'

const { Header, Content, Footer } = Layout

const App = () => (
  <Layout>
    <Header>Header</Header>
    <Content>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/slicer" component={Slicer} />
        <Route exact path="/pdf-combiner" component={MergePDF} />
      </BrowserRouter>
    </Content>
    <Footer>Footer</Footer>
  </Layout>
)

export default App
