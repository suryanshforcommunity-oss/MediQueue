"use client"

import { useState, useEffect, Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockQueueData } from "@/lib/mock-data"
import { Search, RefreshCw, Bell, Clock, Users, CheckCircle2, AlertCircle } from "lucide-react"

type QueueStatus = "serving" | "next" | "waiting"

interface QueueItem {
  token: number
  status: QueueStatus
  name: string
}

function QueueStatusContent() {
  const [tokenInput, setTokenInput] = useState("")
  const [userToken, setUserToken] = useState<number | null>(12)
  const [currentServing, setCurrentServing] = useState(mockQueueData.currentToken)
  const [queue, setQueue] = useState<QueueItem[]>(mockQueueData.queue)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  const handleSearch = () => {
    const token = Number.parseInt(tokenInput)
    if (token && token > 0) {
      setUserToken(token)
    }
  }

  const getPositionInQueue = () => {
    if (!userToken) return null
    const position = userToken - currentServing
    return position > 0 ? position : 0
  }

  const getEstimatedWait = () => {
    const position = getPositionInQueue()
    if (position === null || position === 0) return "0 mins"
    return `~${position * 5} mins`
  }

  const getStatusColor = (status: QueueStatus) => {
    switch (status) {
      case "serving":
        return "bg-success text-success-foreground"
      case "next":
        return "bg-warning text-warning-foreground"
      case "waiting":
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: QueueStatus) => {
    switch (status) {
      case "serving":
        return "Now Serving"
      case "next":
        return "You're Next!"
      case "waiting":
        return "Waiting"
    }
  }

  const isUserNext = userToken && userToken === currentServing + 1
  const isUserServing = userToken && userToken === currentServing

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Live Queue Status</h1>
              <p className="text-muted-foreground">Track your position in real-time</p>
            </div>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter your token number"
                      value={tokenInput}
                      onChange={(e) => setTokenInput(e.target.value)}
                      type="number"
                      min={1}
                    />
                  </div>
                  <Button onClick={handleSearch} className="gap-2">
                    <Search className="h-4 w-4" />
                    Track
                  </Button>
                </div>
              </CardContent>
            </Card>

            {userToken && (
              <Card
                className={`mb-6 ${isUserNext ? "ring-2 ring-warning" : isUserServing ? "ring-2 ring-success" : ""}`}
              >
                <CardContent className="pt-6">
                  {isUserNext && (
                    <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-warning/10 border border-warning/20">
                      <Bell className="h-5 w-5 text-warning animate-pulse" />
                      <div>
                        <p className="font-medium text-warning">You're Next!</p>
                        <p className="text-sm text-muted-foreground">Please proceed to the waiting area</p>
                      </div>
                    </div>
                  )}

                  {isUserServing && (
                    <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-success/10 border border-success/20">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <div>
                        <p className="font-medium text-success">It's Your Turn!</p>
                        <p className="text-sm text-muted-foreground">Please enter the consultation room</p>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="text-center p-6 rounded-xl bg-success/5 border border-success/20">
                      <p className="text-sm text-muted-foreground mb-2">Now Serving</p>
                      <p className="text-5xl md:text-6xl font-bold text-success animate-pulse-slow">
                        {String(currentServing).padStart(2, "0")}
                      </p>
                    </div>

                    <div className="text-center p-6 rounded-xl bg-primary/5 border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-2">Your Token</p>
                      <p className="text-5xl md:text-6xl font-bold text-primary">
                        {String(userToken).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Queue Progress</span>
                      <span className="font-medium">{getPositionInQueue()} ahead of you</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-primary transition-all duration-500"
                        style={{
                          width: `${Math.max(10, 100 - ((getPositionInQueue() || 0) / mockQueueData.totalInQueue) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Users className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold">{getPositionInQueue()}</p>
                      <p className="text-xs text-muted-foreground">Ahead of you</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold">{getEstimatedWait()}</p>
                      <p className="text-xs text-muted-foreground">Est. Wait</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <p className="text-lg font-bold">{mockQueueData.totalInQueue}</p>
                      <p className="text-xs text-muted-foreground">Total in Queue</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Queue List</CardTitle>
                  <CardDescription>Last updated: {lastUpdated.toLocaleTimeString()}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="gap-2 bg-transparent"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {queue.map((item) => {
                    const isCurrentUser = item.token === userToken

                    return (
                      <div
                        key={item.token}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isCurrentUser
                            ? "bg-primary/10 border border-primary/20"
                            : item.status === "serving"
                              ? "bg-success/5"
                              : "bg-muted/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                              item.status === "serving"
                                ? "bg-success text-success-foreground"
                                : item.status === "next"
                                  ? "bg-warning text-warning-foreground"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {item.token}
                          </div>
                          <div>
                            <p className="font-medium">{isCurrentUser ? "You" : item.name}</p>
                            <p className="text-xs text-muted-foreground">Token #{item.token}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Stay Informed</p>
                    <p className="text-sm text-muted-foreground">
                      This page auto-refreshes every 30 seconds. We'll notify you when you're next in line. Please
                      ensure you're near the clinic 10 minutes before your expected turn.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function QueueStatusPage() {
  return (
    <Suspense fallback={null}>
      <QueueStatusContent />
    </Suspense>
  )
}
