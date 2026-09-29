"use client";

import React, { useState, useEffect } from 'react';
import apiService from '@/app/services/apiService';
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import { UserType } from '../page';
import { getAccessToken } from '@/app/lib/actions';
import Link from 'next/link';

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType
}

const ConversationPage = async ( {params} : {params: Promise<{id: string}>}) => {
  const userId = await getUserId();
  const token = await getAccessToken();
  const { id } = await params;

  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] mx-auto px-6 py-12 flex flex-col items-center justify-center mt-20">
        <p className="text-xl text-gray-600 mb-6">You need to be authenticated to view your conversations.</p>
        <Link href="/" className="px-6 py-3 bg-airbnb text-white rounded-xl hover:bg-rose-600 transition">
          Return Home
        </Link>
      </main>
    );
  }

  const conversation = await apiService.get(`/api/chat/${id}/`)

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <ConversationDetail
        token={token}
        userId={userId}
        messages={conversation.messages}
        conversation={conversation.conversation}
      />
    </main>
  );
}

export default ConversationPage;
