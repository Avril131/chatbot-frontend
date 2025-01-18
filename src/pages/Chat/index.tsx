import Searchbox from '@/components/Searchbox'
import { useParams } from 'react-router-dom'
import "./index.scss"
import { useEffect, useState } from 'react'
import Message from '@/components/Message'

type MessageContent = {
    content_type: 'text',
    parts: string
}

type Message = {
    role: 'user' | 'system',
    content: MessageContent[]
}

export default function Chat() {
    const { id } = useParams<{ id: string }>()
    const [ chatList, setChatList ] = useState<Message[]>([])

    // 传入新消息
    const updateChatList = (role: 'user' | 'system', content: MessageContent[]) => {
        setChatList((prev) => [ ...prev, { role: role, content: content } ])
    }

    // send message
    const sendMessage = (content: string) => {

    }

    // init
    useEffect(() => {
        if (id) {
            // get chat list here
            // ...

            // setChatList
        } else {

        }

    }, [ id ])

    return (
        <div className="page-chat">
            <div className='chats'>
                {
                    chatList.map((chat, index) => (
                        <Message
                            id={`message-${index}`}
                            message={chat}
                        />
                    ))
                }
            </div>
            <div className='footer'>
                <Searchbox
                    onFinish={sendMessage}
                />
            </div>
        </div>
    )
}
