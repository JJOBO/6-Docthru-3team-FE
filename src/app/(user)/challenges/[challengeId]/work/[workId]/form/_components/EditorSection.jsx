import Editor from "./Editor";

export default function EditorSection({
  challengeTitle,
  content,
  handleContent,
  onDraft,
  isDrafting,
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-bold">{challengeTitle}</span>

      <Editor
        challengeTitle={challengeTitle}
        content={content}
        handleContent={handleContent}
        onDraft={onDraft}
        isDrafting={isDrafting}
      />
    </div>
  );
}
