"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Sparkles, CheckCircle2 } from "lucide-react"

// IP-related questions
const questions = [
  {
    text: "What does IP stand for in creative industries?",
    options: ["Internet Protocol", "Intellectual Property", "Interactive Platform"],
    correct: 1,
    fact: "Intellectual Property protects creative works like music, art, and designs.",
  },
  {
    text: "Which of these is protected by copyright?",
    options: ["Business ideas", "Song lyrics", "Dance moves (unchoreo)"],
    correct: 1,
    fact: "Copyright automatically protects original creative expressions like lyrics and books.",
  },
  {
    text: "What is a trademark used for?",
    options: ["Protecting brand names", "Protecting inventions", "Protecting secrets"],
    correct: 0,
    fact: "Trademarks protect brand names, logos, and other identifiers of goods/services.",
  },
  {
    text: "How long does copyright last in most countries?",
    options: ["20 years", "Life + 50-70 years", "Forever"],
    correct: 1,
    fact: "Copyright typically lasts for the creator's lifetime plus 50-70 years.",
  },
  {
    text: "What is licensing in IP?",
    options: ["Selling IP forever", "Granting permission to use IP", "Stealing IP"],
    correct: 1,
    fact: "Licensing allows others to use your IP under specific terms while you retain ownership.",
  },
  {
    text: "Which protects inventions and processes?",
    options: ["Patents", "Trademarks", "Copyrights"],
    correct: 0,
    fact: "Patents protect new inventions, processes, and technical innovations.",
  },
  {
    text: "What is derivative work?",
    options: ["Original creation", "Work based on existing IP", "Public domain work"],
    correct: 1,
    fact: "Derivative works are new creations based on existing copyrighted material.",
  },
  {
    text: "What does 'royalty-free' mean?",
    options: ["Free to use", "One-time fee, unlimited use", "No payment ever"],
    correct: 1,
    fact: "Royalty-free means you pay once to use the content without ongoing royalties.",
  },
]

interface Crystal {
  id: number
  x: number
  y: number
}

const creatorPassRewards = [
  { id: "music", title: "30min Music Studio Time", icon: "🎵" },
  { id: "photo", title: "Photo Shoot Session", icon: "📸" },
  { id: "consult", title: "Career Consultation", icon: "💼" },
  { id: "stylist", title: "Event Stylist Service", icon: "👗" },
]

export default function IPQuestPage() {
  const [gameState, setGameState] = useState<"home" | "game" | "end">("home")
  const [fragments, setFragments] = useState(0)
  const [crystals, setCrystals] = useState<Crystal[]>([])
  const [selectedCrystal, setSelectedCrystal] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState<"correct" | "wrong" | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [selectedReward, setSelectedReward] = useState<string | null>(null)
  const [userName, setUserName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const generateCrystals = useCallback(() => {
    const newCrystals: Crystal[] = []
    for (let i = 0; i < 5; i++) {
      newCrystals.push({
        id: Date.now() + i,
        x: Math.random() * 70 + 10,
        y: Math.random() * 60 + 20,
      })
    }
    setCrystals(newCrystals)
  }, [])

  useEffect(() => {
    if (gameState === "game" && crystals.length === 0) {
      generateCrystals()
    }
  }, [gameState, crystals.length, generateCrystals])

  const startGame = () => {
    setGameState("game")
    setFragments(0)
    setAnsweredQuestions(new Set())
    setIsSubmitted(false)
    setSelectedReward(null)
    setUserName("")
    generateCrystals()
  }

  const handleCrystalTap = (crystalId: number) => {
    setSelectedCrystal(crystalId)
    const availableQuestions = questions.map((_, index) => index).filter((index) => !answeredQuestions.has(index))

    if (availableQuestions.length === 0) {
      setAnsweredQuestions(new Set())
      setCurrentQuestion(Math.floor(Math.random() * questions.length))
    } else {
      setCurrentQuestion(availableQuestions[Math.floor(Math.random() * availableQuestions.length)])
    }
  }

  const handleAnswer = (selectedOption: number) => {
    const question = questions[currentQuestion]
    if (selectedOption === question.correct) {
      setShowResult("correct")
      setFragments((prev) => prev + 3)
      setAnsweredQuestions((prev) => new Set([...prev, currentQuestion]))

      setTimeout(() => {
        setSelectedCrystal(null)
        setShowResult(null)
        setCrystals((prev) => {
          const newCrystals = prev.filter((c) => c.id !== selectedCrystal)
          newCrystals.push({
            id: Date.now(),
            x: Math.random() * 70 + 10,
            y: Math.random() * 60 + 20,
          })
          return newCrystals
        })

        if (fragments + 3 >= 20) {
          setTimeout(() => setGameState("end"), 500)
        }
      }, 1500)
    } else {
      setShowResult("wrong")
      setTimeout(() => setShowResult(null), 1000)
    }
  }

  const closeModal = () => {
    setSelectedCrystal(null)
    setShowResult(null)
  }

  const handleSubmitReward = () => {
    if (selectedReward && userName.trim()) {
      console.log("[v0] Creator Pass claimed:", { reward: selectedReward, name: userName })
      setIsSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {gameState === "home" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-lg rotate-45 blur-sm animate-float"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 25}%`,
                  animationDelay: `${i * 2}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-md">
            <Sparkles className="w-20 h-20 text-yellow-500 mx-auto mb-4" />

            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-foreground leading-tight">
              IP Fragments
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground font-medium">
              Collect fragments. Learn IP through Q&A.
            </p>

            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 min-h-[64px]"
            >
              Start Game
            </Button>
          </div>
        </div>
      )}

      {gameState === "game" && (
        <div className="min-h-screen relative">
          {/* Fragment counter */}
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-background/95 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl px-8 py-4 shadow-2xl transition-transform">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span className="font-display font-black text-3xl text-foreground">{fragments}</span>
                <span className="text-sm text-muted-foreground font-medium">fragments</span>
              </div>
            </div>
          </div>

          {/* Game area with floating crystals */}
          <div className="absolute inset-0 pt-32 pb-20">
            {crystals.map((crystal) => (
              <button
                key={crystal.id}
                onClick={() => handleCrystalTap(crystal.id)}
                className="absolute w-16 h-16 sm:w-20 sm:h-20 touch-target animate-crystal-float"
                style={{
                  left: `${crystal.x}%`,
                  top: `${crystal.y}%`,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-yellow-400 via-red-400 to-purple-400 rounded-2xl rotate-45 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all" />
              </button>
            ))}
          </div>

          {/* Question Modal */}
          {selectedCrystal !== null && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
                onClick={showResult ? undefined : closeModal}
              />

              <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 max-w-lg mx-auto bg-background rounded-3xl shadow-2xl z-50 border-2 border-border overflow-hidden animate-in zoom-in-95 duration-200">
                {showResult === null && (
                  <>
                    <div className="p-6 border-b border-border flex items-center justify-between">
                      <h3 className="font-display font-black text-2xl text-foreground">Quick IP Check</h3>
                      <Button variant="ghost" size="sm" onClick={closeModal} className="p-2 hover:bg-accent/10">
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="p-6 space-y-6">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {questions[currentQuestion].fact}
                      </p>

                      <div className="space-y-2">
                        <p className="font-bold text-lg text-foreground mb-4">{questions[currentQuestion].text}</p>

                        <div className="space-y-3">
                          {questions[currentQuestion].options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              variant="outline"
                              className="w-full h-auto py-4 px-6 text-left justify-start font-medium text-base hover:bg-accent/10 hover:border-accent transition-all rounded-xl"
                            >
                              <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {showResult === "correct" && (
                  <div className="p-12 text-center">
                    <Sparkles className="w-20 h-20 text-green-500 mx-auto mb-6 animate-in zoom-in duration-300" />
                    <h3 className="font-display font-black text-4xl text-green-500 mb-4">+3 Fragments!</h3>
                    <p className="text-lg text-muted-foreground">Great job!</p>
                  </div>
                )}

                {showResult === "wrong" && (
                  <div className="p-12 text-center">
                    <X className="w-20 h-20 text-red-500 mx-auto mb-6 animate-shake" />
                    <h3 className="font-display font-black text-3xl text-red-500 mb-4">Try Again</h3>
                    <p className="text-lg text-muted-foreground">Read the hint carefully!</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {gameState === "end" && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in duration-300">
          {!isSubmitted ? (
            <div className="text-center space-y-8 max-w-lg w-full">
              <Sparkles className="w-24 h-24 text-yellow-500 mx-auto mb-4 animate-spin-slow" />

              <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">Congrats!</h1>

              <div className="bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-2 border-yellow-500 rounded-3xl p-8">
                <p className="text-2xl sm:text-3xl font-display font-black text-foreground mb-2">You've Unlocked</p>
                <p className="text-3xl sm:text-4xl font-display font-black bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                  Creator Pass
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-base text-muted-foreground font-medium">Choose your reward:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {creatorPassRewards.map((reward) => (
                    <button
                      key={reward.id}
                      onClick={() => setSelectedReward(reward.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedReward === reward.id
                          ? "border-yellow-500 bg-yellow-500/10"
                          : "border-border hover:border-accent"
                      }`}
                    >
                      <div className="text-3xl mb-2">{reward.icon}</div>
                      <p className="font-bold text-sm text-foreground">{reward.title}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-3 pt-4">
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="h-14 text-base rounded-xl"
                  />

                  <Button
                    onClick={handleSubmitReward}
                    disabled={!selectedReward || !userName.trim()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold text-lg py-6 rounded-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Claim Reward
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8 max-w-md">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4 animate-in zoom-in duration-500" />

              <h1 className="font-display font-black text-4xl sm:text-5xl text-foreground leading-tight">
                All Set, {userName}!
              </h1>

              <p className="text-lg text-muted-foreground font-medium">
                Your {creatorPassRewards.find((r) => r.id === selectedReward)?.title} has been reserved.
              </p>

              <p className="text-base text-muted-foreground max-w-sm mx-auto">
                We'll contact you soon with the next steps!
              </p>

              <Button
                onClick={startGame}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold text-xl px-12 py-8 rounded-2xl shadow-2xl transform transition-transform hover:scale-105 min-h-[64px]"
              >
                Play Again
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
