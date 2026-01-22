import { useEffect, useMemo } from 'react'
import type { ChangeEvent } from 'react'
import styles from './ReleaseDateInput.module.css'

type ReleaseDateInputProps = {
  value: string
  onChange: (value: string) => void
}

const MONTH_OPTIONS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
]

const sanitizeYear = (value: string) => value.replace(/\D/g, '').slice(0, 4)

const normalizeMonthDay = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 2)
  if (digits.length === 1) return `0${digits}`
  return digits
}

const sanitizeMonth = (value: string) => {
  const digits = normalizeMonthDay(value)
  const monthNumber = Number(digits)

  if (!digits || Number.isNaN(monthNumber)) return ''
  if (monthNumber < 1 || monthNumber > 12) return ''

  return digits
}

const sanitizeDay = (value: string) => {
  const digits = normalizeMonthDay(value)
  const dayNumber = Number(digits)

  if (!digits || Number.isNaN(dayNumber)) return ''
  if (dayNumber < 1 || dayNumber > 31) return ''

  return digits
}

const parseIsoPartial = (value: string) => {
  if (!value) {
    return { year: '', month: '', day: '' }
  }

  const [rawYear, rawMonth, rawDay] = value.split('-')

  return {
    year: sanitizeYear(rawYear ?? ''),
    month: sanitizeMonth(rawMonth ?? ''),
    day: sanitizeDay(rawDay ?? ''),
  }
}

const formatIsoPartial = (year: string, month: string, day: string) => {
  if (!year) return ''
  if (!month) return year
  if (!day) return `${year}-${month}`
  return `${year}-${month}-${day}`
}

const getDaysInMonth = (year: string, month: string) => {
  const yearNumber = Number(year)
  const monthNumber = Number(month)

  if (!year || !month || Number.isNaN(yearNumber) || Number.isNaN(monthNumber)) {
    return 31
  }

  if (monthNumber < 1 || monthNumber > 12) return 31

  return new Date(yearNumber, monthNumber, 0).getDate()
}

export function ReleaseDateInput({ value, onChange }: ReleaseDateInputProps) {
  const { year, month, day } = useMemo(() => parseIsoPartial(value), [value])

  const maxDays = useMemo(() => getDaysInMonth(year, month), [year, month])

  useEffect(() => {
    if (!year && (month || day)) {
      onChange('')
      return
    }

    if (year && !month && day) {
      onChange(formatIsoPartial(year, '', ''))
      return
    }

    if (day) {
      const dayNumber = Number(day)
      if (!Number.isNaN(dayNumber) && dayNumber > maxDays) {
        onChange(formatIsoPartial(year, month, ''))
      }
    }
  }, [year, month, day, maxDays, onChange])

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextYear = sanitizeYear(event.target.value)

    if (!nextYear) {
      onChange('')
      return
    }

    const nextMaxDays = getDaysInMonth(nextYear, month)
    const nextDay = day && Number(day) > nextMaxDays ? '' : day
    onChange(formatIsoPartial(nextYear, month, month ? nextDay : ''))
  }

  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextMonth = sanitizeMonth(event.target.value)

    if (!nextMonth) {
      onChange(formatIsoPartial(year, '', ''))
      return
    }

    const nextMaxDays = getDaysInMonth(year, nextMonth)
    const nextDay = day && Number(day) > nextMaxDays ? '' : day

    onChange(formatIsoPartial(year, nextMonth, nextDay))
  }

  const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextDay = sanitizeDay(event.target.value)
    onChange(formatIsoPartial(year, month, nextDay))
  }

  const dayOptions = useMemo(() => {
    return Array.from({ length: maxDays }, (_, index) => {
      const dayNumber = String(index + 1).padStart(2, '0')
      return { value: dayNumber, label: dayNumber }
    })
  }, [maxDays])

  return (
    <div className={styles.group}>
      <input
        className={styles.input}
        inputMode="numeric"
        placeholder="YYYY"
        value={year}
        onChange={handleYearChange}
        aria-label="Release year"
      />
      <select
        className={styles.select}
        value={month}
        onChange={handleMonthChange}
        disabled={!year}
        aria-label="Release month"
      >
        <option value=""> </option>
        {MONTH_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <select
        className={styles.select}
        value={day}
        onChange={handleDayChange}
        disabled={!year || !month}
        aria-label="Release day"
      >
        <option value=""> </option>
        {dayOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
