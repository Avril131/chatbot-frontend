import Sidebar from '@/components/Sidebar'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Chat() {
    const { id } = useParams<{ id: string }>()

    return (
        <div className="page-chat">
            <Sidebar uid="" />
        </div>
    )
}
