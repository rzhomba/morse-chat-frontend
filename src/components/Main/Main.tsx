import React from 'react'
import CreateRoomButton from './CreateRoomButton'
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
          <CreateRoomButton/>
          <p className="Divider">or</p>
          <div className="Join">Follow an invitation link to join existing</div>
        </div>
      </div>
      <div className="Github">
        <a href="https://github.com/rzhomba/morse-chat-frontend"
           target="_blank" className="GithubLink" rel="noreferrer"><GithubIcon/></a>
      </div>
    </div>
  )
}

export default Main
