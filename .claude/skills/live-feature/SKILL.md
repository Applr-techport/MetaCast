---
name: live-feature
description: Live streaming feature development. Use when adding live stream, real-time chat, or WebRTC functionality.
---

# MetaCast Live Streaming Rules

## File Structure

```
src/
├── app/(dashboard)/live/
│   └── [id]/
│       └── page.tsx       # Live stream control page
├── components/live/
│   ├── LiveVideoPlayer.tsx
│   ├── LiveChat.tsx
│   ├── LiveStats.tsx
│   ├── LiveSettings.tsx
│   ├── ChatSection.tsx
│   ├── ViewerPanel.tsx
│   ├── ProductPanel.tsx
│   └── index.ts
└── lib/
    ├── webrtc/            # WebRTC utilities
    └── realtime/          # Supabase Realtime
```

## Live Page Layout

```tsx
export default function LiveStreamPage({ params }: { params: { id: string } }) {
  return (
    <div className="h-screen flex">
      {/* Main Content - Video + Controls */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-14 border-b border-[var(--border-color)] flex items-center justify-between px-4">
          <StreamInfo />
          <StreamControls />
        </div>

        {/* Video Area */}
        <div className="flex-1 bg-black relative">
          <LiveVideoPlayer streamId={params.id} />
          <StreamOverlay />
        </div>

        {/* Bottom Controls */}
        <div className="h-16 border-t border-[var(--border-color)] flex items-center justify-center gap-4">
          <MicButton />
          <CameraButton />
          <ScreenShareButton />
          <EndStreamButton />
        </div>
      </div>

      {/* Right Sidebar - Chat & Panels */}
      <div className="w-80 border-l border-[var(--border-color)] flex flex-col">
        <PanelTabs />
        <PanelContent />
      </div>
    </div>
  )
}
```

## Stream Status Management

```tsx
type StreamStatus = 'preparing' | 'live' | 'paused' | 'ended'

const [streamStatus, setStreamStatus] = useState<StreamStatus>('preparing')
const [viewerCount, setViewerCount] = useState(0)
const [duration, setDuration] = useState(0)

// Status indicator
<div className={`px-3 py-1 rounded-full text-sm ${
  streamStatus === 'live'
    ? 'bg-red-500/20 text-red-400'
    : 'bg-[var(--border-color)] text-[var(--muted)]'
}`}>
  {streamStatus === 'live' ? 'LIVE' : streamStatus.toUpperCase()}
</div>
```

## Real-time Chat with Supabase

```tsx
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

interface ChatMessage {
  id: string
  user_name: string
  message: string
  created_at: string
}

export function LiveChat({ streamId }: { streamId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to new messages
    const channel = supabase
      .channel(`chat:${streamId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `stream_id=eq.${streamId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as ChatMessage])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [streamId])

  const sendMessage = async (message: string) => {
    await supabase.from('chat_messages').insert({
      stream_id: streamId,
      message,
      user_id: (await supabase.auth.getUser()).data.user?.id
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-2">
            <span className="font-semibold text-[var(--secondary)]">
              {msg.user_name}
            </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--border-color)]">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  )
}
```

## Viewer Count with Presence

```tsx
useEffect(() => {
  const channel = supabase.channel(`viewers:${streamId}`)

  channel
    .on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState()
      setViewerCount(Object.keys(state).length)
    })
    .subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await channel.track({ user_id: userId })
      }
    })

  return () => {
    supabase.removeChannel(channel)
  }
}, [streamId])
```

## Stream Control Buttons

```tsx
// Microphone toggle
<button
  onClick={() => setIsMuted(!isMuted)}
  className={`p-3 rounded-full ${
    isMuted
      ? 'bg-red-500/20 text-red-400'
      : 'bg-[var(--card-bg)] text-white'
  }`}
>
  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
</button>

// Camera toggle
<button
  onClick={() => setIsCameraOff(!isCameraOff)}
  className={`p-3 rounded-full ${
    isCameraOff
      ? 'bg-red-500/20 text-red-400'
      : 'bg-[var(--card-bg)] text-white'
  }`}
>
  {isCameraOff ? <VideoOff size={20} /> : <Video size={20} />}
</button>

// End stream button
<button
  onClick={() => setShowEndModal(true)}
  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center gap-2"
>
  <Phone size={18} className="rotate-135" />
  <span>End Stream</span>
</button>
```

## End Stream Modal

```tsx
{showEndModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <div className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md p-6">
      <h2 className="text-xl font-bold mb-4">End Stream</h2>

      {/* Save recording option */}
      <label className="flex items-center gap-3 p-3 bg-[var(--background)] rounded-lg mb-4">
        <input
          type="checkbox"
          checked={saveRecording}
          onChange={(e) => setSaveRecording(e.target.checked)}
          className="w-5 h-5 rounded"
        />
        <span>Save recording to Assets</span>
      </label>

      {/* Folder selection if saving */}
      {saveRecording && (
        <FolderSelector
          value={saveToFolder}
          onChange={setSaveToFolder}
        />
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setShowEndModal(false)}
          className="flex-1 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={handleEndStream}
          className="flex-1 py-2 bg-red-500 text-white rounded-lg"
        >
          End Stream
        </button>
      </div>
    </div>
  </div>
)}
```

## Checklist

Before adding live feature:
- [ ] Handle connection states (connecting, connected, disconnected)
- [ ] Implement reconnection logic
- [ ] Clean up subscriptions on unmount
- [ ] Show loading/error states
- [ ] Test with multiple viewers
- [ ] No emojis in UI
- [ ] CSS variables only
