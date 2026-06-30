import { useState, useEffect, useCallback } from 'react'
import {
  DndContext, DragOverlay, PointerSensor, TouchSensor, KeyboardSensor,
  useSensor, useSensors, closestCorners, useDroppable,
} from '@dnd-kit/core'
import {
  SortableContext, verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, isSupabaseReady } from '../lib/supabase'
import Footer from '../components/Footer'

// ── Constants ────────────────────────────────────────────────────────────────
const COLUMNS = [
  { id: 'phase1', label: 'Phase 1 Core', color: 'var(--teal)' },
  { id: 'phase2', label: 'Phase 2 Growth', color: 'var(--violet)' },
  { id: 'backlog', label: 'Backlog / Ideas', color: 'var(--gold)' },
]

const CATEGORIES = ['RAG / Search', 'Simulation', 'Intelligence', 'Infrastructure', 'Analytics', 'General']

const CAT_COLORS = {
  'RAG / Search':    { accent: 'var(--teal)',   text: 'var(--teal)'   },
  'Simulation':      { accent: 'var(--violet)', text: 'var(--violet)' },
  'Intelligence':    { accent: 'var(--gold)',   text: 'var(--gold)'   },
  'Infrastructure':  { accent: 'var(--blue)',   text: 'var(--blue)'   },
  'Analytics':       { accent: 'var(--green)',  text: 'var(--green)'  },
  'General':         { accent: 'var(--ink-soft)',text: 'var(--ink-soft)'},
}

const PRIORITY_COLORS = {
  high:   { dot: 'var(--red)',   label: 'High' },
  medium: { dot: 'var(--gold)',  label: 'Med'  },
  low:    { dot: 'var(--rule)',  label: 'Low'  },
}

const SEED_FEATURES = [
  { id: 's1', title: 'RAG Pipeline', description: 'Hybrid dense + BM25 search with RRF reranking and cross-encoder reranker over Aster DM earnings corpus.', phase: 'phase1', category: 'RAG / Search', priority: 'high', position: 0 },
  { id: 's2', title: 'Earnings Q&A Predictor', description: 'Predict analyst questions for the upcoming quarter by mining historical Q&A patterns from past transcripts.', phase: 'phase1', category: 'Simulation', priority: 'high', position: 1 },
  { id: 's3', title: 'Historical Promise Tracker', description: 'Surface every guidance commitment management made in prior calls and flag which ones haven\'t delivered yet.', phase: 'phase1', category: 'Intelligence', priority: 'high', position: 2 },
  { id: 's4', title: 'Pre-call Intelligence Brief', description: 'Auto-generate sector + competitor briefing before each earnings cycle, matched to the call calendar.', phase: 'phase1', category: 'Intelligence', priority: 'high', position: 3 },
  { id: 's5', title: 'Citation Engine', description: 'Every LLM response attributed to exact source doc, quarter, and page. Non-negotiable for client trust.', phase: 'phase1', category: 'Infrastructure', priority: 'high', position: 4 },
  { id: 's6', title: 'Analyst Persona Simulation', description: 'Red-team mode — ingest 5 years of a specific sell-side analyst\'s questions and simulate their voice for preparation.', phase: 'phase2', category: 'Simulation', priority: 'high', position: 0 },
  { id: 's7', title: 'Script Drafting Assistant', description: 'Draft opening remarks and prepared sections from company\'s own historical transcripts + private data.', phase: 'phase2', category: 'General', priority: 'medium', position: 1 },
  { id: 's8', title: 'Peer Transcript Comparison', description: 'Side-by-side analysis of competitor earnings Q&A from the same quarter. What themes dominated?', phase: 'phase2', category: 'Analytics', priority: 'medium', position: 2 },
  { id: 's9', title: 'Sector Intelligence Synthesis', description: 'Quarterly sector movement briefing auto-generated for pharma/healthcare — regulatory shifts, KPI benchmarks, macro signals.', phase: 'phase2', category: 'Intelligence', priority: 'medium', position: 3 },
  { id: 's10', title: 'Real-time In-call Assist', description: 'Live data retrieval during the call for unexpected analyst questions. The CFO\'s bionic arm.', phase: 'backlog', category: 'Infrastructure', priority: 'low', position: 0 },
  { id: 's11', title: 'Multi-company Support', description: 'Expand the platform beyond Aster DM to all NSE/BSE listed companies with SEBI-specific context.', phase: 'backlog', category: 'Infrastructure', priority: 'medium', position: 1 },
  { id: 's12', title: 'Post-call Sentiment Analysis', description: 'Analyze sell-side analyst sentiment and investor reaction immediately after the call. Track how market perception evolved.', phase: 'backlog', category: 'Analytics', priority: 'low', position: 2 },
]

// ── Local storage fallback ────────────────────────────────────────────────────
const LS_KEY = 'vidura_brainstorm_v1'
function lsLoad() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || null } catch { return null }
}
function lsSave(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)) } catch {}
}

// ── Sortable Card ─────────────────────────────────────────────────────────────
function SortableCard({ feature, onEdit, onDelete, catFilter }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: feature.id,
    data: { phase: feature.phase },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: catFilter && catFilter !== 'all' && feature.category !== catFilter ? 0.3 : 1,
  }

  const colors = CAT_COLORS[feature.category] || CAT_COLORS.General
  const pColors = PRIORITY_COLORS[feature.priority] || PRIORITY_COLORS.medium

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      className={`bb-card${isDragging ? ' dragging' : ''}`}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      {...attributes}
      {...listeners}
    >
      <div className="bb-card-accent" style={{ background: colors.accent }} />
      <div className="bb-card-inner">
        <div className="bb-card-cat" style={{ color: colors.text }}>{feature.category}</div>
        <div className="bb-card-title">{feature.title}</div>
        {feature.description && (
          <div className="bb-card-desc">{feature.description}</div>
        )}
        <div className="bb-card-footer">
          <div className="bb-priority">
            <span className="bb-priority-dot" style={{ background: pColors.dot }} />
            {pColors.label}
          </div>
          <div className="bb-card-actions">
            <button
              className="bb-card-btn"
              onPointerDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); onEdit(feature) }}
              title="Edit"
            >✎</button>
            <button
              className="bb-card-btn del"
              onPointerDown={e => e.stopPropagation()}
              onClick={e => { e.stopPropagation(); onDelete(feature.id) }}
              title="Delete"
            >×</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Droppable Column ──────────────────────────────────────────────────────────
function BoardColumn({ col, features, onEdit, onDelete, onAddCard, catFilter }) {
  const { setNodeRef, isOver } = useDroppable({ id: col.id, data: { phase: col.id } })

  return (
    <div className={`bb-column${col.mobileVisible ? ' mobile-visible' : ''}`} style={{ borderTop: `3px solid ${col.color}`, background: isOver ? 'var(--paper)' : undefined }}>
      <div className="bb-col-header">
        <span className="bb-col-title" style={{ color: col.color }}>{col.label}</span>
        <span className="bb-col-count">{features.length}</span>
      </div>
      <div ref={setNodeRef} className="bb-col-body">
        <SortableContext items={features.map(f => f.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {features.map(f => (
              <SortableCard
                key={f.id}
                feature={f}
                onEdit={onEdit}
                onDelete={onDelete}
                catFilter={catFilter}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </div>
      <button className="bb-add-col-btn" onClick={() => onAddCard(col.id)}>
        + Add feature
      </button>
    </div>
  )
}

// ── Feature Modal ─────────────────────────────────────────────────────────────
function FeatureModal({ initial, onSave, onClose, onDelete }) {
  const isEdit = Boolean(initial?.id && !initial.id.startsWith('new-'))
  const [form, setForm] = useState({
    title: initial?.title || '',
    description: initial?.description || '',
    phase: initial?.phase || 'phase1',
    category: initial?.category || 'General',
    priority: initial?.priority || 'medium',
  })

  function set(k, v) { setForm(p => ({ ...p, [k]: v })) }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        className="modal"
        initial={{ scale: 0.95, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 16 }}
        transition={{ duration: 0.2 }}
      >
        <div className="modal-title">{isEdit ? 'Edit feature' : 'Add feature'}</div>

        <div className="form-group">
          <label className="form-label">Feature title *</label>
          <input
            className="form-input"
            value={form.title}
            onChange={e => set('title', e.target.value)}
            placeholder="e.g. Analyst Q&A Predictor"
            autoFocus
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="What does this feature do? Who does it serve?"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Phase</label>
            <select className="form-select" value={form.phase} onChange={e => set('phase', e.target.value)}>
              <option value="phase1">Phase 1 Core</option>
              <option value="phase2">Phase 2 Growth</option>
              <option value="backlog">Backlog</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Priority</label>
            <select className="form-select" value={form.priority} onChange={e => set('priority', e.target.value)}>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-select" value={form.category} onChange={e => set('category', e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="modal-actions">
          {isEdit && (
            <button className="btn-danger" onClick={() => { onDelete(initial.id); onClose() }}>
              Delete
            </button>
          )}
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            disabled={!form.title.trim()}
            onClick={() => { if (form.title.trim()) { onSave({ ...initial, ...form }); onClose() } }}
          >
            {isEdit ? 'Save changes' : 'Add feature'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BrainstormBoard() {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState('saved')
  const [modal, setModal] = useState(null) // null | feature object (with phase preset if new)
  const [activeId, setActiveId] = useState(null)
  const [activeCol, setActiveCol] = useState('phase1') // mobile tab
  const [catFilter, setCatFilter] = useState('all')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor),
  )

  // ── Load ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      if (isSupabaseReady) {
        const { data, error } = await supabase
          .from('brainstorm_features')
          .select('*')
          .order('position')
        if (!error && data?.length) {
          setFeatures(data)
          setLoading(false)
          return
        }
        // empty table → seed
        if (!error && data?.length === 0) {
          await seedSupabase()
          return
        }
      }
      // localStorage fallback
      const saved = lsLoad()
      setFeatures(saved || SEED_FEATURES)
      setLoading(false)
    }
    load()
  }, [])

  async function seedSupabase() {
    const rows = SEED_FEATURES.map(({ id: _id, ...rest }) => rest)
    const { data, error } = await supabase.from('brainstorm_features').insert(rows).select()
    if (!error && data) setFeatures(data)
    setLoading(false)
  }

  // ── Persist helpers ───────────────────────────────────────────────────────────
  function markSaving() { setSaveStatus('saving') }
  function markSaved()  { setSaveStatus('saved')  }
  function markError()  { setSaveStatus('error')  }

  async function persistUpdate(id, patch) {
    markSaving()
    if (isSupabaseReady) {
      const { error } = await supabase.from('brainstorm_features').update(patch).eq('id', id)
      if (error) { markError(); return }
    } else {
      setFeatures(prev => {
        const next = prev.map(f => f.id === id ? { ...f, ...patch } : f)
        lsSave(next)
        return next
      })
    }
    markSaved()
  }

  async function persistInsert(feature) {
    markSaving()
    if (isSupabaseReady) {
      const { id: _id, ...row } = feature
      const { data, error } = await supabase.from('brainstorm_features').insert(row).select().single()
      if (error) { markError(); return null }
      markSaved()
      return data
    }
    const newF = { ...feature, id: `local-${Date.now()}` }
    setFeatures(prev => { const n = [...prev, newF]; lsSave(n); return n })
    markSaved()
    return newF
  }

  async function persistDelete(id) {
    markSaving()
    if (isSupabaseReady) {
      const { error } = await supabase.from('brainstorm_features').delete().eq('id', id)
      if (error) { markError(); return }
    }
    setFeatures(prev => {
      const n = prev.filter(f => f.id !== id)
      if (!isSupabaseReady) lsSave(n)
      return n
    })
    markSaved()
  }

  // ── DnD handlers ─────────────────────────────────────────────────────────────
  function handleDragStart({ active }) { setActiveId(active.id) }

  async function handleDragEnd({ active, over }) {
    setActiveId(null)
    if (!over) return

    const activeFeature = features.find(f => f.id === active.id)
    if (!activeFeature) return

    const overFeature = features.find(f => f.id === over.id)
    const targetPhase = overFeature ? overFeature.phase : over.id

    if (activeFeature.phase !== targetPhase) {
      // Cross-column move
      const newFeatures = features.map(f =>
        f.id === active.id ? { ...f, phase: targetPhase } : f
      )
      setFeatures(newFeatures)
      if (!isSupabaseReady) lsSave(newFeatures)
      await persistUpdate(active.id, { phase: targetPhase })
    } else if (overFeature && active.id !== over.id) {
      // Same-column reorder
      const colItems = features.filter(f => f.phase === targetPhase)
      const oldIdx = colItems.findIndex(f => f.id === active.id)
      const newIdx = colItems.findIndex(f => f.id === over.id)
      const reordered = arrayMove(colItems, oldIdx, newIdx).map((f, i) => ({ ...f, position: i }))
      const newFeatures = [...features.filter(f => f.phase !== targetPhase), ...reordered]
      setFeatures(newFeatures)
      if (!isSupabaseReady) lsSave(newFeatures)
      if (isSupabaseReady) {
        markSaving()
        await Promise.all(reordered.map(f =>
          supabase.from('brainstorm_features').update({ position: f.position }).eq('id', f.id)
        ))
        markSaved()
      }
    }
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────────
  async function handleSave(formData) {
    const isEdit = Boolean(formData.id)
    if (isEdit) {
      setFeatures(prev => prev.map(f => f.id === formData.id ? formData : f))
      if (!isSupabaseReady) lsSave(features.map(f => f.id === formData.id ? formData : f))
      await persistUpdate(formData.id, {
        title: formData.title,
        description: formData.description,
        phase: formData.phase,
        category: formData.category,
        priority: formData.priority,
      })
    } else {
      const position = features.filter(f => f.phase === formData.phase).length
      const newF = await persistInsert({ ...formData, position })
      if (newF && isSupabaseReady) {
        setFeatures(prev => [...prev, newF])
        if (!isSupabaseReady) lsSave([...features, newF])
      }
    }
  }

  async function handleDelete(id) {
    await persistDelete(id)
  }

  // ── Derived data ──────────────────────────────────────────────────────────────
  const colFeatures = (colId) =>
    features
      .filter(f => f.phase === colId)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

  const activeFeature = activeId ? features.find(f => f.id === activeId) : null

  const stats = {
    total: features.length,
    phase1: features.filter(f => f.phase === 'phase1').length,
    phase2: features.filter(f => f.phase === 'phase2').length,
    backlog: features.filter(f => f.phase === 'backlog').length,
  }

  if (loading) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--ink-soft)', fontFamily: 'DM Mono', fontSize: '0.8rem' }}>
        Loading board…
      </div>
    )
  }

  return (
    <motion.div
      className="bb-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Hero */}
      <div className="bb-hero">
        <div className="bb-hero-top">
          <div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '0.6rem' }}>
              Vidura · Feature Planning
            </div>
            <h1 className="bb-title">Phase 1 <em>Brainstorm</em></h1>
            <p className="bb-subtitle">
              Drag cards between phases · Edit, add, and delete features · All changes persist
              {isSupabaseReady ? ' to Supabase' : ' in your browser'}.
            </p>
          </div>
          <button className="bb-add-btn" onClick={() => setModal({ phase: 'phase1' })}>
            + Add feature
          </button>
        </div>

        <div className="bb-stats">
          <div className="bb-stat">
            <span className="bb-stat-num">{stats.total}</span>
            <span className="bb-stat-label">Features<br />total</span>
          </div>
          <div style={{ width: '1px', background: 'var(--rule)', margin: '0.1rem 0' }} />
          <div className="bb-stat">
            <span className="bb-stat-num" style={{ color: 'var(--teal)' }}>{stats.phase1}</span>
            <span className="bb-stat-label">In<br />Phase 1</span>
          </div>
          <div className="bb-stat">
            <span className="bb-stat-num" style={{ color: 'var(--violet)' }}>{stats.phase2}</span>
            <span className="bb-stat-label">In<br />Phase 2</span>
          </div>
          <div className="bb-stat">
            <span className="bb-stat-num" style={{ color: 'var(--gold)' }}>{stats.backlog}</span>
            <span className="bb-stat-label">In<br />Backlog</span>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="bb-filters">
        <span className="bb-filter-label">Filter:</span>
        <button
          className={`bb-cat-btn${catFilter === 'all' ? ' active' : ''}`}
          style={catFilter === 'all' ? { background: 'var(--ink)', borderColor: 'var(--ink)', color: 'white' } : {}}
          onClick={() => setCatFilter('all')}
        >All</button>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`bb-cat-btn${catFilter === c ? ' active' : ''}`}
            style={catFilter === c ? { background: CAT_COLORS[c]?.accent, borderColor: CAT_COLORS[c]?.accent, color: 'white' } : {}}
            onClick={() => setCatFilter(catFilter === c ? 'all' : c)}
          >{c}</button>
        ))}
      </div>

      {/* Mobile column tabs */}
      <div className="bb-col-tabs">
        {COLUMNS.map(col => (
          <button
            key={col.id}
            className={`bb-col-tab${activeCol === col.id ? ' active' : ''}`}
            style={activeCol === col.id ? { color: col.color, borderBottomColor: col.color } : {}}
            onClick={() => setActiveCol(col.id)}
          >
            {col.label.split(' ')[0]} · {colFeatures(col.id).length}
          </button>
        ))}
      </div>

      {/* Board — 3-column desktop, tab-controlled on mobile */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="bb-board">
          {COLUMNS.map(col => (
            <BoardColumn
              key={col.id}
              col={{ ...col, mobileVisible: col.id === activeCol }}
              features={colFeatures(col.id)}
              onEdit={f => setModal(f)}
              onDelete={handleDelete}
              onAddCard={phase => setModal({ phase })}
              catFilter={catFilter}
            />
          ))}
        </div>

        <DragOverlay>
          {activeFeature && (
            <div className="bb-card" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transform: 'rotate(1deg)', cursor: 'grabbing' }}>
              <div className="bb-card-accent" style={{ background: CAT_COLORS[activeFeature.category]?.accent }} />
              <div className="bb-card-inner">
                <div className="bb-card-cat" style={{ color: CAT_COLORS[activeFeature.category]?.text }}>{activeFeature.category}</div>
                <div className="bb-card-title">{activeFeature.title}</div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Save indicator */}
      <div className="bb-save-indicator">
        <span className={`bb-save-dot ${saveStatus}`} />
        {saveStatus === 'saving' && 'Saving…'}
        {saveStatus === 'saved'  && (isSupabaseReady ? 'Saved to Supabase' : 'Saved locally')}
        {saveStatus === 'error'  && 'Save failed'}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== null && (
          <FeatureModal
            initial={modal}
            onSave={handleSave}
            onClose={() => setModal(null)}
            onDelete={handleDelete}
          />
        )}
      </AnimatePresence>

      <Footer note="Vidura · Phase 1 feature planning board · sarvagyasinghs.com" />
    </motion.div>
  )
}
