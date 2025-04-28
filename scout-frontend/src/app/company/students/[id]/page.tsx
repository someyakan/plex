'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const StudentDetailPage = () => {
  const { id } = useParams() // useParamsフックを使ってparamsを取得
  const [student, setStudent] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    // idが取得できているか確認
    if (!id) {
      console.error('IDが取得できませんでした')
      return
    }

    // idがstring[]型の場合、最初の要素を使う
    const studentId = Array.isArray(id) ? id[0] : id;

    // 学生データをAPIから取得
    const fetchStudent = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/students/${id}`)
        const data = await response.json()

        if (response.ok) {
          setStudent(data)
        } else {
          console.error('学生データの取得に失敗しました:', data)
        }
      } catch (error) {
        console.error('エラーが発生しました:', error)
      }
    }

    fetchStudent(studentId) // idが存在する場合のみデータを取得
  }, [id]) // id が変わるたびにデータを再取得

  // メッセージ入力のハンドラ
  const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  // メッセージ送信のハンドラ
  const handleSendMessage = async () => {
    if (!message.trim()) {
      setErrorMessage('メッセージが空です。')
      return
    }

    setIsSending(true)
    setErrorMessage('')

    try {
      const response = await fetch(`http://localhost:3001/api/v1/students/${id}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: { content: message } }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('')  // メッセージ送信後にフォームをクリア
        alert('メッセージが送信されました')
      } else {
        setErrorMessage(data.error || 'メッセージ送信に失敗しました')
      }
    } catch (error) {
      console.error('エラーが発生しました:', error)
      setErrorMessage('メッセージ送信に失敗しました')
    } finally {
      setIsSending(false)
    }
  }

  // データがまだロードされていない場合はローディングメッセージを表示
  if (!student) {
    return <p>学生情報を読み込んでいます...</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生詳細</h1>
      <p><strong>名前：</strong>{student.name}</p>
      <p><strong>メール：</strong>{student.email}</p>
      <p><strong>プロフィール：</strong>{student.profile}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">メッセージを送る</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="メッセージを入力..."
          rows={4}
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={handleSendMessage}
          disabled={isSending}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isSending ? '送信中...' : 'メッセージを送る'}
        </button>
      </div>
    </div>
  )
}

export default StudentDetailPage
