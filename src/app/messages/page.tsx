'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Card, Col, Container, Form, Image, InputGroup, ListGroup, Row, Stack } from 'react-bootstrap';
import { FaPaperPlane, FaCircle } from 'react-icons/fa';

type Conversation = {
  userId: number;
  name: string;
  avatar: string;
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
};

type ChatMessage = {
  id: number;
  text: string;
  timestamp: string;
  fromSelf: boolean;
};

type Participant = {
  userId: number;
  name: string;
  avatar: string;
};

const accentColor = '#66988c';
const unreadColor = '#004b39';

const formatTime = (iso: string) => new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const MessagesContent = () => {
  const [conversations, setConversations] = React.useState<Conversation[]>([]);
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState('');
  const [loadingList, setLoadingList] = React.useState(false);
  const [loadingMessages, setLoadingMessages] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const searchParams = useSearchParams();

  const loadMessages = React.useCallback(
    async (userId: number, currentIdOverride?: number) => {
      setLoadingMessages(true);
      setError(null);
      try {
        const res = await fetch(`/api/messages?with=${userId}`, { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load messages');
        }
        const data = await res.json();
        const curId = currentIdOverride ?? data.currentUserId ?? currentUserId;
        setCurrentUserId(curId ?? null);
        const rawMessages = data.messages || [];
        const mapped: ChatMessage[] = rawMessages.map((m: any) => ({
          id: m.id,
          text: m.content,
          timestamp: m.createdAt,
          fromSelf: curId ? m.senderId === curId : false,
        }));
        const lastRaw = rawMessages[rawMessages.length - 1];
        const { participant }: { participant?: Participant } = data;
        setMessages(mapped);
        setActiveId(userId);
        setConversations((prev) => {
          const existing = prev.find((c) => c.userId === userId);
          if (existing) {
            return prev.map((c) => {
              if (c.userId !== userId) return c;
              return {
                ...c,
                unreadCount: 0,
                lastMessage: lastRaw?.content ?? c.lastMessage,
                lastTimestamp: lastRaw?.createdAt ?? c.lastTimestamp,
              };
            });
          }
          if (participant) {
            return [
              ...prev,
              {
                userId,
                name: participant.name,
                avatar: participant.avatar,
                unreadCount: 0,
                lastMessage: lastRaw?.content ?? '',
                lastTimestamp: lastRaw?.createdAt ?? new Date().toISOString(),
              },
            ];
          }
          return prev;
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingMessages(false);
      }
    },
    [currentUserId],
  );

  const loadConversations = React.useCallback(
    async (preferredId?: number | null) => {
      setLoadingList(true);
      setError(null);
      try {
        const res = await fetch('/api/messages', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load conversations');
        }
        const data = await res.json();
        setConversations(data.conversations || []);
        setCurrentUserId(data.currentUserId ?? null);
        const targetId = preferredId ?? data.conversations?.[0]?.userId;
        if (targetId) {
          await loadMessages(targetId, data.currentUserId);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingList(false);
      }
    },
    [loadMessages],
  );

  React.useEffect(() => {
    const withParam = searchParams.get('with');
    const parsed = withParam ? Number(withParam) : null;
    const targetId = parsed && !Number.isNaN(parsed) ? parsed : null;
    loadConversations(targetId);
  }, [loadConversations, searchParams]);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text || !activeId) return;
    setError(null);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toUserId: activeId, content: text }),
      });
      if (!res.ok) {
        throw new Error('Failed to send message');
      }
      const data = await res.json();
      const newMsg: ChatMessage = {
        id: data.message.id,
        text: data.message.content,
        timestamp: data.message.createdAt,
        fromSelf: true,
      };
      setMessages((prev) => [...prev, newMsg]);
      setConversations((prev) => {
        const next = prev.map((c) => {
          if (c.userId !== activeId) return c;
          return { ...c, lastMessage: text, lastTimestamp: new Date().toISOString() };
        });
        return next;
      });
      setDraft('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const activeConversation = conversations.find((c) => c.userId === activeId);

  return (
    <main>
      <Container fluid className="py-3">
        <Row className="g-3">
          <Col xs={12} md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="fw-semibold">Messages</Card.Header>
              <ListGroup variant="flush" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                {loadingList && <ListGroup.Item>Loading...</ListGroup.Item>}
                {!loadingList && conversations.length === 0 && <ListGroup.Item>No conversations yet</ListGroup.Item>}
                {conversations.map((c) => {
                  const isActive = c.userId === activeId;
                  const itemStyle = isActive
                    ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' }
                    : {};
                  return (
                    <ListGroup.Item
                      key={c.userId}
                      action
                      onClick={() => loadMessages(c.userId)}
                      active={isActive}
                      style={itemStyle}
                      className="d-flex align-items-center justify-content-between"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <Image src={c.avatar} roundedCircle width={40} height={40} alt={c.name} />
                        <div className="d-flex flex-column">
                          <span className="fw-semibold">{c.name}</span>
                          <small className={isActive ? 'text-light' : 'text-muted'}>
                            {c.lastMessage ? c.lastMessage.slice(0, 24) : 'No messages'}
                          </small>
                        </div>
                      </div>
                      {c.unreadCount > 0 && <FaCircle style={{ color: unreadColor }} size={10} />}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card>
          </Col>

          <Col xs={12} md={9}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="d-flex align-items-center gap-2">
                {activeConversation ? (
                  <>
                    <Image
                      src={activeConversation.avatar}
                      roundedCircle
                      width={36}
                      height={36}
                      alt={activeConversation.name}
                    />
                    <div className="fw-semibold">{activeConversation.name}</div>
                  </>
                ) : (
                  <div className="text-muted">Select a conversation to start chatting</div>
                )}
              </Card.Header>
              <Card.Body className="d-flex flex-column" style={{ minHeight: '65vh' }}>
                <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
                  {loadingMessages && <div className="text-muted">Loading messages...</div>}
                  {!loadingMessages && (
                    <Stack gap={3}>
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`d-flex ${m.fromSelf ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                          <div
                            className={`p-2 rounded-3 ${m.fromSelf ? '' : 'bg-light'}`}
                            style={{
                              maxWidth: '70%',
                              backgroundColor: m.fromSelf ? accentColor : undefined,
                              color: m.fromSelf ? '#fff' : undefined,
                            }}
                          >
                            <div className="small mb-1">{m.text}</div>
                            <div className={`text-end small ${m.fromSelf ? 'text-white-50' : 'text-muted'}`}>
                              {formatTime(m.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                      {!messages.length && !loadingMessages && <div className="text-muted">No messages yet</div>}
                    </Stack>
                  )}
                </div>
                {error && <div className="text-danger small pt-2">{error}</div>}
                <div className="pt-3 border-top mt-3">
                  <InputGroup>
                    <Form.Control
                      placeholder="Type a message..."
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      disabled={!activeId}
                    />
                    <Button
                      style={{ backgroundColor: accentColor, borderColor: accentColor }}
                      onClick={handleSend}
                      disabled={!activeId}
                    >
                      <FaPaperPlane />
                    </Button>
                  </InputGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

const MessagePage = () => (
  <React.Suspense fallback={<div className="p-3">Loading messages...</div>}>
    <MessagesContent />
  </React.Suspense>
);

export default MessagePage;
