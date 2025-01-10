import React, { useEffect, useState } from 'react'
import './index.scss'

interface Chat {
    id: string
    title: string
    createTime: string
    updateTime: string
}
export default function Sidebar({ uid }: { uid: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [total, setTotal] = useState<number>(0)
    const [items, setItems] = useState<Chat[]>([
        {
            id: '678021fb-dd18-8005-a056-6b12d2b29231',
            title: 'React TypeScript Yarn Setup',
            createTime: '2025-01-09T19:22:36.316239Z',
            updateTime: '2025-01-09T20:43:41.903993Z',
        },
        {
            id: '6780262b-8438-8005-8078-46d8ba25bb04',
            title: 'ERESOLVE dependency conflict fix',
            createTime: '2025-01-09T19:40:27.799287Z',
            updateTime: '2025-01-09T19:40:37.463460Z',
        },
        {
            id: '67801e75-2188-8005-b64f-f7142ff55b15',
            title: 'Test inquiry response',
            createTime: '2025-01-09T19:07:33.419322Z',
            updateTime: '2025-01-09T19:12:01.641552Z',
        },
        {
            id: '67801b12-b660-8005-8b50-3dba02624538',
            title: 'Golang WebSocket Chat Example',
            createTime: '2025-01-09T18:53:06.993388Z',
            updateTime: '2025-01-09T18:56:21.721888Z',
        },
        {
            id: '677ef30d-f2d4-8005-bb01-2438f8f5a979',
            title: 'Go GPT Chatbot Example',
            createTime: '2025-01-08T21:50:06.115718Z',
            updateTime: '2025-01-09T18:44:09.048357Z',
        },
        {
            id: '677eefca-1a90-8005-9bb7-c4e62b27139b',
            title: 'Northeastern Oakland Food Pantry',
            createTime: '2025-01-08T21:36:10.393134Z',
            updateTime: '2025-01-08T21:38:34.405470Z',
        },
        {
            id: '677ed146-9c18-8005-beb2-af3bd92651b5',
            title: 'GPT API Chatbot Setup',
            createTime: '2025-01-08T19:25:58.890694Z',
            updateTime: '2025-01-08T19:27:21.833420Z',
        },
        {
            id: '677e9fbd-89c4-8005-b54b-eb4deb4e05ae',
            title: 'GitHub 访问问题',
            createTime: '2025-01-08T15:54:37.764066Z',
            updateTime: '2025-01-08T16:11:05.913473Z',
        },
        {
            id: '674e75c8-7b08-8005-aed4-f46fdb38778d',
            title: '新加坡三维建模软件',
            createTime: '2024-12-03T03:06:48.790061Z',
            updateTime: '2024-12-03T03:14:38.260107Z',
        },
        {
            id: '6749ca48-47c8-8005-9c72-0c15b244aafd',
            title: '活动标题创作',
            createTime: '2024-11-29T14:06:00.486932Z',
            updateTime: '2024-11-29T14:10:37.940015Z',
        },
        {
            id: '6fb3813b-8912-44f9-8b1c-07b7d1f30c10',
            title: '智能技术服务合同',
            createTime: '2024-07-17T06:03:41.701802Z',
            updateTime: '2024-07-17T07:00:49.270055Z',
        },
        {
            id: '632e1e38-fd4a-4ca5-b828-df38d5fa4bf0',
            title: 'Product Features List',
            createTime: '2024-07-11T05:26:49.371691Z',
            updateTime: '2024-07-11T05:35:06.977811Z',
        },
        {
            id: 'f749be0a-a052-4aae-b66b-4b84a7ebfe06',
            title: 'Redux原理及工作流程',
            createTime: '2024-07-09T01:54:26.696526Z',
            updateTime: '2024-07-09T01:56:20.780574Z',
        },
        {
            id: '178af27b-2513-423a-83b7-53552ada2a3e',
            title: 'Handling Microservice B Failures',
            createTime: '2024-07-08T06:58:37.482866Z',
            updateTime: '2024-07-08T07:23:36.609195Z',
        },
        {
            id: '1d25b2ab-26ac-4651-9b9b-9f1e70519c4c',
            title: 'Logo design request',
            createTime: '2024-07-03T06:25:34.977239Z',
            updateTime: '2024-07-03T06:25:43.643692Z',
        },
        {
            id: '74d0e40c-9a37-42e2-9313-1d4a8dc6b9d5',
            title: 'Logo design request: Alibaba style',
            createTime: '2024-07-03T06:21:34.502265Z',
            updateTime: '2024-07-03T06:24:41.538038Z',
        },
        {
            id: 'e155fc59-108c-4494-b9c0-3f4310c94dc7',
            title: 'New chat',
            createTime: '2024-01-08T06:14:07.663241Z',
            updateTime: '2024-01-08T06:14:15.679418Z',
        },
        {
            id: 'eb2e6116-29b2-4b45-98b6-4dd9ffdf2015',
            title: 'School Choice for CS',
            createTime: '2023-11-30T05:58:43.832586Z',
            updateTime: '2023-11-30T05:59:21.847884Z',
        },
        {
            id: '979e6dc4-7801-4590-9bff-87b5a8c21950',
            title: "Recommendation for Master's Program",
            createTime: '2023-11-05T05:50:12.987777Z',
            updateTime: '2023-11-05T09:23:36.310945Z',
        },
        {
            id: 'bb09e410-18b9-44e4-8e55-5c8dce0390d8',
            title: 'Recommending Avril for School',
            createTime: '2023-11-05T06:13:43.451883Z',
            updateTime: '2023-11-05T06:13:46.064238Z',
        },
        {
            id: '30ff51d9-eba4-4570-a069-b2de88df36c2',
            title: 'PRD编写建议',
            createTime: '2023-10-26T07:26:49.148301Z',
            updateTime: '2023-10-26T09:39:44.559197Z',
        },
        {
            id: '0bb000b4-0a09-4804-b2cf-b9002d8ddbb5',
            title: '传递多个子组件的ref',
            createTime: '2023-09-27T09:36:51.700685Z',
            updateTime: '2023-09-27T10:00:19.832707Z',
        },
        {
            id: 'f67f91f9-045b-4a2b-875e-27ad0e3e1dd1',
            title: '类型错误解决方法',
            createTime: '2023-09-27T09:00:35.615816Z',
            updateTime: '2023-09-27T09:32:46.441529Z',
        },
        {
            id: 'c6de0ebe-d177-4a4f-a758-de0a86fb543b',
            title: '滚动选中元素',
            createTime: '2023-09-14T03:43:33.426573Z',
            updateTime: '2023-09-14T03:45:52Z',
        },
        {
            id: 'bef18529-6718-47ac-ad6f-3ca8eb43967e',
            title: 'ScrollView scrollIntoViewAlignment问题',
            createTime: '2023-09-14T03:19:44.172149Z',
            updateTime: '2023-09-14T03:20:00Z',
        },
        {
            id: '5cffc205-7094-4ff1-9840-279c37001748',
            title: '异步操作解决方案',
            createTime: '2023-08-28T04:01:07.151571Z',
            updateTime: '2023-08-28T05:45:24Z',
        },
        {
            id: '85ccfa96-db0c-4838-b638-a850bf1d1ee1',
            title: '获取传递的数据方法',
            createTime: '2023-08-24T02:44:28.346902Z',
            updateTime: '2023-08-25T09:52:46Z',
        },
        {
            id: '8525e89b-7b14-4913-a15b-c34a2f514521',
            title: '定位 Linux CPU 占满',
            createTime: '2023-08-23T10:32:05.328079Z',
            updateTime: '2023-08-23T11:14:12Z',
        },
    ])
    const [offset, setOffset] = useState<number>(0)
    const limit = 20

    // const fetchChatItems = async (reset = false) => {
    //     setIsLoading(true) // begin loading,show loading logo
    //     try {
    //         const response = await fetch(`/api/chats?uid=${uid}&offset=${reset ? 0 : offset}&limit=${limit}`)
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch chat items')
    //         }
    //         const data: { total: number; items: Chat[] } = await response.json()
    //         setTotal(data.total)
    //         if (reset) {
    //             setItems(data.items)
    //             setOffset(data.items.length)
    //         } else {
    //             setItems((prev) => [ ...prev, ...data.items ])
    //             setOffset((prev) => prev + data.items.length)
    //         }
    //     } catch (error) {
    //         console.error('Error fetching chat items:', error)
    //     } finally {
    //         setIsLoading(false)
    //     }
    // }

    // // init sidebar
    // useEffect(() => {

    // }, [])

    return <div className="sidebar"></div>
}
