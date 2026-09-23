import { useState, type ReactNode } from 'react'

/**
 * A number with a slider under it.
 *
 * The typed value is held as a draft string for as long as the field has focus, because
 * a store that clamps on every keystroke fights the keyboard: clearing the field to
 * retype it would snap to the minimum under the cursor, and "0,5" is un-typeable if the
 * intermediate "0," is parsed and written back. The draft is released on blur, at which
 * point whatever the store made of the value is what shows.
 */

/** Positions along the track. Fine enough that a log slider never feels notched. */
const TRACK = 1000

/**
 * Round to two significant figures, so dragging lands on 140 or 1 400 rather than 137,42.
 * A slider is a coarse instrument; the field beside it is there for exact numbers.
 */
function roundNice(value: number): number {
  if (value <= 0) return 0
  const step = 10 ** Math.floor(Math.log10(value)) / 10
  return Math.round(value / step) * step
}

export function NumberField({
  id,
  label,
  hint,
  unit,
  value,
  min,
  max,
  step,
  scale = 'linear',
  sliderLabel,
  onChange,
}: {
  id: string
  label: string
  hint?: string
  /** A plain unit, or a control that lets the unit itself be chosen. */
  unit?: ReactNode
  value: number
  min: number
  max: number
  step: number
  /** Translated; the slider has no visible label of its own. */
  sliderLabel: string
  /**
   * A linear track from 0 to a million puts every realistic monthly payment inside the
   * first pixel. `log` spends the track evenly across the orders of magnitude instead,
   * so 50, 500 and 5 000 are each as easy to hit as the other.
   */
  scale?: 'linear' | 'log'
  onChange: (value: number) => void
}) {
  const [draft, setDraft] = useState<string | null>(null)

  // Zero has no logarithm, so the log track starts one notch above the low bound and
  // reserves position 0 for the bound itself.
  const floor = Math.max(min, 1)
  const span = Math.log(max / floor)

  const toPosition = (v: number) =>
    scale === 'linear' ? v : v <= floor ? 0 : Math.round((TRACK * Math.log(v / floor)) / span)

  const fromPosition = (position: number) =>
    scale === 'linear' ? position : position === 0 ? min : roundNice(floor * Math.exp((span * position) / TRACK))

  return (
    <div className="field">
      <div className="field-head">
        <label htmlFor={id}>{label}</label>
        {hint ? <span className="hint">{hint}</span> : null}
      </div>

      <div className="field-input">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={draft ?? String(value)}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            setDraft(event.target.value)
            onChange(Number.parseFloat(event.target.value))
          }}
          onFocus={(event) => event.target.select()}
          onBlur={() => setDraft(null)}
        />
        {unit ? <span className="unit">{unit}</span> : null}
      </div>

      <input
        type="range"
        aria-label={sliderLabel}
        aria-valuetext={String(value)}
        value={toPosition(value)}
        min={scale === 'linear' ? min : 0}
        max={scale === 'linear' ? max : TRACK}
        step={scale === 'linear' ? step : 1}
        onChange={(event) => {
          setDraft(null)
          onChange(fromPosition(Number.parseFloat(event.target.value)))
        }}
      />
    </div>
  )
}
