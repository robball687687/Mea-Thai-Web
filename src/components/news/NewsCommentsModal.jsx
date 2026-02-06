import React, { useEffect, useMemo, useState } from "react";
import newsCommentsApi from "../../api/newsCommentsApi";

function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

function ReplyForm({ blogPostId, parentCommentId, onPosted, onCancel }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const canSubmit = useMemo(() => {
    const n = displayName.trim();
    const b = body.trim();
    return blogPostId > 0 && n.length >= 2 && b.length >= 3;
  }, [blogPostId, displayName, body]);

  const submit = async () => {
    setMsg("");
    try {
      await newsCommentsApi.create({
        blogPostId,
        parentCommentId,
        displayName: displayName.trim(),
        email: email.trim() ? email.trim() : null,
        body: body.trim(),
      });

      setDisplayName("");
      setEmail("");
      setBody("");
      setMsg("Posted ✅");

      await onPosted?.();
      onCancel?.();
    } catch (e) {
      const err =
        e?.response?.data?.message ||
        e?.response?.data ||
        e?.message ||
        "Could not post reply.";
      setMsg(String(err));
    }
  };

  return (
    <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-4">
      <div className="font-bold text-sm mb-2">Reply</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <textarea
        className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-red-200"
        placeholder="Write a reply…"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="mt-3 flex items-center gap-2">
        <button
          className={`rounded-xl px-4 py-2 text-sm font-semibold ${
            canSubmit
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={submit}
          disabled={!canSubmit}
        >
          Post Reply
        </button>

        <button
          className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>

        {msg ? <div className="text-sm text-gray-600">{msg}</div> : null}
      </div>
    </div>
  );
}

function CommentItem({
  c,
  depth = 0,
  blogPostId,
  replyOpenForId,
  setReplyOpenForId,
  onPosted,
}) {
  const isReplyOpen = replyOpenForId === c.commentId;

  return (
    <div className="py-3" style={{ paddingLeft: depth * 18 }}>
      <div className="flex items-baseline gap-2">
        <div className="font-extrabold text-sm text-gray-900">
          {c.displayName || "Anonymous"}
        </div>
        {c.createdUtc ? (
          <div className="text-xs text-gray-500">{formatDateTime(c.createdUtc)}</div>
        ) : null}
      </div>

      <div className="mt-1 text-sm text-gray-800 whitespace-pre-wrap">{c.body}</div>

      <div className="mt-2">
        <button
          className="text-sm font-semibold text-red-700 hover:text-red-800"
          onClick={() => setReplyOpenForId(isReplyOpen ? null : c.commentId)}
        >
          {isReplyOpen ? "Close" : "Reply"}
        </button>
      </div>

      {isReplyOpen ? (
        <ReplyForm
          blogPostId={blogPostId}
          parentCommentId={c.commentId}
          onPosted={onPosted}
          onCancel={() => setReplyOpenForId(null)}
        />
      ) : null}

      {Array.isArray(c.replies) && c.replies.length > 0 ? (
        <div className="mt-2 border-l border-gray-200 pl-3">
          {c.replies.map((r) => (
            <CommentItem
              key={r.commentId}
              c={r}
              depth={depth + 1}
              blogPostId={blogPostId}
              replyOpenForId={replyOpenForId}
              setReplyOpenForId={setReplyOpenForId}
              onPosted={onPosted}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function NewsCommentsModal({ open, onClose, blogPostId, title }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");

  const [replyOpenForId, setReplyOpenForId] = useState(null);

  const canSubmit = useMemo(() => {
    const n = displayName.trim();
    const b = body.trim();
    return blogPostId > 0 && n.length >= 2 && b.length >= 3;
  }, [blogPostId, displayName, body]);

  const load = async () => {
    if (!blogPostId) return;
    setLoading(true);
    try {
      const data = await newsCommentsApi.getApprovedByPost(blogPostId);
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;

    setMsg("");
    setReplyOpenForId(null);
    load();
    // only runs when open/blogPostId changes
  }, [open, blogPostId]);

  const submitRoot = async () => {
    setMsg("");
    try {
      await newsCommentsApi.create({
        blogPostId,
        parentCommentId: null,
        displayName: displayName.trim(),
        email: email.trim() ? email.trim() : null,
        body: body.trim(),
      });

      setDisplayName("");
      setEmail("");
      setBody("");
      setMsg("Posted ✅");

      await load();
    } catch (e) {
      const err =
        e?.response?.data?.message ||
        e?.response?.data ||
        e?.message ||
        "Could not post comment.";
      setMsg(String(err));
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="News comments"
      onMouseDown={(e) => {
        // click outside closes
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* modal */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="font-black text-lg">
            Comments{title ? ` — ${title}` : ""}
          </div>
          <button
            className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
            onClick={onClose}
          >
            Close ✕
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto p-5">
          {/* Root form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-extrabold mb-2">Leave a comment</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <input
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Email (optional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <textarea
              className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm min-h-[110px] focus:outline-none focus:ring-2 focus:ring-red-200"
              placeholder="Write your comment…"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />

            <div className="mt-3 flex items-center gap-2">
              <button
                className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                  canSubmit
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                onClick={submitRoot}
                disabled={!canSubmit}
              >
                Post Comment
              </button>

              {msg ? <div className="text-sm text-gray-600">{msg}</div> : null}
            </div>
          </div>

          <div className="my-4 h-px bg-gray-200" />

          <div className="text-sm text-gray-600 mb-2">
            {loading ? "Loading comments…" : `${comments.length} comment(s)`}
          </div>

          {!loading && comments.length === 0 ? (
            <div className="text-sm text-gray-600">
              No comments yet — be the first one.
            </div>
          ) : null}

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.commentId} className="rounded-2xl border border-gray-200 p-4">
                <CommentItem
                  c={c}
                  depth={0}
                  blogPostId={blogPostId}
                  replyOpenForId={replyOpenForId}
                  setReplyOpenForId={setReplyOpenForId}
                  onPosted={load}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          Please be respectful — thanks for supporting our family business 🇹🇭❤️
        </div>
      </div>
    </div>
  );
}
