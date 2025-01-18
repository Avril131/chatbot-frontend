import "./index.scss"

type MessageContent = {
    content_type: 'text',
    parts: string
}

type Message = {
    role: 'user' | 'system',
    content: MessageContent[]
}

export default function Message({ message, id }: {
    message: Message;
    id: string
}) {
    switch (message.role) {
        case "user":
            return (
                <div
                    id={id}
                    className="message-user"
                >
                    {
                        message.content.map((content, index) => (
                            <p
                                id={`message-${id}-${index}`}
                                className="content"
                            >
                                {content.parts}
                            </p>
                        ))
                    }
                </div>
            )
        case "system":
            return (
                <div
                    id={id}
                    className="message-system"
                >
                    <img
                        className="avatar"
                        src="@/assets/logo.png"
                    />
                    <div className="contents-wrap">
                        {
                            message.content.map((content, index) => (
                                <p
                                    id={`message-${id}-${index}`}
                                    className="content"
                                >
                                    {content.parts}
                                </p>
                            ))
                        }
                    </div>
                </div>
            )
    }
}