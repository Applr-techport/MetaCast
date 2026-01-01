'use client'

import { useState } from 'react'
import {
  Vote,
  MessageCircleQuestion,
  Gift,
  Megaphone,
  Plus,
  X,
  Send,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  Trash2,
  Play,
  Pause,
  Check,
} from 'lucide-react'

// Types
interface PollOption {
  id: string
  text: string
  votes: number
}

interface Poll {
  id: string
  question: string
  options: PollOption[]
  isActive: boolean
  totalVotes: number
  endTime?: string
}

interface QAQuestion {
  id: string
  question: string
  askedBy: string
  timestamp: string
  isAnswered: boolean
  isPinned: boolean
}

interface Giveaway {
  id: string
  title: string
  prize: string
  participants: number
  isActive: boolean
  winner?: string
}

interface Notice {
  id: string
  message: string
  sentAt: string
}

// Tab types
type TabType = 'poll' | 'qa' | 'giveaway' | 'notice'

interface EngagementPanelProps {
  onSendNotification?: (message: string) => void
}

export function EngagementPanel({ onSendNotification }: EngagementPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('poll')

  // Poll state
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: '1',
      question: 'What topic should we cover next?',
      options: [
        { id: '1', text: 'Product Reviews', votes: 45 },
        { id: '2', text: 'How-to Tutorials', votes: 32 },
        { id: '3', text: 'Q&A Session', votes: 28 },
      ],
      isActive: true,
      totalVotes: 105,
    },
  ])
  const [showPollForm, setShowPollForm] = useState(false)
  const [newPoll, setNewPoll] = useState({ question: '', options: ['', ''] })

  // Q&A state
  const [questions, setQuestions] = useState<QAQuestion[]>([
    { id: '1', question: 'When will the next product launch?', askedBy: 'John', timestamp: '14:32', isAnswered: false, isPinned: true },
    { id: '2', question: 'Can you show the product in different colors?', askedBy: 'Sarah', timestamp: '14:35', isAnswered: false, isPinned: false },
    { id: '3', question: 'What is the warranty period?', askedBy: 'Mike', timestamp: '14:38', isAnswered: true, isPinned: false },
  ])

  // Giveaway state
  const [giveaways, setGiveaways] = useState<Giveaway[]>([
    { id: '1', title: 'Stream Giveaway', prize: '$50 Gift Card', participants: 234, isActive: true },
  ])
  const [showGiveawayForm, setShowGiveawayForm] = useState(false)
  const [newGiveaway, setNewGiveaway] = useState({ title: '', prize: '' })

  // Notice state
  const [notices, setNotices] = useState<Notice[]>([
    { id: '1', message: 'Special 20% discount for viewers!', sentAt: '14:25' },
    { id: '2', message: 'Follow us for more updates!', sentAt: '14:10' },
  ])
  const [noticeInput, setNoticeInput] = useState('')

  const tabs = [
    { id: 'poll' as TabType, label: 'Poll', icon: Vote },
    { id: 'qa' as TabType, label: 'Q&A', icon: MessageCircleQuestion },
    { id: 'giveaway' as TabType, label: 'Giveaway', icon: Gift },
    { id: 'notice' as TabType, label: 'Notice', icon: Megaphone },
  ]

  // Poll handlers
  const handleCreatePoll = () => {
    if (newPoll.question && newPoll.options.every(opt => opt.trim())) {
      const poll: Poll = {
        id: String(Date.now()),
        question: newPoll.question,
        options: newPoll.options.map((opt, idx) => ({
          id: String(idx),
          text: opt,
          votes: 0,
        })),
        isActive: true,
        totalVotes: 0,
      }
      setPolls([poll, ...polls])
      setNewPoll({ question: '', options: ['', ''] })
      setShowPollForm(false)
    }
  }

  const togglePollActive = (pollId: string) => {
    setPolls(polls.map(p =>
      p.id === pollId ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const deletePoll = (pollId: string) => {
    setPolls(polls.filter(p => p.id !== pollId))
  }

  const addPollOption = () => {
    if (newPoll.options.length < 4) {
      setNewPoll({ ...newPoll, options: [...newPoll.options, ''] })
    }
  }

  // Q&A handlers
  const toggleQuestionAnswered = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isAnswered: !q.isAnswered } : q
    ))
  }

  const toggleQuestionPinned = (questionId: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId ? { ...q, isPinned: !q.isPinned } : q
    ))
  }

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId))
  }

  // Giveaway handlers
  const handleCreateGiveaway = () => {
    if (newGiveaway.title && newGiveaway.prize) {
      const giveaway: Giveaway = {
        id: String(Date.now()),
        title: newGiveaway.title,
        prize: newGiveaway.prize,
        participants: 0,
        isActive: true,
      }
      setGiveaways([giveaway, ...giveaways])
      setNewGiveaway({ title: '', prize: '' })
      setShowGiveawayForm(false)
    }
  }

  const pickWinner = (giveawayId: string) => {
    const winners = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
    const randomWinner = winners[Math.floor(Math.random() * winners.length)]
    setGiveaways(giveaways.map(g =>
      g.id === giveawayId ? { ...g, isActive: false, winner: randomWinner } : g
    ))
  }

  const deleteGiveaway = (giveawayId: string) => {
    setGiveaways(giveaways.filter(g => g.id !== giveawayId))
  }

  // Notice handlers
  const handleSendNotice = () => {
    if (noticeInput.trim()) {
      const notice: Notice = {
        id: String(Date.now()),
        message: noticeInput.trim(),
        sentAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      }
      setNotices([notice, ...notices])
      onSendNotification?.(noticeInput.trim())
      setNoticeInput('')
    }
  }

  return (
    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] flex flex-col h-full">
      {/* Tab Header */}
      <div className="flex border-b border-[var(--border-color)]">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-3 py-3 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? 'text-[var(--secondary)] border-b-2 border-[var(--secondary)] -mb-px'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Poll Tab */}
        {activeTab === 'poll' && (
          <div className="space-y-4">
            {!showPollForm ? (
              <button
                onClick={() => setShowPollForm(true)}
                className="w-full py-2 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Create New Poll
              </button>
            ) : (
              <div className="p-4 bg-[var(--background)] rounded-lg space-y-3">
                <input
                  type="text"
                  value={newPoll.question}
                  onChange={e => setNewPoll({ ...newPoll, question: e.target.value })}
                  placeholder="Poll question..."
                  className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
                {newPoll.options.map((opt, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...newPoll.options]
                        newOpts[idx] = e.target.value
                        setNewPoll({ ...newPoll, options: newOpts })
                      }}
                      placeholder={`Option ${idx + 1}`}
                      className="flex-1 px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                    />
                    {newPoll.options.length > 2 && (
                      <button
                        onClick={() => {
                          const newOpts = newPoll.options.filter((_, i) => i !== idx)
                          setNewPoll({ ...newPoll, options: newOpts })
                        }}
                        className="p-2 text-[var(--muted)] hover:text-[var(--accent)]"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {newPoll.options.length < 4 && (
                  <button
                    onClick={addPollOption}
                    className="text-xs text-[var(--secondary)] hover:underline"
                  >
                    + Add Option
                  </button>
                )}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setShowPollForm(false)}
                    className="flex-1 py-2 border border-[var(--border-color)] rounded-lg text-sm hover:bg-[var(--background)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreatePoll}
                    className="flex-1 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0]"
                  >
                    Create Poll
                  </button>
                </div>
              </div>
            )}

            {polls.map(poll => (
              <div key={poll.id} className="p-4 bg-[var(--background)] rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{poll.question}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">
                      {poll.totalVotes} votes
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePollActive(poll.id)}
                      className={`p-1.5 rounded ${poll.isActive ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}
                    >
                      {poll.isActive ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                      onClick={() => deletePoll(poll.id)}
                      className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {poll.options.map(option => {
                    const percentage = poll.totalVotes > 0
                      ? Math.round((option.votes / poll.totalVotes) * 100)
                      : 0
                    return (
                      <div key={option.id} className="relative">
                        <div
                          className="absolute inset-0 bg-[var(--secondary)]/10 rounded"
                          style={{ width: `${percentage}%` }}
                        />
                        <div className="relative flex items-center justify-between px-3 py-2 text-sm">
                          <span>{option.text}</span>
                          <span className="text-xs text-[var(--muted)]">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {poll.isActive && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-[var(--success)]">
                    <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse" />
                    Live
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Q&A Tab */}
        {activeTab === 'qa' && (
          <div className="space-y-3">
            {questions.length === 0 ? (
              <div className="text-center py-8 text-[var(--muted)]">
                <MessageCircleQuestion size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No questions yet</p>
                <p className="text-xs">Questions from viewers will appear here</p>
              </div>
            ) : (
              <>
                {/* Pinned questions first */}
                {questions.filter(q => q.isPinned).map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onToggleAnswered={() => toggleQuestionAnswered(question.id)}
                    onTogglePinned={() => toggleQuestionPinned(question.id)}
                    onDelete={() => deleteQuestion(question.id)}
                  />
                ))}
                {/* Then unpinned */}
                {questions.filter(q => !q.isPinned).map(question => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    onToggleAnswered={() => toggleQuestionAnswered(question.id)}
                    onTogglePinned={() => toggleQuestionPinned(question.id)}
                    onDelete={() => deleteQuestion(question.id)}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {/* Giveaway Tab */}
        {activeTab === 'giveaway' && (
          <div className="space-y-4">
            {!showGiveawayForm ? (
              <button
                onClick={() => setShowGiveawayForm(true)}
                className="w-full py-2 border border-dashed border-[var(--border-color)] rounded-lg text-sm text-[var(--muted)] hover:border-[var(--secondary)] hover:text-[var(--secondary)] transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Create Giveaway
              </button>
            ) : (
              <div className="p-4 bg-[var(--background)] rounded-lg space-y-3">
                <input
                  type="text"
                  value={newGiveaway.title}
                  onChange={e => setNewGiveaway({ ...newGiveaway, title: e.target.value })}
                  placeholder="Giveaway title..."
                  className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
                <input
                  type="text"
                  value={newGiveaway.prize}
                  onChange={e => setNewGiveaway({ ...newGiveaway, prize: e.target.value })}
                  placeholder="Prize description..."
                  className="w-full px-3 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowGiveawayForm(false)}
                    className="flex-1 py-2 border border-[var(--border-color)] rounded-lg text-sm hover:bg-[var(--background)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateGiveaway}
                    className="flex-1 py-2 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0]"
                  >
                    Start Giveaway
                  </button>
                </div>
              </div>
            )}

            {giveaways.map(giveaway => (
              <div key={giveaway.id} className="p-4 bg-[var(--background)] rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium">{giveaway.title}</p>
                    <p className="text-xs text-[var(--muted)]">{giveaway.prize}</p>
                  </div>
                  <button
                    onClick={() => deleteGiveaway(giveaway.id)}
                    className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm mb-3">
                  <Users size={14} className="text-[var(--muted)]" />
                  <span>{giveaway.participants} participants</span>
                </div>

                {giveaway.winner ? (
                  <div className="p-3 bg-[var(--success)]/10 rounded-lg text-center">
                    <p className="text-xs text-[var(--muted)]">Winner</p>
                    <p className="font-medium text-[var(--success)]">{giveaway.winner}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => pickWinner(giveaway.id)}
                    className="w-full py-2 bg-[var(--secondary)] text-white rounded-lg text-sm hover:bg-[#7c4fe0] flex items-center justify-center gap-2"
                  >
                    <Gift size={14} />
                    Pick Winner
                  </button>
                )}

                {giveaway.isActive && !giveaway.winner && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-[var(--success)]">
                    <div className="w-1.5 h-1.5 bg-[var(--success)] rounded-full animate-pulse" />
                    Active
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Notice Tab */}
        {activeTab === 'notice' && (
          <div className="space-y-4">
            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={noticeInput}
                onChange={e => setNoticeInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendNotice()}
                placeholder="Type a notice to send..."
                className="flex-1 px-3 py-2 bg-[var(--background)] border border-[var(--border-color)] rounded-lg text-sm focus:outline-none focus:border-[var(--secondary)]"
              />
              <button
                onClick={handleSendNotice}
                className="p-2 bg-[var(--secondary)] text-white rounded-lg hover:bg-[#7c4fe0]"
              >
                <Send size={16} />
              </button>
            </div>

            {/* History */}
            <div>
              <p className="text-xs font-medium text-[var(--muted)] mb-2">Recent Notices</p>
              <div className="space-y-2">
                {notices.map(notice => (
                  <div key={notice.id} className="p-3 bg-[var(--background)] rounded-lg">
                    <p className="text-sm">{notice.message}</p>
                    <p className="text-xs text-[var(--muted)] mt-1">{notice.sentAt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Q&A Question Card Component
function QuestionCard({
  question,
  onToggleAnswered,
  onTogglePinned,
  onDelete,
}: {
  question: QAQuestion
  onToggleAnswered: () => void
  onTogglePinned: () => void
  onDelete: () => void
}) {
  return (
    <div className={`p-3 rounded-lg ${
      question.isPinned ? 'bg-[var(--secondary)]/10 border border-[var(--secondary)]/20' : 'bg-[var(--background)]'
    }`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className={`text-sm ${question.isAnswered ? 'text-[var(--muted)] line-through' : ''}`}>
            {question.question}
          </p>
          <div className="flex items-center gap-2 mt-1 text-xs text-[var(--muted)]">
            <span>{question.askedBy}</span>
            <span>•</span>
            <span>{question.timestamp}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleAnswered}
            className={`p-1.5 rounded ${question.isAnswered ? 'text-[var(--success)]' : 'text-[var(--muted)]'}`}
            title={question.isAnswered ? 'Mark as unanswered' : 'Mark as answered'}
          >
            <Check size={14} />
          </button>
          <button
            onClick={onTogglePinned}
            className={`p-1.5 rounded ${question.isPinned ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'}`}
            title={question.isPinned ? 'Unpin' : 'Pin to top'}
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-[var(--muted)] hover:text-[var(--accent)]"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
