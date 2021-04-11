import React, { useRef, useEffect } from 'react'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import  StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined'
import { useSelector } from 'react-redux'
import { selectRoomId } from '../../features/appSlice'
import styled from 'styled-components'
import ChatImput from '../../components/ChatImput'
import Message from '../../components/Message'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'

function Chat() {
  const chatRef = useRef(null)
  const roomId = useSelector(selectRoomId)
  const [roomsDetails] = useDocument(
    roomId &&
    db.collection('rooms').doc(roomId)
  )
  const [roomMessages, loading] = useCollection (
    roomId &&
    db
      .collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
  )

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [roomId, loading])

  return (
    <ChatContainer>
      {roomsDetails && roomMessages && (
        
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#Room-Name</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map(doc => {
              const { message, timestamp, user, userImage } = doc.data()

              return (
                <Message
                  key={doc.id}
                  message={message}
                  user={user}
                  userImage={userImage}
                  timestamp={timestamp}
                />
              )
            })}
            <ChatBottom ref={chatRef}/>

          </ChatMessages>
          <ChatImput
            chatRef={chatRef}
            channelName={roomsDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  )
}

export default Chat

const ChatBottom = styled.div `
  padding-bottom: 200px;
`

const ChatMessages = styled.div ``

const ChatContainer = styled.div `
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`

const Header = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div `
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`

const HeaderRight = styled.div `
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`