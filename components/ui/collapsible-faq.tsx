"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CollapsibleFAQProps {
  question: string
  answer: string
}

export function CollapsibleFAQ({ question, answer }: CollapsibleFAQProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <Button
        variant="ghost"
        className="w-full justify-between p-0 h-auto text-left font-medium hover:bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
      </Button>
      {isOpen && <div className="mt-3 text-sm text-gray-600 animate-in slide-in-from-top-2 duration-200">{answer}</div>}
    </div>
  )
}
