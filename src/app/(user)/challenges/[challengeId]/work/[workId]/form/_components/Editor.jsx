"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Placeholder from "@tiptap/extension-placeholder";
import { useState, useEffect } from "react";
import Image from "next/image";

// Import icons
import IconBold from "@/assets/editor/ic_bold.svg";
import IconItalic from "@/assets/editor/ic_italic.svg";
import IconUnderline from "@/assets/editor/ic_underline.svg";
import IconLeft from "@/assets/editor/ic_left.svg";
import IconCenter from "@/assets/editor/ic_center.svg";
import IconRight from "@/assets/editor/ic_right.svg";
import IconOrderedList from "@/assets/editor/ic_list_ordered.svg";
import IconBulletList from "@/assets/editor/ic_list_bullet.svg";
import IconTextColor from "@/assets/editor/ic_textColor.svg";
import ClipLoader from "react-spinners/ClipLoader";

export default function Editor({ challengeTitle, content, handleContent, onDraft, isDrafting }) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false // ✅ 중복 방지를 위해 명시적으로 끄기
      }),
      TextStyle,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "bulletList", "orderedList"]
      }),
      Color.configure({ types: [TextStyle.name] }),
      BulletList,
      OrderedList,
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item"
        }
      }),
      Placeholder.configure({
        placeholder: "번역 내용을 적어주세요",
        emptyEditorClass: "is-editor-empty"
      })
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-lg focus:outline-none w-full max-w-full"
      }
    },
    onUpdate: ({ editor }) => {
      handleContent(editor.getHTML());
    },
    immediatelyRender: false // ✅ SSR 환경 대응을 위한 필수 옵션
  });

  // content props가 변경될 때 에디터 내용 업데이트
  useEffect(() => {
    if (!editor) return;

    // content prop이 변경될 때 에디터 내용 업데이트
    if (content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const handleSaveShortcut = (e) => {
      const isMac = navigator.userAgent.includes("Mac");
      const isSaveKey = (isMac && e.metaKey && e.key === "s") || (!isMac && e.ctrlKey && e.key === "s");

      if (isSaveKey) {
        e.preventDefault();

        const html = editor.getHTML();
        onDraft(challengeTitle, html);
      }
    };

    document.addEventListener("keydown", handleSaveShortcut);
    return () => {
      document.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [editor, challengeTitle]);

  const colors = [
    "#000000", // Black
    "#EF4444", // Red
    "#F97316", // Orange
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#A855F7" // Purple
  ];

  // TODO: 추후 로딩으로 수정
  if (!editor) return null;

  return (
    <div className="flex flex-col rounded-lg border-t border-gray-200">
      <div className="flex flex-col items-start justify-between">
        <div className="flex items-center gap-1 pt-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 ${editor.isActive("bold") ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconBold} alt="Bold" width={10} height={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 ${editor.isActive("italic") ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconItalic} alt="Italic" width={12} height={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 ${editor.isActive("underline") ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconUnderline} alt="Underline" width={12} height={15} />
          </button>

          <div className="mx-2 h-6 w-[1px] bg-gray-200" />
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 ${editor.isActive({ textAlign: "center" }) ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconCenter} alt="Align Center" width={14} height={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 ${editor.isActive({ textAlign: "right" }) ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconRight} alt="Align Right" width={14} height={14} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 ${editor.isActive({ textAlign: "left" }) ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconLeft} alt="Align Left" width={14} height={14} />
          </button>
          <div className="mx-2 h-6 w-[1px] bg-gray-200" />
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 ${editor.isActive("bulletList") ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconBulletList} alt="Bullet List" width={14} height={14} />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 ${editor.isActive("orderedList") ? "rounded bg-gray-200" : ""}`}
          >
            <Image src={IconOrderedList} alt="Ordered List" width={14} height={14} />
          </button>

          <div className="relative">
            <button onClick={() => setShowColorPicker(!showColorPicker)} className="p-2 pl-5">
              <Image src={IconTextColor} alt="Text Color" width={14} height={14} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 z-10 mt-1 flex gap-1 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setShowColorPicker(false);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 임시 저장중 표시 로딩 */}
        <div className="flex h-6 w-full gap-1 pl-1 pt-1 pb-2">
          {isDrafting && (
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-500">임시 저장중</span>
              <ClipLoader color="#3B82F6" size={10} />
            </div>
          )}
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="h-[calc(100vh-250px)] min-h-[300px] pb-5 sm:pb-0 overflow-y-auto text-lg [&_.is-editor-empty]:before:pointer-events-none [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:h-0 [&_.is-editor-empty]:before:text-lg [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
