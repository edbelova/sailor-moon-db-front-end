import { useState, useRef, useEffect, useMemo, useId, type KeyboardEvent } from 'react'
import { PillInput } from '@/app/mobile/components/base/PillInput/PillInput'
import styles from '@/app/mobile/components/base/PillCombobox/PillCombobox.module.css'

type PillComboboxProps = {
  value: string
  onChange: (value: string) => void
  options?: string[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  onEnter?: () => void
}

export function PillCombobox({
  value,
  onChange,
  options = [],
  placeholder = '',
  size = 'md',
  onEnter,
}: PillComboboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()

  // Filter options based on current value
  const filteredOptions = useMemo(() => {
    if (!value) return options
    const lowerValue = value.toLowerCase()
    return options.filter(opt => opt.toLowerCase().includes(lowerValue))
  }, [options, value])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (opt: string) => {
    onChange(opt)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true)
        setHighlightedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0))
        break
      case 'Enter':
        if (highlightedIndex >= 0) {
          e.preventDefault() // Stop PillInput from calling onEnter itself
          const selectedOpt = filteredOptions[highlightedIndex]
          handleSelect(selectedOpt)
          onEnter?.() // Manually trigger apply after selection
        }
        // If highlightedIndex is -1, we do NOTHING here. 
        // PillInput will catch the Enter and call onEnter() automatically.
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Tab':
        setIsOpen(false)
        break
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <PillInput
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(true)
          setHighlightedIndex(-1)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        onClear={() => {
          onChange('')
          setIsOpen(false)
          setHighlightedIndex(-1)
        }}
        onEnter={onEnter}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-activedescendant={
          highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined
        }
      />

      {isOpen && filteredOptions.length > 0 && (
        <div 
          className={styles.popover} 
          id={listboxId} 
          role="listbox"
        >
          {filteredOptions.map((opt, index) => (
            <div
              key={opt}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={value === opt}
              className={`
                ${styles.option} 
                ${value === opt ? styles.optionSelected : ''}
                ${highlightedIndex === index ? styles.optionHighlighted : ''}
              `}
              onClick={() => handleSelect(opt)}
            >
              {opt}
              {value === opt && (
                <span className="material-symbols-outlined">check</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
