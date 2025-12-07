'use client'
import React from 'react'
import type { Editor } from '@tiptap/react'  
import { Bold, Italic, Underline, Heading2, List } from 'lucide-react'

type ToolbarProps = {
  editor: Editor | null
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null

  const base =
    'px-2 py-1 rounded border text-sm flex items-center gap-1 transition'

  const active = (name: string, p0?: { level: number }) =>
    editor.isActive(name) ? 'bg-black text-white' : 'bg-white'

  return (
    <div className="flex gap-2 flex-wrap mb-2">
      <button
        className={`${base} ${active('bold')}`}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} /> Bold
      </button>

      <button
        className={`${base} ${active('italic')}`}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} /> Italic
      </button>

      <button
        className={`${base} ${active('underline')}`}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} /> Underline
      </button>

      <button
        className={`${base} ${active('heading', { level: 2 })}`}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 size={16} /> H2
      </button>

      <button
        className={`${base} ${active('bulletList')}`}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} /> Bullets
      </button>
    </div>
  )
}
