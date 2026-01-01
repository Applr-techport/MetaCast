'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Clock, Radio, MessageCircle, Users, Send, Ban, X, Plus, CircleUser, Folder, ChevronDown, Save } from 'lucide-react'

// 폴더 데이터
const assetFolders = [
  { id: 'product-reviews', name: 'Product Reviews', color: '#8b5cf6' },
  { id: 'tutorials', name: 'Tutorials', color: '#3b82f6' },
  { id: 'promotional', name: 'Promotional', color: '#10b981' },
  { id: 'archive', name: 'Archive', color: '#6b7280' },
]
import {
  LiveVideoPlayer,
  ProductPanel,
  StatsPanel,
  NotificationPanel,
  EngagementPanel,
} from '@/components/live'

// Dummy data
const dummyChatMessages = [
  { id: '1', username: 'John', message: 'Hello!', timestamp: '14:32', isHost: false },
  { id: '2', username: 'Host', message: 'Welcome! We have special deals today', timestamp: '14:32', isHost: true },
  { id: '3', username: 'Sarah', message: 'How much is it?', timestamp: '14:33', isHost: false },
  { id: '4', username: 'Mike', message: 'When will it be shipped?', timestamp: '14:33', isHost: false },
  { id: '5', username: 'Host', message: 'This product is only $39.90!', timestamp: '14:34', isHost: true },
  { id: '6', username: 'Emma', message: 'Wow thats so cheap', timestamp: '14:34', isHost: false },
]

const dummyViewers = [
  { id: '1', username: 'John', joinedAt: 'Joined 14:30' },
  { id: '2', username: 'Sarah', joinedAt: 'Joined 14:31' },
  { id: '3', username: 'Mike', joinedAt: 'Joined 14:32' },
  { id: '4', username: 'Emma', joinedAt: 'Joined 14:33' },
  { id: '5', username: 'David', joinedAt: 'Joined 14:34' },
  { id: '6', username: 'Lisa', joinedAt: 'Joined 14:35' },
]

const dummyBannedWords = ['spam', 'ads', 'scam', 'fake']

const dummyProducts = [
  { id: '1', name: 'Premium AirPods Case', price: 29900, isActive: true },
  { id: '2', name: 'Wireless Charging Pad (15W)', price: 39900, isActive: false },
  { id: '3', name: 'Silicone Watch Band', price: 19900, isActive: false },
]

const dummyAvailableProducts = [
  { id: '10', name: 'USB-C Fast Charger 65W', price: 49900 },
  { id: '11', name: 'Bluetooth Earbuds Pro', price: 89900 },
  { id: '12', name: 'Phone Stand Holder', price: 15900 },
  { id: '13', name: 'Screen Protector Glass', price: 12900 },
  { id: '14', name: 'Laptop Sleeve 15 inch', price: 34900 },
  { id: '15', name: 'Wireless Mouse', price: 29900 },
  { id: '16', name: 'Keyboard Mechanical RGB', price: 79900 },
  { id: '17', name: 'Webcam HD 1080p', price: 59900 },
]

const dummyStats = {
  currentViewers: 1247,
  peakViewers: 1892,
  totalViews: 15420,
  revenue: 2847000,
  viewerHistory: [450, 680, 890, 1100, 980, 1247, 1350, 1200, 1400, 1247],
  cartHistory: [10, 25, 45, 80, 120, 150, 180, 200, 230, 250],
  purchaseHistory: [5, 12, 25, 40, 55, 70, 85, 95, 110, 125],
}

const dummyBroadcastInfo = {
  startTime: '14:00',
  endTime: '16:00',
  broadcasterName: 'Sarah Kim',
  likes: 3842,
  totalViewers: 15420,
  broadcastType: 'commerce' as 'general' | 'commerce' | 'vod', // Can be 'general', 'commerce', or 'vod'
  cartCount: 250,
  productsSold: 125,
  totalSales: 4875000,
}

const dummyNotificationHistory = [
  { id: '1', message: '10% off for first-time buyers!', sentAt: '14:25' },
  { id: '2', message: 'Free shipping event now!', sentAt: '14:10' },
]

export default function LiveStudioPage() {
  const searchParams = useSearchParams()
  // Get broadcast type from URL params or use default from dummy data
  const broadcastTypeParam = searchParams.get('type') as 'general' | 'commerce' | 'vod' | null
  const broadcastType = broadcastTypeParam || dummyBroadcastInfo.broadcastType

  const [chatMessages, setChatMessages] = useState(dummyChatMessages)
  const [viewers] = useState(dummyViewers)
  const [bannedWords, setBannedWords] = useState(dummyBannedWords)
  const [products, setProducts] = useState(dummyProducts)
  const [notifications, setNotifications] = useState(dummyNotificationHistory)
  const [activeTab, setActiveTab] = useState<'chat' | 'viewers'>('chat')
  const [chatInput, setChatInput] = useState('')
  const [showBannedWords, setShowBannedWords] = useState(false)
  const [newBannedWord, setNewBannedWord] = useState('')
  const [showEndStreamModal, setShowEndStreamModal] = useState(false)
  const [saveRecording, setSaveRecording] = useState(true)
  const [saveToFolder, setSaveToFolder] = useState('')
  const [showFolderDropdown, setShowFolderDropdown] = useState(false)
  const [showNewFolderInput, setShowNewFolderInput] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  // Determine if we should show products panel (commerce or vod) or engagement panel (general)
  const showProductsPanel = broadcastType === 'commerce' || broadcastType === 'vod'
  const showEngagementPanel = broadcastType === 'general'

  // Chat handlers
  const handleSendMessage = () => {
    if (!chatInput.trim()) return
    const newMessage = {
      id: String(Date.now()),
      username: 'Host',
      message: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      isHost: true,
    }
    setChatMessages([...chatMessages, newMessage])
    setChatInput('')
  }

  // Banned word handlers
  const handleAddBannedWord = () => {
    if (newBannedWord.trim() && !bannedWords.includes(newBannedWord.trim())) {
      setBannedWords([...bannedWords, newBannedWord.trim()])
      setNewBannedWord('')
    }
  }

  const handleRemoveBannedWord = (word: string) => {
    setBannedWords(bannedWords.filter((w) => w !== word))
  }

  // Product handlers
  const handleToggleProduct = (id: string) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p)))
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleAddExistingProduct = (product: { id: string; name: string; price: number }) => {
    setProducts([...products, { ...product, isActive: false }])
  }

  // Notification handler
  const handleSendNotification = (message: string) => {
    const newNotification = {
      id: String(Date.now()),
      message,
      sentAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    }
    setNotifications([newNotification, ...notifications])
  }

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-[var(--card-bg)] border-b border-[var(--border-color)] flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-[var(--secondary)]" />
            <span className="font-semibold text-[var(--foreground)]">Live Studio</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Clock size={14} />
            <span>Duration: 01:24:35</span>
          </div>
        </div>
        <button
          onClick={() => setShowEndStreamModal(true)}
          className="px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-white rounded-lg text-sm font-medium transition-opacity"
        >
          End Stream
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top section - 3 columns */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Column 1: Video only */}
          <div className="w-1/3 p-4">
            <div className="h-full flex items-center justify-center">
              <LiveVideoPlayer
                viewerCount={dummyStats.currentViewers}
                streamTitle={broadcastType === 'commerce' ? 'New Electronics Sale' : broadcastType === 'general' ? 'Live Q&A Session' : 'VOD Stream'}
                isLive={true}
                startTime={dummyBroadcastInfo.startTime}
                endTime={dummyBroadcastInfo.endTime}
                broadcasterName={dummyBroadcastInfo.broadcasterName}
                likes={dummyBroadcastInfo.likes}
                totalViewers={dummyBroadcastInfo.totalViewers}
                isCommerce={showProductsPanel}
                cartCount={showProductsPanel ? dummyBroadcastInfo.cartCount : 0}
                productsSold={showProductsPanel ? dummyBroadcastInfo.productsSold : 0}
                totalSales={showProductsPanel ? dummyBroadcastInfo.totalSales : 0}
              />
            </div>
          </div>

          {/* Column 2: Chat / Viewers tabs */}
          <div className="w-1/3 p-4 border-l border-[var(--border-color)] flex flex-col overflow-hidden">
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] flex-1 flex flex-col overflow-hidden">
              {/* Tab buttons */}
              <div className="flex border-b border-[var(--border-color)]">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'chat'
                      ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <MessageCircle size={16} />
                  <span>Live Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('viewers')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'viewers'
                      ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)]'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <Users size={16} />
                  <span>Viewers ({viewers.length})</span>
                </button>
              </div>

              {/* Tab content */}
              {activeTab === 'chat' ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Banned words toggle */}
                  <div className="px-4 py-2 border-b border-[var(--border-color)] flex justify-end">
                    <button
                      onClick={() => setShowBannedWords(!showBannedWords)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors ${
                        showBannedWords
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'text-[var(--muted)] hover:bg-[var(--background)]'
                      }`}
                    >
                      <Ban size={14} />
                      <span>Banned ({bannedWords.length})</span>
                    </button>
                  </div>

                  {/* Banned words panel */}
                  {showBannedWords && (
                    <div className="p-3 border-b border-[var(--border-color)] bg-[var(--background)]">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={newBannedWord}
                          onChange={(e) => setNewBannedWord(e.target.value)}
                          placeholder="Add banned word..."
                          className="flex-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-[var(--secondary)]"
                          onKeyDown={(e) => e.key === 'Enter' && handleAddBannedWord()}
                        />
                        <button
                          onClick={handleAddBannedWord}
                          className="p-1 bg-[var(--secondary)] text-white rounded transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {bannedWords.map((word) => (
                          <span
                            key={word}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-xs"
                          >
                            {word}
                            <button
                              onClick={() => handleRemoveBannedWord(word)}
                              className="hover:bg-[var(--accent)]/20 rounded-full"
                            >
                              <X size={10} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="flex items-start gap-2 text-sm">
                        <CircleUser size={16} className="text-[var(--secondary)] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className={`font-medium ${msg.isHost ? 'text-[var(--secondary)]' : 'text-[var(--foreground)]'}`}>
                            {msg.username}
                            {msg.isHost && (
                              <span className="ml-1 px-1.5 py-0.5 bg-[var(--secondary)] text-white text-[10px] rounded">
                                HOST
                              </span>
                            )}
                          </span>
                          <span className="text-[var(--muted)] ml-2">{msg.message}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat input */}
                  <div className="p-4 border-t border-[var(--border-color)]">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 bg-[var(--background)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2 bg-[var(--secondary)] hover:bg-[#7c4fe0] text-white rounded-lg transition-colors"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {viewers.map((viewer) => (
                    <div
                      key={viewer.id}
                      className="flex items-center justify-between py-2 px-2 hover:bg-[var(--background)] rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <CircleUser size={16} className="text-[var(--secondary)]" />
                        <span className="text-sm font-medium text-[var(--foreground)]">{viewer.username}</span>
                      </div>
                      <span className="text-xs text-[var(--muted)]">{viewer.joinedAt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Products/Engagement + Notifications */}
          <div className="w-1/3 p-4 border-l border-[var(--border-color)] flex flex-col gap-4 overflow-y-auto">
            <div className="flex-1 min-h-0">
              {showProductsPanel && (
                <ProductPanel
                  products={products}
                  availableProducts={dummyAvailableProducts}
                  onToggleActive={handleToggleProduct}
                  onDeleteProduct={handleDeleteProduct}
                  onAddExistingProduct={handleAddExistingProduct}
                />
              )}
              {showEngagementPanel && (
                <EngagementPanel onSendNotification={handleSendNotification} />
              )}
            </div>
            {showProductsPanel && (
              <NotificationPanel history={notifications} onSendNotification={handleSendNotification} />
            )}
          </div>
        </div>

        {/* Bottom section - Stats full width */}
        <div className="flex-shrink-0 border-t border-[var(--border-color)] p-4">
          <StatsPanel stats={dummyStats} />
        </div>
      </div>

      {/* End Stream Modal */}
      {showEndStreamModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setShowEndStreamModal(false)}
        >
          <div
            className="bg-[var(--card-bg)] rounded-2xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">End Stream</h2>
            <p className="text-sm text-[var(--muted)] mb-6">
              Are you sure you want to end this stream? Duration: 01:24:35
            </p>

            {/* Save Recording Option */}
            <div className="bg-[var(--background)] rounded-xl p-4 mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={saveRecording}
                  onChange={(e) => setSaveRecording(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
                <div>
                  <span className="text-sm font-medium">Save recording to Assets</span>
                  <p className="text-xs text-[var(--muted)]">Recording will be saved automatically</p>
                </div>
              </label>
            </div>

            {/* Folder Selection (only if saving) */}
            {saveRecording && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Save to Folder</label>
                <div className="relative">
                  <button
                    onClick={() => setShowFolderDropdown(!showFolderDropdown)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Folder size={16} style={{ color: assetFolders.find(f => f.id === saveToFolder)?.color || 'var(--muted)' }} />
                      <span>{assetFolders.find(f => f.id === saveToFolder)?.name || 'No folder (Root)'}</span>
                    </div>
                    <ChevronDown size={16} className="text-[var(--muted)]" />
                  </button>
                  {showFolderDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => { setShowFolderDropdown(false); setShowNewFolderInput(false); }} />
                      <div className="absolute left-0 right-0 top-full mt-1 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg shadow-xl z-50">
                        {/* New Folder Input */}
                        {showNewFolderInput ? (
                          <div className="p-2 border-b border-[var(--border-color)]">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Folder name..."
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && newFolderName.trim()) {
                                    console.log('Create folder:', newFolderName)
                                    setNewFolderName('')
                                    setShowNewFolderInput(false)
                                  }
                                }}
                                className="flex-1 px-2 py-1.5 bg-[var(--background)] border border-[var(--border-color)] rounded text-sm focus:outline-none focus:border-[var(--secondary)]"
                                autoFocus
                              />
                              <button
                                onClick={() => {
                                  if (newFolderName.trim()) {
                                    console.log('Create folder:', newFolderName)
                                    setNewFolderName('')
                                    setShowNewFolderInput(false)
                                  }
                                }}
                                className="px-3 py-1.5 bg-[var(--secondary)] text-white rounded text-sm hover:bg-[#7c4fe0]"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowNewFolderInput(true)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left text-[var(--secondary)] border-b border-[var(--border-color)]"
                          >
                            <Plus size={16} />
                            <span>New Folder</span>
                          </button>
                        )}
                        <button
                          onClick={() => { setSaveToFolder(''); setShowFolderDropdown(false); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                        >
                          <Folder size={16} className="text-[var(--muted)]" />
                          <span>No folder (Root)</span>
                        </button>
                        {assetFolders.map((folder) => (
                          <button
                            key={folder.id}
                            onClick={() => { setSaveToFolder(folder.id); setShowFolderDropdown(false); }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--background)] text-left"
                          >
                            <Folder size={16} style={{ color: folder.color }} />
                            <span>{folder.name}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndStreamModal(false)}
                className="flex-1 py-3 border border-[var(--border-color)] rounded-xl font-medium hover:bg-[var(--background)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('End stream, save:', saveRecording, 'folder:', saveToFolder)
                  setShowEndStreamModal(false)
                  // TODO: Navigate to summary page
                }}
                className="flex-1 py-3 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {saveRecording && <Save size={18} />}
                End & {saveRecording ? 'Save' : 'Exit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
