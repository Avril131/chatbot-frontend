import React, { useEffect, useRef, useState } from 'react'
import Tooltip, { TooltipHandle } from '@/components/Tooltip'
import './index.scss'

type Chat = {
    id: string
    title: string
    createTime: string
    updateTime: string
}

// define type to group chats by time
type GroupedChats = {
    [ date: string ]: Chat[];
}

export default function Sidebar({ uid }: { uid: string }) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ total, setTotal ] = useState<number>(0)
    const [ items, setItems ] = useState<Chat[]>([])
    const [ offset, setOffset ] = useState<number>(0)
    const limit = 20
    const [ groupedItems, setGroupedItems ] = useState<GroupedChats>({})
    const tooltipRef = useRef<TooltipHandle>(null);

    const handleCloseTooltip = () => {
        tooltipRef.current?.closeTooltip();
    };

    const groupByTimeRange = (chats: Chat[]): GroupedChats => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const prvious7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        return chats.reduce((acc, chat) => {
            const chatDate = new Date(chat.createTime);

            let key;
            if (chatDate >= today) {
                key = "Today";
            } else if (chatDate >= yesterday && chatDate < today) {
                key = "Yesterday";
            } else if (chatDate >= prvious7Days && chatDate < yesterday) {
                key = "Previous 7 Days";
            } else {
                key = `${chatDate.getFullYear()}`;
            }

            if (!acc[ key ]) {
                acc[ key ] = [];
            }
            acc[ key ].push(chat);

            return acc;
        }, {} as GroupedChats);
    };

    // update chatlist grouped by time range
    const mergeGroupedChatsByRange = (
        prevGroups: GroupedChats,
        newChats: Chat[]
    ): GroupedChats => {
        const newGroups = groupByTimeRange(newChats);
        const mergedGroups: GroupedChats = { ...prevGroups };

        for (const [ key, chats ] of Object.entries(newGroups)) {
            mergedGroups[ key ] = (mergedGroups[ key ] || []).concat(chats);
        }

        return mergedGroups;
    };

    // fetch chatlist from backend
    const fetchChatItems = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            // const response = await fetch(`/api/chats?uid=${uid}&offset=${offset}&limit=${limit}`);
            // if (!response.ok) throw new Error("Failed to fetch chat items");

            // const data: { total: number; items: Chat[] } = await response.json();
            // setTotal(data.total);

            const data: { total: number; items: Chat[] } = {
                total: 10,
                items: [
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
                ]
            }

            // 更新分组数据
            setGroupedItems((prevGroups) => mergeGroupedChatsByRange(prevGroups, data.items));
            setOffset((prevOffset) => prevOffset + data.items.length);

        } catch (error) {
            console.error("Error fetching chat items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // init sidebar
    useEffect(() => {
        fetchChatItems()
    }, [])

    return (
        <div className="sidebar">
            <div className='buttons'>
                <Tooltip
                    ref={tooltipRef}
                    content='Close sidebar'
                    direction='right'
                >
                    <button className='close-sidebar sidebar-button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor"></path></svg>
                    </button>
                </Tooltip>
                <Tooltip
                    ref={tooltipRef}
                    content='Search chats'
                    direction='bottom'
                    hint='command + K'
                >
                    <button className='search sidebar-button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 4.25C7.16015 4.25 4.25 7.16015 4.25 10.75C4.25 14.3399 7.16015 17.25 10.75 17.25C14.3399 17.25 17.25 14.3399 17.25 10.75C17.25 7.16015 14.3399 4.25 10.75 4.25ZM2.25 10.75C2.25 6.05558 6.05558 2.25 10.75 2.25C15.4444 2.25 19.25 6.05558 19.25 10.75C19.25 12.7369 18.5683 14.5645 17.426 16.0118L21.4571 20.0429C21.8476 20.4334 21.8476 21.0666 21.4571 21.4571C21.0666 21.8476 20.4334 21.8476 20.0429 21.4571L16.0118 17.426C14.5645 18.5683 12.7369 19.25 10.75 19.25C6.05558 19.25 2.25 15.4444 2.25 10.75Z" fill="currentColor"></path></svg>
                    </button>
                </Tooltip>
                <Tooltip
                    ref={tooltipRef}
                    content='New chat'
                    direction='bottom'
                >
                    <button className='newchat sidebar-button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z" fill="currentColor"></path></svg>
                    </button>
                </Tooltip>
            </div>
            {/* chat lsit */}
            <div className='chatlist'>
                {
                    Object.entries(groupedItems)
                        .sort(([ groupA ], [ groupB ]) => {
                            // order index
                            const order = [ "Today", "Yesterday", "Previous 7 Days" ];
                            const indexA = order.indexOf(groupA);
                            const indexB = order.indexOf(groupB);

                            // both in the order index
                            if (indexA !== -1 && indexB !== -1) {
                                return indexA - indexB;
                            } // A in the index && B is year
                            else if (indexA !== -1) {
                                return -1;
                            } else if (indexB !== -1) {
                                return 1;
                            }

                            return groupB.localeCompare(groupA);
                        }).map(([ range, chats ]) => (
                            <>
                                <h3 className='chatlist-range'>{range}</h3>
                                {chats.map((chat) => (
                                    <div className='chatlist-item'>
                                        <p className='chatlist-item-title'>{chat.title}</p>
                                        <Tooltip
                                            ref={tooltipRef}
                                            content='Options'
                                            direction='top'
                                        >
                                            <button className='chatlist-item-button'>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z" fill="currentColor"></path></svg>
                                            </button>
                                        </Tooltip >
                                    </div>
                                ))}
                            </>
                        ))
                }
            </div>
        </div >
    )
}
