"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from "react"

export type SearchableSelectOption = {
  value: string
  label: string
  group?: string
  keywords?: string[]
}

type SearchableSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: SearchableSelectOption[]
  placeholder: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  dropdownClassName?: string
  selectedLabel?: string
}

type GroupedOptions = {
  group: string
  options: SearchableSelectOption[]
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = "Type to search...",
  emptyMessage = "No results found.",
  disabled = false,
  dropdownClassName = "w-full",
  selectedLabel,
}: SearchableSelectProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

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

    return options.filter((option) => {
      const searchableText = [
        option.label,
        option.group ?? "",
        ...(option.keywords ?? []),
      ]
        .join(" ")
        .toLowerCase()

      return searchableText.includes(normalizedQuery)
    })
  }, [options, query])

  const flatFilteredOptions = filteredOptions

  const groupedOptions = useMemo<GroupedOptions[]>(() => {
    const groups = new Map<string, SearchableSelectOption[]>()

    for (const option of filteredOptions) {
      const groupName = option.group ?? "Other"
      const existing = groups.get(groupName) ?? []
      existing.push(option)
      groups.set(groupName, existing)
    }

    return Array.from(groups.entries()).map(([group, groupOptions]) => ({
      group,
      options: groupOptions,
    }))
  }, [filteredOptions])

  useEffect(() => {
    if (!open) return

    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [open])

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
    setHighlightedIndex(0)
  }, [query, open])

  const handleTriggerClick = () => {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue)
    setOpen(false)
    setQuery("")
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      event.preventDefault()
      setOpen(true)
    }
  }

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, Math.max(flatFilteredOptions.length - 1, 0))
      )
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlightedIndex((prev) => Math.max(prev - 1, 0))
    }

    if (event.key === "Enter") {
      event.preventDefault()
      const option = flatFilteredOptions[highlightedIndex]
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

  let runningIndex = -1

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
        disabled={disabled}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedOption ? "text-foreground truncate" : "text-muted-foreground truncate"}>
          {selectedOption ? selectedLabel ?? selectedOption.label : placeholder}
        </span>
        <span className="ml-2 shrink-0 text-muted-foreground">▾</span>
      </button>

      {open && (
        <div
          className={`absolute z-50 mt-2 min-w-[280px] max-w-[420px] rounded-md border bg-popover text-popover-foreground shadow-md ${dropdownClassName}`}
        >
          <div className="border-b p-2">
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder={searchPlaceholder}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
            />
          </div>

          <div role="listbox" className="max-h-72 overflow-y-auto p-1">
            {flatFilteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              groupedOptions.map((group) => (
                <div key={group.group} className="py-1">
                  <div className="px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {group.group}
                  </div>

                  {group.options.map((option) => {
                    runningIndex += 1

                    const isSelected = option.value === value
                    const isHighlighted = runningIndex === highlightedIndex

                    return (
                      <button
                        key={`${option.value}-${option.label}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setHighlightedIndex(runningIndex)}
                        onMouseDown={(event: ReactMouseEvent<HTMLButtonElement>) => {
                          event.preventDefault()
                          handleSelect(option.value)
                        }}
                        className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-left text-sm ${
                          isHighlighted ? "bg-accent text-accent-foreground" : ""
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected ? <span>✓</span> : null}
                      </button>
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
