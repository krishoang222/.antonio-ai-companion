'use client';

import { Companion } from '@prisma/client';
import { useEffect, useState } from 'react';

import { ChatMessage, ChatMessageProps } from '@/components/chat-message';

interface ChatMessagesProps {
	companion: Companion;
	isLoading: boolean;
	messages: ChatMessageProps[];
}

export const ChatMessages = ({
	companion,
	isLoading,
	messages = [],
}: ChatMessagesProps) => {
	const [fakeLoading, setFakeLoading] = useState(
		messages.length === 0 ? true : false
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setFakeLoading(false);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	});

	return (
		<div className="flex-1 overflow-y-auto pr-4">
			<ChatMessage
				isLoading={fakeLoading}
				src={companion.src}
				role="system"
				content={`Hello, I am ${companion.name}, ${companion.description}`}
			/>
			{messages.map((message) => (
				<ChatMessage
					key={message.id}
					src={companion.src}
					content={message.content}
					role={message.role}
				/>
			))}
			{isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
		</div>
	);
};
