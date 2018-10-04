import React, { Component, Fragment } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'

export default class extends Component {
  state = {
    writers: []
  }

  async componentDidMount() {
    const writers = await (await fetch('http://localhost:8000/writers')).json()
    this.setState({ writers })
  }

  render() {
    return <BrowserRouter>
      <Fragment>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/writers'>Writers</Link>
          </li>
        </ul>

        <Route exact path='/' render={() => <div>Home</div>} />
        <Route path='/writers' render={() => <div>Writers</div>} />
        
      </Fragment>

    </BrowserRouter>
  }
}
