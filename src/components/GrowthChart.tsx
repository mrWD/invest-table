import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { Projection } from '../lib/projection.ts'
import type { I18n } from '../i18n/index.ts'
import { useSettings } from '../store/settings.ts'

/**
 * The sheet's Sum-against-Period chart, with the two things it could not show.
 *
 * Two series, not one: the balance, and the money actually paid in to reach it. The gap
 * between them is the whole point of the model and on a single-line chart it is invisible.
 *
 * And a log toggle. Compounding at the rates this sheet was built for spends nine tenths
 * of the horizon indistinguishable from zero and then leaves the frame — the original
 * chart is a flat line with a cliff at the end, and every early year is unreadable. On a
 * log scale a constant growth rate is a straight line, so the early years become legible
 * and a change in rate becomes a change in slope. Linear stays the default, because that
 * is the shape the sheet showed and the one that tells the truth about the magnitudes.
 *
 * The plot stays left-to-right in every language, Arabic included. Time reading forwards
 * to the right is the convention in RTL scripts too, and mirroring it would make the
 * curve say the opposite of what it means; `.chart-frame` pins the direction in CSS so
 * the axis and the tooltip agree.
 */

const PADDING = { top: 16, right: 14, bottom: 26 }
const HEIGHT = 260

/** Measured rather than assumed, so the axis type renders at its true size at any width. */
function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}

/** Round a domain top up to something an axis can label: 1, 2, 2.5 or 5 × a power of ten. */
function niceCeiling(value: number): number {
  if (value <= 0) return 1
  const magnitude = 10 ** Math.floor(Math.log10(value))
  const normalised = value / magnitude
  const step =
    normalised <= 1 ? 1 : normalised <= 2 ? 2 : normalised <= 2.5 ? 2.5 : normalised <= 5 ? 5 : 10
  return step * magnitude
}

export function GrowthChart({
  projection,
  symbol,
  i18n,
}: {
  projection: Projection
  symbol: string
  i18n: I18n
}) {
  const { chartScale, set, deposit } = useSettings()
  const { t, fmt } = i18n
  const [frameRef, frameWidth] = useElementWidth<HTMLDivElement>()
  const [hover, setHover] = useState<number | null>(null)

  const { months } = projection
  const paidIn = (index: number) => deposit * index

  // A log axis has nothing to say about zero, and a zero deposit makes every point zero.
  const logUsable = chartScale === 'log' && deposit > 0
  const top = niceCeiling(projection.finalBalance)
  const bottom = logUsable ? Math.max(deposit, 1) : 0

  const yTicks = logUsable ? logTicks(bottom, top) : Array.from({ length: 5 }, (_, i) => (top / 4) * i)
  const tickLabels = yTicks.map((value) => fmt.compact(value))

  /*
   * The gutter is sized from the labels rather than fixed, because compact notation is
   * not the same width in every language: English writes "25M" where Russian writes
   * "25 млн" and Japanese "2500万". A fixed 52px clipped two of the twenty.
   */
  const paddingLeft = Math.min(
    96,
    Math.max(40, Math.round(Math.max(...tickLabels.map((label) => label.length)) * 6.2) + 14),
  )

  const width = Math.max(280, frameWidth)
  const plotWidth = width - paddingLeft - PADDING.right
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom

  const x = (index: number) =>
    paddingLeft + (months.length === 1 ? plotWidth : ((index - 1) / (months.length - 1)) * plotWidth)

  const y = useCallback(
    (value: number) => {
      if (!logUsable) return PADDING.top + plotHeight * (1 - value / top)
      const clamped = Math.max(value, bottom)
      const span = Math.log10(top) - Math.log10(bottom)
      return PADDING.top + plotHeight * (1 - (Math.log10(clamped) - Math.log10(bottom)) / span)
    },
    [logUsable, plotHeight, top, bottom],
  )

  const line = (pick: (row: (typeof months)[number]) => number) =>
    months
      .map((row, i) => `${i === 0 ? 'M' : 'L'}${x(row.index).toFixed(1)} ${y(pick(row)).toFixed(1)}`)
      .join(' ')

  const balancePath = line((row) => row.balance)
  const paidInPath = line((row) => paidIn(row.index))
  const areaPath = `${balancePath} L${x(months.length).toFixed(1)} ${(HEIGHT - PADDING.bottom).toFixed(1)} L${x(1).toFixed(1)} ${(HEIGHT - PADDING.bottom).toFixed(1)} Z`

  // One label per year would crowd a phone; this thins them to whole years that fit, and
  // always keeps the last one — the end of the axis is the year people look for.
  const totalYears = projection.years.length
  const yearStep = Math.max(1, Math.ceil(totalYears / Math.max(2, Math.floor(plotWidth / 46))))
  const xTicks = projection.years
    .filter((block) => (totalYears - block.year) % yearStep === 0)
    .map((block) => ({ year: block.year, index: block.months[block.months.length - 1].index }))

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - bounds.left - paddingLeft) / plotWidth
    const index = Math.round(ratio * (months.length - 1)) + 1
    setHover(Math.min(months.length, Math.max(1, index)))
  }

  const hovered = hover === null ? null : months[hover - 1]

  return (
    <section className="card" aria-labelledby="chart-heading">
      <div className="card-head">
        <h2 id="chart-heading">{t('chart.title')}</h2>
        <div className="segmented" role="group" aria-label={t('chart.scale')}>
          {(['linear', 'log'] as const).map((scale) => (
            <button
              key={scale}
              type="button"
              aria-pressed={chartScale === scale}
              onClick={() => set('chartScale', scale)}
            >
              {scale === 'linear' ? t('chart.linear') : t('chart.log')}
            </button>
          ))}
        </div>
      </div>

      <div className="legend">
        <span className="legend-item">
          <span className="legend-key" style={{ background: 'var(--series-1)' }} />
          {t('chart.balance')}
        </span>
        <span className="legend-item">
          <span className="legend-key" style={{ background: 'var(--series-2)' }} />
          {t('chart.paidIn')}
        </span>
      </div>

      <div
        className="chart-frame"
        ref={frameRef}
        onPointerMove={track}
        onPointerDown={track}
        onPointerLeave={() => setHover(null)}
      >
        <svg
          width={width}
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          role="img"
          aria-label={t('chart.summary', {
            final: fmt.amount(projection.finalBalance, symbol),
            years: t('summary.after', { count: totalYears }),
            invested: fmt.amount(projection.totalInvested, symbol),
          })}
        >
          {yTicks.map((value, index) => (
            <g key={value}>
              <line
                x1={paddingLeft}
                x2={width - PADDING.right}
                y1={y(value)}
                y2={y(value)}
                stroke="var(--grid)"
                strokeWidth="1"
                shapeRendering="crispEdges"
              />
              <text
                x={paddingLeft - 8}
                y={y(value)}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize="10"
                fill="var(--muted)"
                fontVariant="tabular-nums"
              >
                {tickLabels[index]}
              </text>
            </g>
          ))}

          {/* Bare numbers, except the last tick, which carries the unit for all of them —
              a translated "years" on every one would collide at this width, and anchoring
              the final label to its end keeps it inside the plot. */}
          {xTicks.map((tick, index) => {
            const last = index === xTicks.length - 1
            return (
              <text
                key={tick.year}
                x={x(tick.index)}
                y={HEIGHT - 8}
                textAnchor={last ? 'end' : 'middle'}
                fontSize="10"
                fill="var(--muted)"
              >
                {last
                  ? `${fmt.whole(tick.year)} ${t('controls.yearsUnit')}`
                  : fmt.whole(tick.year)}
              </text>
            )
          })}

          <path d={areaPath} fill="var(--series-1)" fillOpacity="0.1" stroke="none" />
          <path
            d={paidInPath}
            fill="none"
            stroke="var(--series-2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={balancePath}
            fill="none"
            stroke="var(--series-1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* The end of each line, ringed in the surface colour so they stay legible
              where they converge at the left. */}
          {(
            [
              [projection.finalBalance, 'var(--series-1)'],
              [paidIn(months.length), 'var(--series-2)'],
            ] as const
          ).map(([value, colour]) => (
            <circle
              key={colour}
              cx={x(months.length)}
              cy={y(value)}
              r="4"
              fill={colour}
              stroke="var(--surface)"
              strokeWidth="2"
            />
          ))}

          {hovered ? (
            <g>
              <line
                x1={x(hovered.index)}
                x2={x(hovered.index)}
                y1={PADDING.top}
                y2={HEIGHT - PADDING.bottom}
                stroke="var(--axis)"
                strokeWidth="1"
              />
              {(
                [
                  [hovered.balance, 'var(--series-1)'],
                  [paidIn(hovered.index), 'var(--series-2)'],
                ] as const
              ).map(([value, colour]) => (
                <circle
                  key={colour}
                  cx={x(hovered.index)}
                  cy={y(value)}
                  r="4"
                  fill={colour}
                  stroke="var(--surface)"
                  strokeWidth="2"
                />
              ))}
            </g>
          ) : null}

          <line
            x1={paddingLeft}
            x2={width - PADDING.right}
            y1={HEIGHT - PADDING.bottom}
            y2={HEIGHT - PADDING.bottom}
            stroke="var(--axis)"
            strokeWidth="1"
            shapeRendering="crispEdges"
          />
        </svg>

        {hovered ? (
          <div
            className="chart-tooltip"
            style={{
              left: Math.min(Math.max(x(hovered.index), 74), width - 74),
              transform: 'translateX(-50%)',
            }}
          >
            <div className="when">
              {t('chart.point', {
                year: fmt.whole(hovered.year),
                month: fmt.whole(hovered.monthOfYear),
              })}
            </div>
            <div className="row">
              <span className="dot" style={{ background: 'var(--series-1)' }} />
              {fmt.amount(hovered.balance, symbol)}
            </div>
            <div className="row">
              <span className="dot" style={{ background: 'var(--series-2)' }} />
              {fmt.amount(paidIn(hovered.index), symbol)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

/**
 * Whole powers of ten inside the domain — the only values a log axis can label honestly.
 *
 * Stepped when there are too many: a thirty-year run at the maximum rate spans sixty-odd
 * decades, and a gridline for each is a grey wash rather than an axis. The step keeps
 * every label a round power, just every second or third one.
 */
function logTicks(bottom: number, top: number, maxTicks = 6): number[] {
  const first = Math.ceil(Math.log10(bottom))
  const last = Math.floor(Math.log10(top))
  if (last <= first) return [bottom, top]

  const step = Math.max(1, Math.ceil((last - first + 1) / maxTicks))
  const ticks: number[] = []
  // Anchored at the top so the last decade is always labelled, whatever the step.
  for (let power = last; power >= first; power -= step) ticks.push(10 ** power)
  return ticks.reverse()
}
