import { ReactNode, useState } from "react"
import Searchbox from "@/components/Searchbox"
import Message from "@/components/Message"
import "./index.scss"
import instance from "@/axios"

type Hint = {
    icon: ReactNode
    title: string
}

type MessageContent = {
    content_type: 'text',
    parts: string
}

type Message = {
    role: 'user' | 'system',
    content: MessageContent[]
}

const hintsSetting: Hint[] = [
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(226, 197, 65)" }}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C8.41496 3 5.5 5.92254 5.5 9.53846C5.5 11.8211 6.662 13.8298 8.42476 15H15.5752C17.338 13.8298 18.5 11.8211 18.5 9.53846C18.5 5.92254 15.585 3 12 3ZM14.8653 17H9.13473V18H14.8653V17ZM13.7324 20H10.2676C10.6134 20.5978 11.2597 21 12 21C12.7403 21 13.3866 20.5978 13.7324 20ZM8.12601 20C8.57004 21.7252 10.1361 23 12 23C13.8639 23 15.43 21.7252 15.874 20C16.4223 19.9953 16.8653 19.5494 16.8653 19V16.5407C19.0622 14.9976 20.5 12.4362 20.5 9.53846C20.5 4.82763 16.6992 1 12 1C7.30076 1 3.5 4.82763 3.5 9.53846C3.5 12.4362 4.93784 14.9976 7.13473 16.5407V19C7.13473 19.5494 7.57774 19.9953 8.12601 20Z" fill="currentColor"></path>
        </svg>,
        title: "Make a plan"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(226, 197, 65)" }}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C8.41496 3 5.5 5.92254 5.5 9.53846C5.5 11.8211 6.662 13.8298 8.42476 15H15.5752C17.338 13.8298 18.5 11.8211 18.5 9.53846C18.5 5.92254 15.585 3 12 3ZM14.8653 17H9.13473V18H14.8653V17ZM13.7324 20H10.2676C10.6134 20.5978 11.2597 21 12 21C12.7403 21 13.3866 20.5978 13.7324 20ZM8.12601 20C8.57004 21.7252 10.1361 23 12 23C13.8639 23 15.43 21.7252 15.874 20C16.4223 19.9953 16.8653 19.5494 16.8653 19V16.5407C19.0622 14.9976 20.5 12.4362 20.5 9.53846C20.5 4.82763 16.6992 1 12 1C7.30076 1 3.5 4.82763 3.5 9.53846C3.5 12.4362 4.93784 14.9976 7.13473 16.5407V19C7.13473 19.5494 7.57774 19.9953 8.12601 20Z" fill="currentColor"></path>
        </svg>,
        title: "Brainstorm"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(234, 132, 68)" }}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 3.34315 5.34315 2 7 2H14.1716C14.9672 2 15.7303 2.31607 16.2929 2.87868L19.1213 5.70711C19.6839 6.26972 20 7.03278 20 7.82843V19C20 20.6569 18.6569 22 17 22H7C5.34315 22 4 20.6569 4 19V5ZM7 4C6.44772 4 6 4.44772 6 5V19C6 19.5523 6.44772 20 7 20H17C17.5523 20 18 19.5523 18 19V7.82843C18 7.56321 17.8946 7.30886 17.7071 7.12132L14.8787 4.29289C14.6911 4.10536 14.4368 4 14.1716 4H7ZM8 10C8 9.44772 8.44772 9 9 9H15C15.5523 9 16 9.44772 16 10C16 10.5523 15.5523 11 15 11H9C8.44772 11 8 10.5523 8 10ZM8 14C8 13.4477 8.44772 13 9 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H9C8.44772 15 8 14.5523 8 14Z" fill="currentColor"></path>
        </svg>,
        title: "Summariize text"
    },
    {
        icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "rgb(108, 113, 255)" }}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6C3 4.34315 4.34315 3 6 3H18C19.6569 3 21 4.34315 21 6V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V6ZM6 5C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6ZM7.29289 9.29289C7.68342 8.90237 8.31658 8.90237 8.70711 9.29289L10.7071 11.2929C11.0976 11.6834 11.0976 12.3166 10.7071 12.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L8.58579 12L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289ZM12 14C12 13.4477 12.4477 13 13 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H13C12.4477 15 12 14.5523 12 14Z" fill="currentColor"></path>
        </svg>,
        title: "Code"
    }
]

export default function NewChat() {
    const [ begin, setBegin ] = useState<boolean>(false)
    const [ chatList, setChatList ] = useState<Message[]>([])
    

    const addOrUpdateMessage = (newContent: MessageContent, role: "user" | "system") => {
        setChatList((prevChatList) => {
            // if this message's role is system && last message is send by system
            // update message
            // if (role === "system" && prevChatList.length > 0 && prevChatList[ prevChatList.length - 1 ].role === "system") {
            //     const updatedChatList = [ ...prevChatList ];
            //     updatedChatList[ updatedChatList.length - 1 ].content.push(newContent);
            //     return updatedChatList;
            // }

            // create new message
            const newMessage: Message = {
                role,
                content: [ newContent ],
            };
            return [ ...prevChatList, newMessage ];
        });
    };

    const fetchRes = async (prompt: string) => {
        try {
            const response = await instance.post("/send", { prompt: prompt })
            console.log('Recieved data:', response);
            addOrUpdateMessage({ content_type: "text", parts: response.data.content }, "user")
        } catch (error) {
            console.log("Recieved failed", error)
        }
    }

    const sendMessage = (message: string) => {
        if (!begin) {
            // set status to begin chat
            // ...

            // call api to create chat
            // ...
            setBegin(true)
        }
        addOrUpdateMessage({ content_type: "text", parts: message }, "user")
        fetchRes(message)
    }

    return (
        <>{
            begin ?
                // begin a new chat
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
                :
                // init page
                <div className="page-newchat">
                    <h1 className="title">What can I help with?</h1>
                    <Searchbox
                        onFinish={sendMessage}
                    />
                    <div className="hints">
                        {
                            hintsSetting.map((hint, index) => (
                                <button className="hint" id={`hint-${index}`}>
                                    {hint.icon}
                                    <p className="font">{hint.title}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
        }</>
    )
}