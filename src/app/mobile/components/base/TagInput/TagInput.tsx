import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Tag } from '@/app/mobile/components/base/Tag/Tag'
import styles from '@/app/mobile/components/base/TagInput/TagInput.module.css'

type TagInputProps = {
  value: string // Shared store uses strings
  onChange: (value: string) => void
  placeholder?: string
}

export function TagInput({ value, onChange, placeholder = 'Add...' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')
  const values = value ? value.split(',').map(v => v.trim()).filter(Boolean) : []

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    } else if (e.key === 'Backspace' && !inputValue && values.length > 0) {
      removeTag(values.length - 1)
    }
  }

  const addTag = () => {
    const trimmedValue = inputValue.trim()
    if (trimmedValue && !values.includes(trimmedValue)) {
      onChange([...values, trimmedValue].join(', '))
      setInputValue('')
    }
  }

  const removeTag = (index: number) => {
    const next = [...values]
    next.splice(index, 1)
    onChange(next.join(', '))
  }

  return (
    <div className={styles.container}>
      <div className={styles.tagsArea}>
        {values.map((val, idx) => (
          <Tag key={`${val}-${idx}`} className={styles.tag}>
            {val}
            <button 
              type="button" 
              className={styles.removeBtn} 
              onClick={() => removeTag(idx)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </Tag>
        ))}
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={values.length === 0 ? placeholder : ''}
        />
      </div>
    </div>
  )
}
