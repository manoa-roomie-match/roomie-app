import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/100?img=64';

const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }
  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, email: true },
  });
};

const buildConversations = async (userId: number) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: { select: { id: true, email: true } },
      receiver: { select: { id: true, email: true } },
    },
  });

  const otherEmails = Array.from(
    new Set(
      messages.map((m) => (m.senderId === userId ? m.receiver.email : m.sender.email)),
    ),
  );

  const profiles = await prisma.student.findMany({
    where: { email: { in: otherEmails } },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      profilePicture: true,
    },
  });
  const profileMap = new Map(profiles.map((p) => [p.email, p]));

  const convoMap = new Map<
  number,
  {
    userId: number;
    email: string;
    name: string;
    avatar: string;
    unreadCount: number;
    lastMessage: string;
    lastTimestamp: string;
  }
  >();

  messages.forEach((msg) => {
    const isOutgoing = msg.senderId === userId;
    const otherUser = isOutgoing ? msg.receiver : msg.sender;
    const otherEmail = otherUser.email;
    const profile = profileMap.get(otherEmail);
    if (!convoMap.has(otherUser.id)) {
      const fullName = profile ? `${profile.firstName} ${profile.lastName}` : otherEmail;
      convoMap.set(otherUser.id, {
        userId: otherUser.id,
        email: otherEmail,
        name: fullName,
        avatar: profile?.profilePicture || DEFAULT_AVATAR,
        unreadCount: 0,
        lastMessage: msg.content,
        lastTimestamp: msg.createdAt.toISOString(),
      });
    }
    if (!isOutgoing && msg.readAt === null) {
      const convo = convoMap.get(otherUser.id);
      if (convo) {
        convo.unreadCount += 1;
      }
    }
  });

  return Array.from(convoMap.values());
};

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const withParam = request.nextUrl.searchParams.get('with');
    if (withParam) {
      const targetId = Number(withParam);
      if (Number.isNaN(targetId)) {
        return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
      }
      const targetUser = await prisma.user.findUnique({
        where: { id: targetId },
        select: { id: true },
      });
      if (!targetUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      await prisma.message.updateMany({
        where: {
          receiverId: currentUser.id,
          senderId: targetId,
          readAt: null,
        },
        data: { readAt: new Date() },
      });

      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: currentUser.id, receiverId: targetId },
            { senderId: targetId, receiverId: currentUser.id },
          ],
        },
        orderBy: { createdAt: 'asc' },
        select: {
          id: true,
          content: true,
          createdAt: true,
          senderId: true,
        },
      });

      return NextResponse.json({
        messages: messages.map((m) => ({
          id: m.id,
          content: m.content,
          createdAt: m.createdAt.toISOString(),
          senderId: m.senderId,
        })),
        currentUserId: currentUser.id,
      });
    }

    const conversations = await buildConversations(currentUser.id);
    return NextResponse.json({ conversations, currentUserId: currentUser.id });
  } catch (error) {
    console.error('Error in messages GET:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { toUserId, content } = body || {};
    if (!toUserId || !content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const targetUser = await prisma.user.findUnique({
      where: { id: Number(toUserId) },
      select: { id: true },
    });
    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    const created = await prisma.message.create({
      data: {
        senderId: currentUser.id,
        receiverId: Number(toUserId),
        content,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        senderId: true,
        receiverId: true,
      },
    });

    return NextResponse.json({
      message: {
        id: created.id,
        content: created.content,
        createdAt: created.createdAt.toISOString(),
        senderId: created.senderId,
        receiverId: created.receiverId,
      },
    });
  } catch (error) {
    console.error('Error in messages POST:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
