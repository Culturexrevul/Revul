"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Mail, Smartphone, MessageSquare, ArrowRight, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePrivy, useLogin } from '@privy-io/react-auth'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { ready, authenticated } = usePrivy()
  const { login } = useLogin({
    onComplete: (params) => {
      // Destructure the parameters from the single object
      const { user, isNewUser, wasAlreadyAuthenticated, loginMethod, loginAccount } = params
      console.log('Login completed:', { 
        user, 
        isNewUser, 
        wasAlreadyAuthenticated, 
        loginMethod, 
        loginAccount 
      })
      router.push("/dashboard")
    },
    onError: (error) => {
      console.error('Login error:', error)
    },
  })

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (ready && authenticated) {
      router.push("/dashboard")
    }
  }, [ready, authenticated, router])

  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Initializing authentication...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary mb-4">
              Welcome to Revulter Cultural Commerce
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base px-2 max-w-2xl mx-auto">
              Secure, seamless authentication powered by Privy. Register and protect your IP assets with enterprise-grade security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Login Card */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center px-4 sm:px-6">
                  <CardTitle className="font-display text-lg sm:text-xl text-primary">
                    Sign In / Register
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Get started in seconds. No password required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="space-y-4">
                    <Button
                      onClick={login}
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 h-14 text-lg"
                    >
                      <Zap className="h-5 w-5 mr-3" />
                      Continue with Privy
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Features included
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Enterprise Security</p>
                          <p className="text-sm text-muted-foreground">
                            Bank-level encryption and multi-factor authentication
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Smartphone className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Wallet Management</p>
                          <p className="text-sm text-muted-foreground">
                            Embedded wallet or connect your existing wallet
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 text-purple-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Social & Email Logins</p>
                          <p className="text-sm text-muted-foreground">
                            Google, Discord, email, and more
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Separator className="my-4" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <Link href="/terms" className="text-accent hover:text-accent/80 font-medium">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-accent hover:text-accent/80 font-medium">
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Benefits */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border">
                <h3 className="font-display font-bold text-lg text-primary mb-4">
                  Why Privy Authentication?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>No passwords to remember or reset</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Built-in wallet for blockchain transactions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>One-click social logins (Google, Discord, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Secure recovery options for your account</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-1 mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <span>Perfect for IP registration and management</span>
                  </li>
                </ul>
              </div>

              <Card className="bg-gradient-to-br from-accent/5 to-primary/5 border-0">
                <CardContent className="p-6">
                  <h4 className="font-display font-bold text-primary mb-3">
                    Ready to protect your IP?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign up now to start registering and managing your intellectual property assets on the blockchain.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">1</div>
                      <div className="text-muted-foreground">Quick Sign Up</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">2</div>
                      <div className="text-muted-foreground">Upload Content</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">3</div>
                      <div className="text-muted-foreground">Register IP</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">4</div>
                      <div className="text-muted-foreground">Manage Assets</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground px-2">
              Need help?{" "}
              <Link href="/support" className="text-accent hover:text-accent/80">
                Contact our support team
              </Link>{" "}
              or{" "}
              <Link href="/docs" className="text-accent hover:text-accent/80">
                read our documentation
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
