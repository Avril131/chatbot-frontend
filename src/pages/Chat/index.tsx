import { useParams } from 'react-router-dom'

export default function Chat() {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="page-chat">
        </div>
    )
}
