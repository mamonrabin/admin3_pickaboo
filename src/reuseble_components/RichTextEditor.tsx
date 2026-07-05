"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Link2,

} from "lucide-react";

type RichTextEditorProps = {
  value?: string;

  onChange?: (value: string) => void;
};

export default function RichTextEditor({
  value = "",
  onChange,

}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class: "ProseMirror min-h-[220px]",
      },
    },

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded transition border ${
      active
        ? "bg-primary text-white"
        : "hover:bg-gray-100 border-transparent"
    }`;

  return (
    <div className="rounded-md border overflow-hidden">
        
      <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2">
        <button
          type="button"
          className={btn(false)}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={18} />
        </button>

        <button
          type="button"
          className={btn(false)}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={18} />
        </button>

        <Select
  value={
    editor.isActive("heading", { level: 1 })
      ? "h1"
      : editor.isActive("heading", { level: 2 })
      ? "h2"
      : editor.isActive("heading", { level: 3 })
      ? "h3"
      : editor.isActive("heading", { level: 4 })
      ? "h4"
      : editor.isActive("heading", { level: 5 })
      ? "h5"
      : editor.isActive("heading", { level: 6 })
      ? "h6"
      : "paragraph"
  }
  onValueChange={(value) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
      return;
    }

    editor
      .chain()
      .focus()
      .toggleHeading({
        level: Number(value.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6,
      })
      .run();
  }}
>
  <SelectTrigger className="w-36 h-9 rounded">
    <SelectValue />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="paragraph">Paragraph</SelectItem>
    <SelectItem className="text-xl" value="h1">Heading 1</SelectItem>
    <SelectItem className="text-lg" value="h2">Heading 2</SelectItem>
    <SelectItem className="text-md" value="h3">Heading 3</SelectItem>
    <SelectItem className="text-sm" value="h4">Heading 4</SelectItem>
    <SelectItem className="text-xs" value="h5">Heading 5</SelectItem>
    <SelectItem className="text-xs" value="h6">Heading 6</SelectItem>
  </SelectContent>
</Select>

        <button
          type="button"
          className={btn(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={18} />
        </button>

        <button
          type="button"
          className={btn(editor.isActive("link"))}
          onClick={() => {
            const url = window.prompt("Enter URL");

            if (!url) return;

            editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <Link2 size={18} />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}