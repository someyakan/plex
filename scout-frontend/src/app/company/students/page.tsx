'use client'

import { useEffect, useState } from 'react'

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const company = JSON.parse(localStorage.getItem('company') || '{}')
        const res = await fetch(`http://localhost:3001/api/v1/companies/${company.id}/students`)
        const data = await res.json()
        setStudents(data)
      } catch (error) {
        console.error('学生一覧の取得に失敗:', error)
      }
    }

    fetchStudents()
  }, [])

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生一覧</h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="border p-4 rounded">
            <p><strong>名前：</strong>{student.name}</p>
            <p><strong>メール：</strong>{student.email}</p>
            <p><strong>プロフィール：</strong>{student.profile}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
