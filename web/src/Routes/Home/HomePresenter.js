import React from 'react'
import { Link } from 'react-router-dom'

const HomePresenter = () => (
  <>
    <h1>HOME</h1>
    <ul>
      <li><Link to="/slicer">Slicer</Link></li>
    </ul>
  </>
)

export default HomePresenter
