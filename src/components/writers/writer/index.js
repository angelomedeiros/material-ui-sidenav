import React, { Fragment } from 'react'
import { Link, Route, Redirect } from 'react-router-dom'

import Text from './text'
import { NotFound } from '../../errors'

export default ({ match: { url }, name, born, description, deceased, image, texts }) =>
  <Fragment>
      <h1>{ `${name}` }</h1>
      <h2>{ `${new Date(born).toDateString()} - ${new Date(deceased).toDateString()}` }</h2>
      <p>{ `${description}` }</p>
      <img src={`${image}`} />
      <ul>
        {texts.map(({ title, id }) => 
            <li key={id}>
                <Link to={`${url}/texts/${id}`}>
                    {title}
                </Link>
            </li>
        )}
      </ul>

      <Route path={`${url}/texts/:textId`} render={ props => {
          const text = texts.find(({ id }) => id === props.match.params.textId)
          console.log(text)

          if (!text) {
            // return <Redirect to={`${url}`} />
            return <NotFound />
          }
          
          return <Text {...props} {...text} />
      }} />
  </Fragment>