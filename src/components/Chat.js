import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Paperclip,
  Image,
  FileText,
  Download,
  MoreVertical,
  Phone,
  Video,
  Search,
  Star,
  Clock,
  CheckCircle,
  CheckCircle2
} from 'lucide-react';

const Chat = ({ user, initialTargetId = null }) => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);

  const conversations = [
    {
      id: 1,
      client: {
        name: 'Tech Society',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
        status: 'online',
        project: 'Logo Design for Campus Club'
      },
      lastMessage: 'Thanks for the latest revisions!',
      lastMessageTime: '2 min ago',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: 'client',
          content: 'Hi Alex! I saw your proposal for our logo design project. Your portfolio looks amazing!',
          timestamp: '10:30 AM',
          status: 'read'
        },
        {
          id: 2,
          sender: 'user',
          content: 'Thank you! I\'m excited to work on this project. When would you like to schedule a call to discuss the requirements?',
          timestamp: '10:32 AM',
          status: 'read'
        },
        {
          id: 3,
          sender: 'client',
          content: 'Perfect! How about tomorrow at 2 PM? I can share our brand guidelines and color palette.',
          timestamp: '10:35 AM',
          status: 'read'
        },
        {
          id: 4,
          sender: 'user',
          content: 'Sounds great! I\'ll send you a calendar invite.',
          timestamp: '10:36 AM',
          status: 'read'
        },
        {
          id: 5,
          sender: 'client',
          content: 'Here are our brand guidelines and some inspiration images.',
          timestamp: '11:15 AM',
          status: 'read',
          attachments: [
            { name: 'Brand Guidelines.pdf', type: 'pdf', size: '2.4 MB' },
            { name: 'Inspiration Board.png', type: 'image', size: '1.8 MB' }
          ]
        },
        {
          id: 6,
          sender: 'user',
          content: 'Perfect! I\'ve reviewed the materials. I\'ll start with 3 initial concepts and share them by Friday.',
          timestamp: '11:20 AM',
          status: 'read'
        },
        {
          id: 7,
          sender: 'client',
          content: 'Thanks for the latest revisions! The second concept is exactly what we were looking for.',
          timestamp: '2 min ago',
          status: 'delivered'
        }
      ]
    },
    {
      id: 2,
      client: {
        name: 'Local Restaurant',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        status: 'offline',
        project: 'Website Development'
      },
      lastMessage: 'The homepage looks great!',
      lastMessageTime: '1 hour ago',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'client',
          content: 'Hi Alex, I\'m impressed with your development skills. Can you help us build a modern website?',
          timestamp: 'Yesterday',
          status: 'read'
        },
        {
          id: 2,
          sender: 'user',
          content: 'Absolutely! I\'d love to help you create a modern website. What kind of functionality are you looking for?',
          timestamp: 'Yesterday',
          status: 'read'
        }
      ]
    },
    {
      id: 3,
      client: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        status: 'online',
        project: 'Tutoring - Calculus'
      },
      lastMessage: 'Thank you so much for the help!',
      lastMessageTime: '3 hours ago',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: 'client',
          content: 'Thank you so much for the help! My calculus grade improved significantly.',
          timestamp: '3 hours ago',
          status: 'read'
        }
      ]
    }
  ];

  const currentConversation = conversations.find(conv => conv.id === activeChat);

  const filteredConversations = conversations.filter(conv =>
    conv.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.client.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // scrollToBottom();
  }, [currentConversation?.messages]);

  useEffect(() => {
    // If a parent provided an initial target id (e.g. from query param), select it
    if (initialTargetId != null) {
      const id = Number(initialTargetId);
      if (!Number.isNaN(id) && conversations.some(c => c.id === id)) {
        setActiveChat(id);
      }
    }
  }, [initialTargetId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return Clock;
      case 'delivered': return CheckCircle;
      case 'read': return CheckCircle2;
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'var(--colors-text-secondary)';
      case 'delivered': return 'var(--colors-text-secondary)';
      case 'read': return 'var(--colors-primary-limeText)';
      default: return 'var(--colors-text-secondary)';
    }
  };

  return (
    <div className="container chat-container" style={{ 
      paddingTop: 'var(--spacing-xl)', 
      position: 'relative', 
      zIndex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '800px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>
          Messages
        </h1>
        <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
          Communicate with clients, share files, and collaborate on projects in real-time.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '350px 1fr', 
        gap: 'var(--spacing-lg)', 
        flex: 1,
        minHeight: 0
      }}>
        {/* Conversations List */}
        <div className="card card-light" style={{ 
          padding: 0, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Search */}
          <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--colors-border-subtle)' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: 'var(--spacing-md)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--colors-text-secondary)'
                }} 
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) 40px',
                  border: '2px solid var(--colors-border-subtle)',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'var(--colors-background-surface)',
                  fontSize: 'var(--body-font-size)',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Conversations */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {filteredConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => setActiveChat(conversation.id)}
                style={{
                  padding: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--colors-border-subtle)',
                  cursor: 'pointer',
                  backgroundColor: activeChat === conversation.id ? 'var(--colors-background-surface)' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <div className="flex items-start gap-md">
                  <div style={{ position: 'relative' }}>
                    <img
                      src={conversation.client.avatar}
                      alt={conversation.client.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: conversation.client.status === 'online' ? 'var(--colors-primary-lime)' : 'var(--colors-text-secondary)',
                      border: '2px solid white'
                    }} />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
                      <h4 style={{ fontSize: 'var(--body-font-size)', fontWeight: '600' }}>
                        {conversation.client.name}
                      </h4>
                      <span style={{ 
                        fontSize: 'var(--metadata-font-size)', 
                        color: 'var(--colors-text-secondary)' 
                      }}>
                        {conversation.lastMessageTime}
                      </span>
                    </div>
                    
                    <p style={{ 
                      fontSize: 'var(--metadata-font-size)', 
                      color: 'var(--colors-text-secondary)',
                      marginBottom: 'var(--spacing-sm)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {conversation.client.project}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p style={{ 
                        fontSize: 'var(--body-font-size)', 
                        color: 'var(--colors-text-primary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1
                      }}>
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span style={{
                          backgroundColor: 'var(--colors-primary-lime)',
                          color: 'var(--colors-primary-limeText)',
                          fontSize: 'var(--metadata-font-size)',
                          fontWeight: '600',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}>
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="card card-light" style={{ 
          padding: 0, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {currentConversation ? (
            <>
              {/* Chat Header */}
              <div style={{ 
                padding: 'var(--spacing-lg)', 
                borderBottom: '1px solid var(--colors-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div className="flex items-center gap-md">
                  <img
                    src={currentConversation.client.avatar}
                    alt={currentConversation.client.name}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                      {currentConversation.client.name}
                    </h3>
                    <p style={{ color: 'var(--colors-text-secondary)', fontSize: 'var(--body-font-size)' }}>
                      {currentConversation.client.project}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-md">
                  <button className="button button-outline">
                    <Phone size={16} />
                  </button>
                  <button className="button button-outline">
                    <Video size={16} />
                  </button>
                  <button className="button button-outline">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{ 
                flex: 1, 
                padding: 'var(--spacing-lg)', 
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                backgroundColor: 'var(--colors-background-default)',
                minHeight: 0
              }}>
                {currentConversation.messages.map(msg => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '70%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--border-radius-lg)',
                      backgroundColor: msg.sender === 'user' 
                        ? 'var(--colors-neutral-dark)' 
                        : 'var(--colors-background-surface)',
                      color: msg.sender === 'user' 
                        ? 'var(--colors-text-onDark)' 
                        : 'var(--colors-text-primary)',
                      border: msg.sender === 'client' ? '1px solid var(--colors-border-subtle)' : 'none',
                      boxShadow: 'var(--shadow-sm)'
                    }}>
                      <p style={{ fontSize: 'var(--body-font-size)', marginBottom: 'var(--spacing-sm)' }}>
                        {msg.content}
                      </p>
                      
                      {msg.attachments && (
                        <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                          {msg.attachments.map((attachment, index) => (
                            <div 
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                padding: 'var(--spacing-sm)',
                                backgroundColor: msg.sender === 'user' 
                                  ? 'rgba(255,255,255,0.1)' 
                                  : 'var(--colors-background-default)',
                                borderRadius: 'var(--border-radius-md)',
                                marginBottom: 'var(--spacing-sm)'
                              }}
                            >
                              {attachment.type === 'pdf' ? <FileText size={16} /> : <Image size={16} />}
                              <span style={{ fontSize: 'var(--metadata-font-size)', flex: 1 }}>
                                {attachment.name}
                              </span>
                              <span style={{ fontSize: 'var(--metadata-font-size)', opacity: 0.7 }}>
                                {attachment.size}
                              </span>
                              <Download size={16} style={{ cursor: 'pointer' }} />
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        fontSize: 'var(--metadata-font-size)',
                        opacity: 0.7
                      }}>
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'user' && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            {(() => {
                              const StatusIcon = getStatusIcon(msg.status);
                              return <StatusIcon size={14} style={{ color: getStatusColor(msg.status) }} />;
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div style={{ 
                padding: 'var(--spacing-lg)', 
                borderTop: '1px solid var(--colors-border-subtle)',
                backgroundColor: 'var(--colors-background-default)'
              }}>
                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  <button type="button" className="button button-outline">
                    <Paperclip size={16} />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                      flex: 1,
                      padding: 'var(--spacing-md)',
                      border: '2px solid var(--colors-border-subtle)',
                      borderRadius: 'var(--border-radius-lg)',
                      fontSize: 'var(--body-font-size)',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--colors-primary-lime)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--colors-border-subtle)'}
                  />
                  <button type="submit" className="button button-primary">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: 'var(--colors-text-secondary)'
            }}>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;