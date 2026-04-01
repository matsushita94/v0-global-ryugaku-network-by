"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react"
import { Input } from "@/components/ui/input"

export type SearchableSelectOption = {
  value: string
  label: string
}

type SearchableSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: SearchableSelectOption[]
  placeholder: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = "Type to search...",
  emptyMessage = "No results found.",
  disabled = false,
}: SearchableSelectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? null
  }, [options, value])

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedQuery)
    )
  }, [options, query])

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false)
        setQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    setHighlightedIndex(0)

    const timer = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 0)

    return () => {
      window.clearTimeout(timer)
    }
  }, [open])

  const handleTriggerClick = () => {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue)
    setOpen(false)
    setQuery("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault()
      setOpen(true)
    }
  }

  const handleListKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, Math.max(filteredOptions.length - 1, 0))
      )
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    }

    if (event.key === "Enter") {
      event.preventDefault()
      const option = filteredOptions[highlightedIndex]
      if (option) {
        handleSelect(option.value)
      }
    }

    if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
      setQuery("")
    }
  }

  const handleOptionMouseEnter = (index: number) => {
    setHighlightedIndex(index)
  }

  const handleOptionMouseDown = (
    event: ReactMouseEvent<HTMLButtonElement>,
    optionValue: string
  ) => {
    event.preventDefault()
    handleSelect(optionValue)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
          {selectedOption?.label || placeholder}
        </span>
        <span className="ml-2 text-muted-foreground">▾</span>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="border-b p-2">
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleListKeyDown}
              placeholder={searchPlaceholder}
            />
          </div>

          <div
            role="listbox"
            className="max-h-64 overflow-y-auto p-1"
          >
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value
                const isHighlighted = index === highlightedIndex

                return (
                  <button
                    key={`${option.value}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => handleOptionMouseEnter(index)}
                    onMouseDown={(event) =>
                      handleOptionMouseDown(event, option.value)
                    }
                    className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm ${
                      isHighlighted ? "bg-accent text-accent-foreground" : ""
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected ? <span>✓</span> : null}
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
