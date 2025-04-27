'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CompanyLogin() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://localhost:3001/api/v1/company_login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('company', JSON.stringify(data.company))
      router.push('/company/mypage')
    } else {
      alert('ログイン失敗: ' + data.error)
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">企業ログイン</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input placeholder="メール" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="パスワード" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">ログイン</button>
      </form>
    </main>
  )
}
