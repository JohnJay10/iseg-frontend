import { useState, useRef, useEffect } from 'react'

const MultiSelectDropdown = ({ options, selectedValues, onChange, label, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  const handleSelectAll = () => {
    if (selectedValues.length === options.length) {
      onChange([])
    } else {
      onChange(options.map(opt => opt.code))
    }
  }

  return (
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="multi-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selectedValues.length > 0
            ? `${selectedValues.length} selected`
            : placeholder || 'Select items'}
        </span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="multi-select-menu">
          <div className="multi-select-option">
            <input
              type="checkbox"
              id={`select-all-${label}`}
              checked={selectedValues.length === options.length && options.length > 0}
              onChange={handleSelectAll}
              className="multi-select-checkbox"
            />
            <label htmlFor={`select-all-${label}`} className="multi-select-label">
              Select All
            </label>
          </div>
          <div className="multi-select-divider"></div>
          {options.map((option) => (
            <div key={option.code} className="multi-select-option">
              <input
                type="checkbox"
                id={`option-${option.code}`}
                checked={selectedValues.includes(option.code)}
                onChange={() => handleToggle(option.code)}
                className="multi-select-checkbox"
              />
              <label htmlFor={`option-${option.code}`} className="multi-select-label">
                {option.code} - {option.title}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelectDropdown
