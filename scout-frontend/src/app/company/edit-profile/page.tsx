'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditCompanyProfile() {
  const [company, setCompany] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: '',
  })

  const router = useRouter()

  useEffect(() => {
    const storedCompany = localStorage.getItem('company')
    if (!storedCompany) {
      console.warn('localStorage に企業情報がありません')
      return
    }

    try {
      const parsedCompany = JSON.parse(storedCompany)
      setCompany(parsedCompany)
      setFormData({
        name: parsedCompany.name || '',
        email: parsedCompany.email || '',
        profile: parsedCompany.profile || '',
      })
    } catch (err) {
      console.error('企業データの読み込みに失敗しました:', err)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!company) {
      alert('企業情報が読み込まれていません')
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/api/v1/companies/${company.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company: {
            name: formData.name,
            email: formData.email,
            profile: formData.profile,
          },
        }),
      })

      const data = await res.json()
      console.log('✅ サーバーからのレスポンス:', data)

      if (res.ok) {
        alert('✅ 更新しました！')
        localStorage.setItem('company', JSON.stringify(data.company))
        router.push('/company/mypage')
      } else {
        console.error('更新失敗:', data.errors)
        alert('⚠️ 更新に失敗しました: ' + (data.errors?.join(', ') || JSON.stringify(data) || '不明なエラー'))
      }
    } catch (err) {
      console.error('通信エラー:', err)
      alert('❌ 通信エラーが発生しました')
    }
  }

  if (!company) return <p className="p-8">読み込み中...</p>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">企業プロフィール編集</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="企業名"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="メール"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="プロフィール"
          value={formData.profile}
          onChange={e => setFormData({ ...formData, profile: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          保存
        </button>
      </form>
    </main>
  )
}
