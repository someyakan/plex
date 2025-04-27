'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3001/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (res.ok && data.student) {
        console.log('ログイン成功:', data.student)

        // ユーザー情報をlocalStorageに保存
        localStorage.setItem('student', JSON.stringify(data.student))

        // 学生マイページへ遷移
        router.push('/student/mypage')
      } else {
        alert('ログイン失敗: ' + (data.error || '不明なエラー'))
      }

    } catch (err) {
      console.error('エラー:', err)
      alert('通信エラーが発生しました')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生ログイン</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="メール"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          ログイン
        </button>
      </form>
    </main>
  )
}
