import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'

import SideNav from './layout'
import Writers from './writers';
import { NotFound } from '../components/errors'

export default class extends Component {
  state = {
    writers: []
  }

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:8000/writers?_embed=texts')).json()
    this.setState({ writers })
  }

  render() {
    const { writers } = this.state

    return <BrowserRouter>
      <Fragment>
        <CssBaseline />
        <SideNav writers={writers}>        
          <Switch>
            <Route exact path='/' render={() => <div>Home</div>} />
            <Route path='/writers' render={props => <Writers {...props} writers={writers} />} />
            <Route component={NotFound} />
          </Switch>        
        </SideNav>
      </Fragment>
    </BrowserRouter>
  }
}
