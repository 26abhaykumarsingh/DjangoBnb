'use client'
import CustomButton from "@/app/components/forms/CustomButton";
import { ConversationType } from "@/app/inbox/page";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

interface ConversationDetailProps {
  token: string,
  userId: string,
  conversation: ConversationType,
}

const ConversationDetail = ({ conversation, userId, token }: ConversationDetailProps) => {
  const myUser = conversation.users?.find((user) => user.id == userId)
  const otherUser = conversation.users?.find((user) => user.id != userId) // userId is my userId

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(`ws://127.0.0.1:8000/ws/${conversation.id}/?token=${token}`, {
    share: false,
    shouldReconnect: () => true,
  })

  useEffect(() => {
    console.log("Connection state changed", readyState)
  }, [readyState])

  return (
    <>
      <div className="max-h-[400px] overflow-auto flex flex-col space-y-4">
        <div className="max-w-[80%] w-fit py-4 px-6 rounded-xl bg-gray-200 wrap-break-words hyphens-auto">
          <p className="font-bold text-gray-500">John Doe</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt suscipit quas reiciendis atque incidunt, praesentium amet voluptate perspiciatis ea esse cupiditate quia eum commodi eos. A repellat aliquam praesentium dicta.</p>
        </div>

        <div className="max-w-[80%] w-fit ml-auto py-4 px-6 rounded-xl bg-blue-200 wrap-break-words hyphens-auto">
          <p className="font-bold text-gray-500">Abhay</p>
          <p>skldfjsdkljfsladkjfaklsdfjskldajfsdkljfsdkljfsdkljfsd</p>
        </div>
      </div>

      <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-2 bg-gray-200 rounded-xl"
        />

        <CustomButton
          label="Send"
          onClick={() => console.log('Clicked')}
          className="w-[100px]"
        />
      </div>
    </>
  )
}

export default ConversationDetail;
