'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import MessageForm from '@/app/components/MessageForm' // 追加！

export default function CompanyMypage() {
  const [company, setCompany] = useState<any>(null)
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
    } catch (err) {
      console.error('企業データの読み込みに失敗しました:', err)
    }
  }, [])

  if (!company) return <p className="p-8">読み込み中...</p>

  const handleEditProfile = () => {
    router.push('/company/edit-profile')
  }

  const handleLogout = () => {
    localStorage.removeItem('company')
    router.push('/company/login')
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">企業マイページ</h1>

      <div className="mb-6 space-y-2">
        <p><strong>会社名：</strong>{company.name}</p>
        <p><strong>メール：</strong>{company.email}</p>
        <p><strong>プロフィール：</strong>{company.profile}</p>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleEditProfile}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          プロフィール編集
        </button>
        <button
            onClick={() => router.push('/company/students')}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
          登録してる生徒一覧
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded ml-auto"
        >
          ログアウト
        </button>
      </div>

      {/* ここに追加！ */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">生徒へのメッセージ送信</h2>
        <MessageForm roomId={1} /> {/* 仮のroomId */}
      </div>
    </main>
  )
}
