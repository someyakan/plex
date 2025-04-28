'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([])

  useEffect(() => {
    // 環境変数からAPI URLを取得
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) {
      console.error("API URLが設定されていません")
      return
    }

    // APIから学生一覧を取得する処理
    fetch(`${apiUrl}/students`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStudents(data)
        } else {
          console.error('学生データが配列ではありません:', data)
        }
      })
      .catch((error) => {
        console.error('学生データの取得に失敗しました:', error)
      })
  }, [])

  if (!students || students.length === 0) {
    return <p>学生がいません。</p>
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">学生一覧</h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student.id} className="border p-4 rounded">
            <p><strong>名前：</strong>{student.name}</p>
            <p><strong>メール：</strong>{student.email}</p>
            {/* 学生の詳細ページへのリンク */}
            <Link href={`/company/students/${student.id}`}>
              <button className="text-blue-500 hover:underline mt-2">詳細を見る</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
