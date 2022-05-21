import React from 'react'
import { Link } from 'react-router-dom'
import './Main.css'
import GithubIcon from '#icons/github.svg'

const Main = () => {
  return (
    <div className="Main Screen">
      <div className="MenuWrapper">
        <div className="Logo">
          Morse Chat
        </div>
        <div className="Menu">
          <Link to="/jd8AjE7s">
            <div className="Create Button">Create a room</div>
          </Link>
          <p className="Divider">or</p>
          <div className="Join">Follow an invitation link to join existing</div>
        </div>
      </div>
      <div className="Github">
        <a href="src/components/Main/Main" className="GithubLink"><GithubIcon/></a>
      </div>
    </div>
  )
}

export default Main
