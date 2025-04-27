'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EditProfile() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profile: '',
  })

  useEffect(() => {
    // ローカルストレージから学生情報を取得
    const storedStudent = localStorage.getItem('student')
    if (!storedStudent) {
      router.push('/student/login')  // ログインしていない場合はログインページへリダイレクト
    }

    try {
      const parsedStudent = JSON.parse(storedStudent)
      setStudent(parsedStudent)
      setFormData({
        name: parsedStudent.name || '',
        email: parsedStudent.email || '',
        profile: parsedStudent.profile || '',
      })
    } catch (err) {
      console.error('学生データの読み込みに失敗しました:', err)
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!student) {
      alert('学生情報が読み込まれていません')
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/api/v1/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student: formData }),
      })

      const data = await res.json()

      if (res.ok && data.student) {
        alert('✅ 更新しました！')
        localStorage.setItem('student', JSON.stringify(data.student))  // 更新した情報をlocalStorageに保存
        router.push('/student/mypage')  // 更新後、マイページへリダイレクト
      } else {
        alert('⚠️ 更新に失敗しました: ' + (data.errors?.join(', ') || '不明なエラー'))
      }
    } catch (err) {
      console.error('通信エラー:', err)
      alert('❌ 通信エラーが発生しました')
    }
  }

  if (!student) return <p className="p-8">読み込み中...</p>

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="名前"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="メール"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="プロフィール"
          value={formData.profile}
          onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          保存
        </button>
      </form>
    </main>
  )
}
