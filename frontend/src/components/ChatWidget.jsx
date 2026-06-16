import { useEffect, useRef, useState } from "react";
import { api } from "../api.js";
import { useI18n } from "../i18n.jsx";
import Markdown from "./Markdown.jsx";

/**
 * Floating chat assistant: a bubble pinned to the bottom-right that opens a
 * simple chat panel. Stateless on the backend — we send the full message
 * history each turn and render the reply. No persistence, no sessions.
 */
export default function ChatWidget() {
  const { tr } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // {role, content}
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    // Add an empty assistant bubble that fills in as tokens stream in.
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    try {
      let acc = "";
      await api.chatStream(next, (chunk) => {
        acc += chunk;
        setMessages([...next, { role: "assistant", content: acc }]);
      });
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: tr("chat_error"), error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chat">
      {open && (
        <div className="chat__panel" role="dialog" aria-label={tr("chat_title")}>
          <div className="chat__header">
            <div>
              <p className="chat__title">{tr("chat_title")}</p>
              <p className="chat__subtitle">{tr("chat_subtitle")}</p>
            </div>
            <button
              className="chat__close"
              onClick={() => setOpen(false)}
              aria-label={tr("chat_close")}
            >
              ✕
            </button>
          </div>

          <div className="chat__body" ref={scrollRef}>
            <div className="chat__msg chat__msg--bot">{tr("chat_greeting")}</div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "chat__msg " +
                  (m.role === "user" ? "chat__msg--user" : "chat__msg--bot") +
                  (m.error ? " chat__msg--error" : "")
                }
              >
                {m.role === "assistant" && !m.error ? (
                  m.content ? (
                    <Markdown text={m.content} />
                  ) : (
                    // Empty assistant bubble while waiting for the first token.
                    <span className="chat__typing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  )
                ) : (
                  m.content
                )}
              </div>
            ))}
          </div>

          <div className="chat__inputrow">
            <textarea
              ref={inputRef}
              className="chat__input"
              rows={1}
              value={input}
              placeholder={tr("chat_placeholder")}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button
              className="chat__send"
              onClick={send}
              disabled={loading || !input.trim()}
            >
              {tr("chat_send")}
            </button>
          </div>
        </div>
      )}

      <button
        className={"chat__bubble" + (open ? " chat__bubble--open" : "")}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? tr("chat_close") : tr("chat_open")}
      >
        {open ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8 8.38 8.38 0 0 1 8.5-8.5 8.5 8.5 0 0 1 8.5 8.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
