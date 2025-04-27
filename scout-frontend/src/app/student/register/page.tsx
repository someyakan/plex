'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StudentRegister() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('http://localhost:3001/api/v1/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        student: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.passwordConfirmation,
        }
      })
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('student', JSON.stringify(data.student))
      router.push('/student/mypage')
    } else {
      alert('登録失敗: ' + (data.errors?.join(', ') || '不明なエラー'))
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生登録</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          placeholder="名前"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          placeholder="メール"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="確認パスワード"
          value={formData.passwordConfirmation}
          onChange={e => setFormData({ ...formData, passwordConfirmation: e.target.value })}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded">登録</button>
      </form>
    </main>
  )
}
