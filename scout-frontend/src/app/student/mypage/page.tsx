'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentMypage() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [rooms, setRooms] = useState<any[]>([])

  // 学生情報の読み込み
  useEffect(() => {
    const storedStudent = localStorage.getItem('student')
    if (!storedStudent) {
      console.warn('localStorage に学生情報がありません')
      router.push('/student/login')
      return
    }

    try {
      const parsedStudent = JSON.parse(storedStudent)
      setStudent(parsedStudent)
    } catch (err) {
      console.error('学生データの読み込みに失敗しました:', err)
    }
  }, [])

  // 自分のRoomsを取得
  useEffect(() => {
    if (student) {
      console.log('学生情報:', student)  // 学生情報の確認
      fetch(`http://localhost:3001/api/v1/students/${student.id}/rooms`)
        .then(res => res.json())
        .then(data => {
          setRooms(data)
        })
        .catch(err => {
          console.error('ルーム取得失敗:', err)
        })
    }
  }, [student])

  // メッセージの取得
  useEffect(() => {
    if (student) {
      fetch(`/api/v1/students/${student.id}/mypage`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // トークンで認証
        },
      })
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) => console.error(error))
    }
  }, [student])

  useEffect(() => {
    console.log('roomsの状態:', rooms)  // roomsの中身を確認
  }, [rooms])  // roomsの変更を監視

  if (!student) return <p className="p-8">読み込み中...</p>

  // プロフィール編集ページへの遷移
  const handleEditProfile = () => {
    router.push('/student/edit-profile')
  }

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem('student')
    router.push('/student/login')
  }

  // ★ルーム作成関数
  const handleCreateRoom = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: student.id,
          company_id: 2, // ★ 仮で「会社ID 2」にルーム作成（後で動的に選べるように）
        }),
      })

      if (!response.ok) {
        const errorText = await response.text();
        console.error('エラー内容:', errorText)
        throw new Error('ルーム作成に失敗しました')
      }

      const data = await response.json()
      console.log('ルーム作成成功:', data)
      alert('ルームが作成されました！')

      // ★作成後にルーム一覧を更新する
      setRooms(prevRooms => [...prevRooms, data])  // データの形式を確認して調整
    } catch (error) {
      console.error('ルーム作成エラー:', error)
      alert('ルーム作成に失敗しました')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生マイページ</h1>

      <div className="mb-6 space-y-2">
        <p><strong>名前：</strong>{student.name}</p>
        <p><strong>メール：</strong>{student.email}</p>
        <p><strong>プロフィール：</strong>{student.profile || '未入力'}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          プロフィール編集
        </button>

        <button
          onClick={handleCreateRoom}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          ルーム作成
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded ml-auto"
        >
          ログアウト
        </button>
      </div>

      {/* DMルーム一覧 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">あなたのDM一覧</h2>
        {rooms.length > 0 ? (
          <ul className="space-y-4">
            {rooms.map(room => (
              <li key={room.id} className="border p-4 rounded shadow">
                <p>ルームID: {room.id}</p>
                <p>企業ID: {room.company_id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>まだDMはありません。</p>
        )}
      </section>

      {/* メッセージ一覧 */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">あなたのメッセージ</h2>
        {messages.length > 0 ? (
          <ul className="space-y-4">
            {messages.map((message) => (
              <li key={message.id} className="border p-4 rounded shadow">
                <strong>{message.company.name}</strong>: {message.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>メッセージはありません。</p>
        )}
      </section>
    </main>
  )
}
