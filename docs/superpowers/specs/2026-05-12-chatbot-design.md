# DOK Solutions Lanka — Chatbot Design Spec
**Date:** 2026-05-12

## Overview

A floating chat widget that lives on every page of the DOK Solutions Lanka website. Users can ask questions about services and get help navigating to the right page. Answers come from a pre-written Q&A data file — no AI API, no server, no cost per message.

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Answer source | Pre-written Q&A | Accurate, free, easy to maintain |
| Widget position | Floating bubble, bottom-right | Familiar pattern, always accessible |
| Bot name & tone | "DOK Assistant", professional | Matches enterprise brand identity |
| Interaction model | Quick-topic buttons + free typing | Guided for most users, flexible for all |
| Keyword matching | Simple word-count scoring | No dependencies, fast, predictable |

---

## Topics Covered

1. **Services** — Physical Archiving, Document Digitizing, BPO, Insurance Policy Management, auraDOCS
2. **Navigation** — "Take me to Contact", "Show me Services", "Where is the blog?"
3. **Company info** — Who is DOK, part of Abans Group, certifications
4. **ISO Certifications** — ISO 9001, ISO 27001, ISO 45001
5. **Getting a quote / contacting** — Phone, email, contact form link
6. **Careers** — Link to careers page
7. **auraDOCS** — Deeper questions about the cloud DMS product

---

## Files

### New files
- `components/ui/ChatBot.tsx` — complete widget component (bubble + panel + logic)
- `lib/chatbot-data.ts` — all Q&A pairs, keywords, categories, and page links

### Modified files
- `app/layout.tsx` — import and render `<ChatBot />` once inside the root layout

---

## Data Structure

```ts
// lib/chatbot-data.ts

export type QAEntry = {
  id: string;
  category: 'Services' | 'Navigation' | 'Company' | 'Contact' | 'Careers' | 'auraDOCS';
  buttonLabel?: string;       // shown as a quick-topic chip (only top-level entries)
  keywords: string[];         // lowercase partial words for matching
  question: string;           // human-readable label
  answer: string;             // the bot's response text
  link?: {
    label: string;
    href: string;
  };
};
```

Each service, navigation route, and FAQ topic is one `QAEntry` object. Adding a new topic requires only adding a new object to the array — no code changes.

**Quick-topic buttons** are entries where `buttonLabel` is set. These 6 appear on the welcome screen:

| Button | Category |
|---|---|
| 📦 Physical Archiving | Services |
| 🖥 auraDOCS | auraDOCS |
| ⚙️ BPO | Services |
| 📄 Document Digitizing | Services |
| 🏢 About DOK | Company |
| 📞 Contact | Contact |

---

## Keyword Matching Algorithm

```
function findBestMatch(userMessage: string, entries: QAEntry[]): QAEntry | null {
  const words = userMessage.toLowerCase().split(/\s+/)
  let bestScore = 0
  let bestEntry = null

  for each entry:
    score = count of entry.keywords that appear in any word of userMessage
    if score > bestScore:
      bestScore = score
      bestEntry = entry

  return bestScore >= 1 ? bestEntry : null  // null triggers fallback
}
```

Partial keyword matching (e.g. `"archiv"` matches "archiving", "archives", "archived") keeps the list concise and handles natural phrasing variations.

---

## Chat Flow

```
User opens page
  └─ Bubble visible bottom-right (pulsing animation)
       └─ User clicks bubble
            └─ Panel opens (350px wide, 480px tall)
                 ├─ Bot: "Hello! I'm DOK Assistant…"
                 ├─ 6 quick-topic chips shown
                 │
                 ├─ User taps chip ──────────────────────────────────────────┐
                 │    └─ Chip text sent as user message                       │
                 │    └─ Bot answer shown                                     │
                 │    └─ Optional page-link button shown                      │
                 │    └─ "Back to topics" button resets to welcome state ◄───┘
                 │
                 └─ User types freely
                      └─ findBestMatch() runs on submit
                           ├─ Match found → show answer + optional link
                           └─ No match → "I'm not sure… contact us" + Contact link
```

---

## Component Design: `ChatBot.tsx`

```
<ChatBot>                          // client component, fixed positioned
  <Bubble />                       // bottom-right circle, onClick opens panel
  <Panel open={isOpen}>            // animated slide-up panel
    <PanelHeader />                // "DOK Assistant" title + close button
    <MessageThread messages={[]}>  // scrollable list of chat bubbles
      <BotMessage />
      <UserMessage />
    </MessageThread>
    <QuickTopics />                // shown after welcome or after "Back to topics"
    <InputRow />                   // text input + send button
  </Panel>
</ChatBot>
```

All state lives in `ChatBot` — no global state, no context. State includes:
- `isOpen: boolean`
- `messages: Message[]` where `Message = { role: 'bot' | 'user', text: string, link?: Link }`
- `showTopics: boolean` — controls quick-topic chip visibility

---

## UI Details

- **Bubble:** 56px circle, `bg-brand-navy`, white 💬 icon, `shadow-lg`, subtle pulse `animate-pulse` (stops after first open)
- **Panel:** `w-[350px] h-[480px]`, `rounded-2xl`, `shadow-2xl`, slides up with framer-motion on open
- **Header:** navy background, "DOK Assistant" in white, X close button
- **Bot messages:** left-aligned, navy background, white text, rounded `0 12px 12px 12px`
- **User messages:** right-aligned, `bg-brand-beige`, dark text, rounded `12px 0 12px 12px`
- **Quick-topic chips:** outlined, navy border and text, pill shape, wrap freely
- **Page-link buttons:** filled navy, small, appear below bot message when `link` is present
- **Input row:** text input + send icon button, border-top separator

---

## Fallback Message

When no keyword match is found:

> "I'm not sure about that one! Our team can help — reach out directly."

Always includes a link button: **"Go to Contact →"** (`/contact`)

---

## Error Handling

- No network calls — no error states needed
- Empty input on submit: ignored (button disabled when input is blank)
- Very long messages: input capped at `maxLength={200}`

---

## Out of Scope

- AI-generated answers
- Chat history persistence across sessions
- User authentication
- Analytics / message logging
- Multi-language support
