import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'
import { db } from '../../firebase'
import firebase from 'firebase'


function ChatImput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('')

  const sendMessage = (e) => {
    e.preventDefault() // Prevents refresh

    if (!channelId) {
      return false
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: 'Luis',
      userImage: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
    })

    chatRef.current.scrollIntoView({
      behavior: 'smooth',
    })

    setInput('')
  }

  return (
    <ChatImputContainer>
      <form>
        <input value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Message #${channelName}`} />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>   
      </form>
    </ChatImputContainer>
  )
}

export default ChatImput

const ChatImputContainer = styled.div `
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > Button {
    display: none !important;
  }
`
