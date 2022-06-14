import React from 'react'
import { selectChat } from '../../../../store/chat/chatSlice'
import { useAppSelector } from '../../../../utils/hooks'
import SettingsOption from '../SettingsOption'
import UserListIcon from '#icons/userlist.svg'
import { displayPopup } from '../../../Utils/Popup'

const UsersOption = () => {
  const { chatUsers } = useAppSelector(selectChat)

  return (
    <SettingsOption icon={UserListIcon}
                    label="View users"
                    onClick={() => {
                      displayPopup({
                        title: 'Chat Users',
                        content: <table>
                          <thead>
                          <tr>
                            <th>Name</th>
                            <th>Joined</th>
                            <th>Role</th>
                            <th>Status</th>
                          </tr>
                          </thead>
                          <tbody>
                          {chatUsers.map(user => (
                            <tr key={user.name}>
                              <td>{user.name}</td>
                              <td align="center">
                                {
                                  new Date()
                                    .toLocaleDateString('en-US', {
                                      month: 'short',
                                      day: 'numeric'
                                    }) + ' ' +
                                  new Date()
                                    .toLocaleTimeString('en-US', {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })
                                }
                              </td>
                              <td>{user.role.toUpperCase()}</td>
                              <td>ONLINE</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      })
                    }}/>
  )
}

export default UsersOption
