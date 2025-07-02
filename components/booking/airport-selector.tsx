"use client"

import { useState, useMemo, useEffect } from "react"
import { Check, ChevronsUpDown, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { searchAirports } from "@/lib/api"

interface AirportSelectorProps {
  value?: string
  onSelect: (airport: string) => void
  placeholder?: string
}

export function AirportSelector({ value, onSelect, placeholder = "Select airport..." }: AirportSelectorProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [airports, setAirports] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch airports from backend on mount or when searchValue changes
    let active = true
    setLoading(true)
    searchAirports(searchValue ? { q: searchValue } : {})
      .then((data) => {
        if (active) setAirports(data.airports || data || [])
      })
      .catch(() => {
        if (active) setAirports([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [searchValue])

  const selectedAirport = airports.find((airport) => airport.code === value)

  const filteredAirports = useMemo(() => {
    if (!searchValue) return airports

    return airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        airport.code.toLowerCase().includes(searchValue.toLowerCase()) ||
        airport.airport.toLowerCase().includes(searchValue.toLowerCase()),
    )
  }, [searchValue, airports])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between h-10">
          <div className="flex items-center min-w-0">
            <Plane className="mr-2 h-4 w-4 text-gray-400 flex-shrink-0" />
            {selectedAirport ? (
              <div className="text-left min-w-0">
                <div className="font-medium truncate">
                  {selectedAirport.name} ({selectedAirport.code})
                </div>
              </div>
            ) : (
              <span className="text-gray-500 truncate">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search airports..."
            className="h-9"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={`${airport.name} ${airport.code} ${airport.airport}`}
                  onSelect={() => {
                    onSelect(airport.code)
                    setOpen(false)
                    setSearchValue("")
                  }}
                  className="cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", value === airport.code ? "opacity-100" : "opacity-0")} />
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium truncate">
                      {airport.name} ({airport.code})
                    </div>
                    <div className="text-xs text-gray-500 truncate">{airport.airport}</div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
