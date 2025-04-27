'use client'

import { ST } from 'next/dist/shared/lib/utils';
import { useState } from 'react';

const MessageForm = ({ roomId }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/v1/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        student_id: studentId , // 仮の値
        company_id: companyId ,  // 仮の値
        room_id: roomId,  // roomIdも忘れず送る！
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('メッセージ送信成功:', data);
      setMessage(''); // フォームをクリア
    } else {
      const error = await response.json();
      const errorText = await response.text();
      console.error('エラー:', errorText);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="メッセージを入力..."
        required
        className="w-full border rounded p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        送信
      </button>
    </form>
  );
};

export default MessageForm;
