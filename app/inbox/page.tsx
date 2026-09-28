'use client';

import { getUserId } from "../lib/actions";
import apiService from "../services/apiService";
import React, { useState, useEffect } from 'react';
import Conversation from "@/app/components/inbox/Conversation";

export type UserType = {
  id: string;
  name: string;
  avatar_url: string;
}

export type ConversationType = {
  id: string;
  users: UserType[];
}

const InboxPage = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getUserId();
      setUserId(id);

      if (id) {
        const fetchedConversations = await apiService.get('/api/chat/');
        setConversations(fetchedConversations);
      }
    };

    fetchData();
  }, []);

  if (!userId) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12">
        <p>You need to be authenticated...</p>
      </main>
    )
  }

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
      <h1 className="my-6 text-2xl">Inbox</h1>

      {conversations?.map((conversation: ConversationType) => {
        return (
          <Conversation key={conversation.id} userId={userId} conversation={conversation} />
        )
      })}
    </main>
  );
}

export default InboxPage;
