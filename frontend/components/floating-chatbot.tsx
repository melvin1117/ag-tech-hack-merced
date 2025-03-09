"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User, Loader2, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

// Letta agent key
const LETTA_AGENT_KEY = "agent-e8372f55-0efd-4b34-8ff3-74969bac22a9"

interface FloatingChatbotProps {
  onClose: () => void
}

export function FloatingChatbot({ onClose }: FloatingChatbotProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Try to load messages from localStorage
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages")
      if (savedMessages) {
        try {
          // Parse the saved messages and convert string timestamps back to Date objects
          return JSON.parse(savedMessages).map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }))
        } catch (e) {
          console.error("Failed to parse saved messages", e)
        }
      }
    }

    // Default initial message
    return [
      {
        id: "1",
        content: "Hello! I'm AgroVision AI. How can I help you today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ]
  })

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Attempt to call Letta API
      const response = await fetchLettaResponse(input)

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error fetching response from Letta:", error)

      // Use fallback response if API call fails
      const fallbackResponse =
        "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again in a moment."
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: fallbackResponse,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Function to fetch response from Letta API
  const fetchLettaResponse = async (userInput: string): Promise<string> => {
    // For hackathon purposes, we're simulating the API call
    // In a real implementation, you would make an actual API call to Letta

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Simulate API response based on input keywords
    if (userInput.toLowerCase().includes("moisture") || userInput.toLowerCase().includes("water")) {
      return "Based on our sensor data, the soil moisture levels in North Field are currently at 18%, which is below the optimal range of 25-30%. I recommend scheduling irrigation within the next 24 hours to prevent crop stress."
    } else if (userInput.toLowerCase().includes("pest") || userInput.toLowerCase().includes("insect")) {
      return "Our drone imagery from yesterday detected potential pest activity in the East Field soybeans. The affected area is approximately 2 acres in the southeast corner. I recommend a ground inspection to identify the specific pest and determine appropriate treatment options."
    } else if (userInput.toLowerCase().includes("weather") || userInput.toLowerCase().includes("rain")) {
      return "The weather forecast for the next 5 days shows: Today - Sunny, 75°F; Tomorrow - Partly cloudy, 72°F with 70% chance of rain (0.5-0.8 inches expected); Day 3-5 - Clear skies with temperatures ranging from 68-78°F. I recommend postponing any scheduled fertilizer application until after the rain."
    } else if (userInput.toLowerCase().includes("crop") || userInput.toLowerCase().includes("health")) {
      return "Crop health analysis from today's drone scan: North Field (Corn): 92% health index, excellent condition; East Field (Soybeans): 68% health index, showing signs of stress in southeast section; South Field (Wheat): 85% health index, good condition. The stress in the soybean field correlates with the lower soil moisture readings in that area."
    } else if (userInput.toLowerCase().includes("yield") || userInput.toLowerCase().includes("harvest")) {
      return "Based on current growth patterns, soil conditions, and weather forecasts, I predict the following yields: North Field (Corn): 168 bushels/acre (+12% from last year); East Field (Soybeans): 42 bushels/acre (-3% from last year); South Field (Wheat): 58 bushels/acre (+8% from last year). The decrease in soybean yield is likely due to the recent pest issues."
    } else if (userInput.toLowerCase().includes("drone") || userInput.toLowerCase().includes("flight")) {
      return "Current drone status: Drone 1 is actively monitoring North Field (battery: 78%); Drone 2 is idle and ready for deployment (battery: 92%); Drone 3 is charging (battery: 23%); Drone 4 is undergoing maintenance due to a camera malfunction. The next scheduled flight is tomorrow at 10:00 AM for East Field inspection."
    } else {
      // Generic response for other queries
      return "I've analyzed your farm data and found that overall conditions are good. Crop health is at 85% across all fields, soil moisture averages 24%, and weather conditions for the coming week are favorable. Is there a specific aspect of your farm operations you'd like me to analyze in more detail?"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="fixed bottom-24 right-6 w-80 md:w-96 shadow-xl z-50 border-2">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <CardTitle className="text-base flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AgroVision Assistant
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80 px-4">
          <div className="flex flex-col gap-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`h-6 w-6 ${message.role === "assistant" ? "bg-green-100" : "bg-primary"}`}>
                    <AvatarFallback className="text-xs">
                      {message.role === "assistant" ? (
                        <Bot className="h-3 w-3 text-green-700" />
                      ) : (
                        <User className="h-3 w-3 text-primary-foreground" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm ${
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <Avatar className="h-6 w-6 bg-green-100">
                    <AvatarFallback className="text-xs">
                      <Bot className="h-3 w-3 text-green-700" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs">Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t">
        <div className="flex w-full items-center gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1 h-9 text-sm"
          />
          <Button size="icon" className="h-9 w-9" onClick={handleSend} disabled={isLoading || input.trim() === ""}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

