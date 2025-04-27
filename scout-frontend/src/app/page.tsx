'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    role: 'student',
    name: '',
    profile: ''
  })

  const [message, setMessage] = useState<string | null>(null)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  const router = useRouter()

  // handleSubmit関数を追加
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    try {
      const res = await fetch('http://localhost:3001/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation,
            role: formData.role,
            name: formData.name,
            profile: formData.profile,
          }
        })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ 登録が完了しました！')
        setFormData({
          email: '',
          password: '',
          passwordConfirmation: '',
          role: 'student',
          name: '',
          profile: ''
        })
      } else {
        setMessage('⚠️ 登録に失敗しました: ' + (data.errors?.join(', ') || '不明なエラー'))
      }

    } catch (err) {
      console.error('エラー:', err)
      setMessage('❌ ネットワークエラーが発生しました')
    }
  }

  const handleRoleChange = (role: 'student' | 'company') => {
    setFormData({
      ...formData,
      role: role,
      name: '',
      profile: ''
    })
    setIsRegistering(true)

    // 役割に応じてページ遷移
    if (role === 'student') {
      router.push('/student/register')
    } else if (role === 'company') {
      router.push('/company/register')
    }
  }

  return (
    <main className="p-8">
      {!isRegistering ? (
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleRoleChange('student')}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            学生として登録
          </button>
          <button
            onClick={() => handleRoleChange('company')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            企業として登録
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <input
            type="email"
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
            placeholder="確認用パスワード"
            value={formData.passwordConfirmation}
            onChange={e => setFormData({ ...formData, passwordConfirmation: e.target.value })}
          />
          <input
            type="text"
            placeholder="名前"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <textarea
            placeholder="プロフィール"
            value={formData.profile}
            onChange={e => setFormData({ ...formData, profile: e.target.value })}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            登録
          </button>
        </form>
      )}

      {message && (
        <p className="mt-4 text-center text-sm font-medium text-green-600">{message}</p>
      )}
    </main>
  )
}
