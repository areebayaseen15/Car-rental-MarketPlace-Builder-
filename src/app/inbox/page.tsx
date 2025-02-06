"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Message {
  id: number
  sender: string
  avatar: string
  preview: string
  timestamp: string
  unread: boolean
}

const InboxPage = () => {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: 1,
        sender: "Ali Ahmed",
        avatar: "/avatars/ali-ahmed.jpg",
        preview: "Assalam-o-Alaikum! Car available for Lahore to Islamabad trip...",
        timestamp: "2024-03-15T08:30:00",
        unread: true
      },
      {
        id: 2,
        sender: "Hira Khan",
        avatar: "/avatars/hira-khan.jpg",
        preview: "Your booking for Toyota Corolla has been confirmed. Details...",
        timestamp: "2024-03-14T15:45:00",
        unread: false
      },
    ]

    setMessages(mockMessages)
  }, []) // ✅ No dependency issue now

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(message => message.id !== id))
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-PK', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <>
      <div className="relative min-h-screen p-4 md:p-8 lg:top-[-900px] top-[-900px] lg:right-[-60px]">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-600 p-6">
            <h1 className="text-2xl font-bold text-white">Messages</h1>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-gray-200 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredMessages.map(message => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  message.unread ? 'bg-blue-50' : 'bg-white'
                }`}
                onClick={() => router.push(`/message/${message.id}`)}
              >
                <div className="flex items-start gap-4">
                  {/* Uncomment and use Image if needed */}
                  <Image
                    src={message.avatar}
                    alt={message.sender}
                    width={48}
                    height={48}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  {message.unread && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-base font-semibold truncate ${
                        message.unread ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {message.sender}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      message.unread ? 'text-gray-900 font-medium' : 'text-gray-600'
                    }`}>
                      {message.preview}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                      <span>{formatDate(message.timestamp)}</span>
                      {message.unread && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteMessage(message.id)
                    }}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No messages found</p>
              <p className="mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default InboxPage
