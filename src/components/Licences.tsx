import { useState } from 'react'

/**
 * The open-source notices, opened in place.
 *
 * Not a link to licenses.txt: inside the iOS shell, navigating the WebView to a plain text
 * file leaves the app with no way back. So the file is fetched on first open and shown
 * here. It is emitted by the build (see vite.config.ts), so `npm run dev` has none and the
 * section simply stays empty there.
 */
export function Licences({ label }: { label: string }) {
  const [text, setText] = useState<string | null>(null)

  return (
    <details
      className="licences"
      onToggle={(event) => {
        if (!event.currentTarget.open || text !== null) return
        fetch(`${import.meta.env.BASE_URL}licenses.txt`)
          .then((response) => (response.ok ? response.text() : ''))
          .then(setText, () => setText(''))
      }}
    >
      <summary>{label}</summary>
      {text ? <pre>{text}</pre> : null}
    </details>
  )
}
