"use client"

import { useState } from "react"
import { Bot, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingChatbot } from "@/components/floating-chatbot"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </Button>

      {isOpen && <FloatingChatbot onClose={() => setIsOpen(false)} />}
    </>
  )
}

