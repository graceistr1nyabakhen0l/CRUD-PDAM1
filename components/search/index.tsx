"use client"

import { useRouter } from "next/navigation"
import { KeyboardEvent, useState } from "react"

// 1. Tambahkan url ke dalam definisi tipe Props
type Props = {
    search: string
    url: string // Tambahkan ini agar tidak error di page.tsx
}

const Search = ({ search, url }: Props) => { // 2. Ambil url dari props
    const [keyword, setKeyword] = useState<string>(search)
    const router = useRouter()

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            const params = new URLSearchParams()

            if (keyword.trim()) {
                params.set("search", keyword)
            }

            // 3. Gunakan props 'url' di sini daripada hardcode atau pakai window.location
            router.push(`${url}?${params.toString()}`)
        }
    }

    return (
        <div className="w-full">
            <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="Keyword of search"
                onKeyUp={event => handleSearch(event)}
                className="w-full border border-gray-300 rounded-md p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}

export default Search