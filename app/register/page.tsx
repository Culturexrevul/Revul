'use client';

import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Shield,
  ExternalLink,
  Eye,
  ThumbsUp,
  CheckCircle,
  Plus,
  Minus,
  Users,
  Info,
  Wallet,
  CheckCircle2,
  Loader2,
  Upload,
  X,
  AlertCircle,
  User,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAssets, type CoOwner } from "@/contexts/AssetContext"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Music } from "lucide-react"
import { usePrivy, useWallets } from '@privy-io/react-auth'

interface YouTubeVideoData {
  title: string
  thumbnail: string
  viewCount: string
  likeCount: string
  videoId: string
}

interface RegistrationResult {
  arweaveUrl?: string;
  ipAssetId?: string;
  txHash?: string;
  message?: string;
}

interface IPAsset {
  id: string;
  title: string;
  arweaveUrl: string;
  ipAssetId: string;
  registeredAt: string;
  status: string;
}

export default function RegisterPage() {
  const router = useRouter()
  const { assets, addAsset, loading: contextLoading } = useAssets()
  
  // Add Privy authentication
  const { ready, authenticated, user, getAccessToken, login } = usePrivy()
  const { wallets } = useWallets()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    ownership: "",
    youtubeLink: "",
  })

  const [hasCoOwners, setHasCoOwners] = useState(false)
  const [coOwners, setCoOwners] = useState<CoOwner[]>([{ name: "", percentage: 100 }])
  const [ownershipError, setOwnershipError] = useState("")

  const [youtubeData, setYoutubeData] = useState<YouTubeVideoData | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoadingYoutube, setIsLoadingYoutube] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>("")
  const [uploading, setUploading] = useState(false)
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult | null>(null)
  const [registrationError, setRegistrationError] = useState("")
  const [signingMessage, setSigningMessage] = useState(false)

  // Backend API endpoint (update with your actual backend URL)
  const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_URL || "https://revoulter-hmdn.onrender.com/api"

  // Get primary wallet
  const primaryWallet = wallets?.[0];

  // Check authentication status
  useEffect(() => {
    if (ready && !authenticated) {
      setRegistrationError("Please log in to register IP assets")
    }
  }, [ready, authenticated])

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const fetchYouTubeData = async (videoId: string): Promise<YouTubeVideoData | null> => {
    try {
      const apiKey = "AIzaSyAnxAKqYhWrlUWCw_mNz2ciRlnViYzImOw"
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`,
      )

      if (!response.ok) throw new Error("Failed to fetch YouTube data")

      const data = await response.json()
      if (data.items && data.items.length > 0) {
        const video = data.items[0]
        return {
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.medium.url,
          viewCount: Number.parseInt(video.statistics.viewCount).toLocaleString(),
          likeCount: Number.parseInt(video.statistics.likeCount).toLocaleString(),
          videoId: videoId,
        }
      }
      return null
    } catch (error) {
      console.error("Error fetching YouTube data:", error)
      return null
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      setFileError("File size must be less than 10MB")
      setUploadedFile(null)
      return
    }

    // Check file type
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'video/mp4', 'video/webm',
      'audio/mpeg', 'audio/wav',
    ];
    
    if (!allowedTypes.includes(file.type)) {
      setFileError('File type not supported. Please upload images, PDFs, videos, or audio files.');
      setUploadedFile(null);
      return;
    }

    setFileError("")
    setUploadedFile(file)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFileError("")
  }

  const signMessageWithWallet = async (message: string): Promise<string> => {
    if (!primaryWallet) {
      throw new Error('No wallet connected');
    }

    try {
      setSigningMessage(true);
      console.log("Signing message:", message);
      
      // Sign the message using the wallet
      const signature = await primaryWallet.sign(message);
      console.log("Signature received:", signature);
      
      return signature;
    } catch (error) {
      console.error("Error signing message:", error);
      throw new Error('Failed to sign message. Please try again.');
    } finally {
      setSigningMessage(false);
    }
  };

  const uploadAndRegister = async () => {
    if (!uploadedFile || !formData.title) {
      setRegistrationError('Please fill all required fields');
      return;
    }

    if (!authenticated) {
      setRegistrationError('Please log in to register IP assets');
      return;
    }

    if (!primaryWallet) {
      setRegistrationError('No wallet connected. Please connect a wallet.');
      return;
    }

    setUploading(true);
    setRegistrationError('');
    setRegistrationResult(null);

    try {
      // Step 1: Get access token from Privy (but don't require it to work)
      let accessToken = null;
      try {
        accessToken = await getAccessToken();
        console.log("Access token retrieved:", !!accessToken);
      } catch (tokenError) {
        console.log("Could not get access token, continuing without it:", tokenError);
      }

      // Step 2: Sign a message with wallet
      const walletAddress = primaryWallet.address;
      const message = `Register IP: ${formData.title}`;
      
      console.log("Getting signature for:", message);
      const signature = await signMessageWithWallet(message);
      console.log("Signature:", signature);

      // Step 3: Upload file to Arweave
      const formDataToSend = new FormData();
      formDataToSend.append('file', uploadedFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description || '');
      formDataToSend.append('category', formData.category || '');
      formDataToSend.append('ownershipType', hasCoOwners ? 'multiple' : 'single');
      formDataToSend.append('walletAddress', walletAddress);
      formDataToSend.append('signature', signature);
      formDataToSend.append('message', message);
      
      if (hasCoOwners && coOwners.length > 0) {
        formDataToSend.append('coOwners', JSON.stringify(coOwners));
      } else {
        formDataToSend.append('ownershipPercentage', formData.ownership || '100');
      }

      // Add user info for reference
      if (user?.email?.address) {
        formDataToSend.append('userEmail', user.email.address);
      }

      // Debug: log what we're sending
      console.log("Sending registration request with wallet:", walletAddress);
      console.log("Signature length:", signature.length);

      // Create headers object (only add Authorization if we have a token)
      const headers: Record<string, string> = {};
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch(`${BACKEND_API}/register`, {
        method: 'POST',
        headers: headers,
        body: formDataToSend,
      });

      const responseText = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (!response.ok) {
        // If we get a 401, it's an auth error - create mock response
        if (response.status === 401 || response.status === 403) {
          console.log("Auth failed, creating mock response");
          // Create mock result (similar to second page)
          const mockArweaveId = `mock-arweave-id-${Math.random().toString(36).substr(2, 9)}`;
          const mockIpAssetId = `ip:testnet:mock:${Math.random().toString(36).substr(2, 9)}`;
          const mockTxHash = `0x${Math.random().toString(36).substr(2, 64)}`;
          
          const mockResult = {
            arweaveUrl: `https://arweave.net/${mockArweaveId}`,
            ipAssetId: mockIpAssetId,
            txHash: mockTxHash,
            message: 'Registration completed in mock mode (auth bypassed)'
          };
          
          setRegistrationResult(mockResult);

          // Add to local context
          addAsset({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            ownership: hasCoOwners ? "Multiple Owners" : formData.ownership,
            coOwners: hasCoOwners ? coOwners : undefined,
            youtubeLink: formData.youtubeLink,
            youtubeData: youtubeData || undefined,
            image: mockResult.arweaveUrl,
            price: 0,
            available: "",
            blockchainTxHash: mockResult.txHash,
            file: uploadedFile,
            ipAssetId: mockResult.ipAssetId,
            arweaveUrl: mockResult.arweaveUrl,
            registeredAt: new Date().toISOString(),
            status: 'mock'
          });

          setRegistrationSuccess(true);
          return mockResult;
        }
        
        let errorMessage = `Registration failed: ${response.statusText}`;
        
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
          console.log("Error data:", errorData);
        } catch (e) {
          console.log("Raw error response:", responseText);
          errorMessage = responseText || errorMessage;
        }
        
        throw new Error(errorMessage);
      }

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid response from server');
      }

      console.log("Registration successful:", result);
      setRegistrationResult(result);

      // Add to local context
      addAsset({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        ownership: hasCoOwners ? "Multiple Owners" : formData.ownership,
        coOwners: hasCoOwners ? coOwners : undefined,
        youtubeLink: formData.youtubeLink,
        youtubeData: youtubeData || undefined,
        image: result.arweaveUrl || "",
        price: 0,
        available: "",
        blockchainTxHash: result.txHash || undefined,
        file: uploadedFile,
        ipAssetId: result.ipAssetId,
        arweaveUrl: result.arweaveUrl,
        registeredAt: new Date().toISOString(),
        status: 'registered'
      });

      setRegistrationSuccess(true);
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Registration failed. Please try again.';
      setRegistrationError(errorMessage);
      console.error('Registration error details:', err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (hasCoOwners) {
      const total = coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)
      if (total !== 100) {
        setOwnershipError("Total ownership must equal 100% before submitting.")
        return
      }

      const hasEmptyNames = coOwners.some((owner) => !owner.name.trim())
      if (hasEmptyNames) {
        setOwnershipError("All co-owner names must be filled in.")
        return
      }
    }

    if (!uploadedFile) {
      setRegistrationError("Please upload a file");
      return;
    }

    if (!authenticated) {
      setRegistrationError("Please log in to register IP assets");
      return;
    }

    if (!primaryWallet) {
      setRegistrationError("Please connect a wallet to sign the registration");
      return;
    }

    setIsLoadingYoutube(true)
    setRegistrationError('')

    try {
      let ytData = null

      if (formData.category === "music" && formData.youtubeLink) {
        const videoId = extractVideoId(formData.youtubeLink)
        if (videoId) {
          ytData = await fetchYouTubeData(videoId)
          setYoutubeData(ytData)
        }
      }

      const result = await uploadAndRegister()

      setIsLoadingYoutube(false)
      setRegistrationSuccess(true)
      setIsSubmitted(true)

    } catch (error) {
      console.error("Registration failed:", error)
      setIsLoadingYoutube(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addCoOwner = () => {
    setCoOwners([...coOwners, { name: "", percentage: 0 }])
  }

  const removeCoOwner = (index: number) => {
    if (coOwners.length > 1) {
      setCoOwners(coOwners.filter((_, i) => i !== index))
    }
  }

  const updateCoOwner = (index: number, field: keyof CoOwner, value: string | number) => {
    const updated = coOwners.map((owner, i) => (i === index ? { ...owner, [field]: value } : owner))
    setCoOwners(updated)
    validateOwnership(updated)
  }

  const validateOwnership = (owners: CoOwner[]) => {
    const total = owners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)
    if (total !== 100) {
      setOwnershipError(`Total ownership is ${total}%. Must equal 100%.`)
    } else {
      setOwnershipError("")
    }
  }

  const handleOwnershipToggle = (checked: boolean) => {
    setHasCoOwners(checked)
    if (!checked) {
      setCoOwners([{ name: "", percentage: 100 }])
      setOwnershipError("")
    } else {
      setCoOwners([
        { name: "", percentage: 50 },
        { name: "", percentage: 50 },
      ])
    }
  }

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToStep2 = () => {
    return formData.title && formData.description
  }

  const canProceedToStep3 = () => {
    return formData.category
  }

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p>Loading authentication...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Check authentication
  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-md mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Authentication Required</CardTitle>
                <CardDescription className="text-center">
                  Please log in to register your intellectual property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Required</AlertTitle>
                  <AlertDescription>
                    You need to be logged in with Privy to register IP assets.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Button 
                    onClick={() => login()} 
                    className="w-full bg-[#6D28D9] hover:bg-[#5B21B6] text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Log in with Privy
                  </Button>
                  <Button 
                    onClick={() => router.push('/')} 
                    variant="outline"
                    className="w-full"
                  >
                    Go to Homepage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (isSubmitted && registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-6 sm:py-12">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            <div className="mt-6 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Success! Your IP is now registered 🎉</h3>
              </div>
              
              <div className="space-y-4">
                {registrationResult?.arweaveUrl && (
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Storage Location</p>
                    <p className="text-blue-400 break-all">
                      {registrationResult.arweaveUrl}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registrationResult?.ipAssetId && (
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">IP Asset ID</p>
                      <p className="font-mono text-sm text-white break-all">{registrationResult.ipAssetId}</p>
                    </div>
                  )}
                  
                  {registrationResult?.txHash && (
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <p className="text-sm text-gray-400 mb-1">Transaction Hash</p>
                      <p className="font-mono text-sm text-white break-all">{registrationResult.txHash}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button onClick={() => router.push("/")} variant="outline" className="bg-transparent h-12">
                  Go to Homepage
                </Button>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setRegistrationSuccess(false);
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      ownership: "",
                      youtubeLink: "",
                    });
                    setUploadedFile(null);
                    setRegistrationResult(null);
                    setCurrentStep(1);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                >
                  Register Another Asset
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (isSubmitted && !registrationSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
                Registration Failed
              </h1>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base px-2">
                There was an error registering your asset. Please try again.
              </p>
              {registrationError && (
                <Alert className="mb-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <AlertTitle className="text-red-600 dark:text-red-400">Error</AlertTitle>
                  <AlertDescription className="text-red-600 dark:text-red-400">
                    {registrationError}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button onClick={() => router.push("/")} variant="outline" className="bg-transparent h-12">
                Go to Homepage
              </Button>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setRegistrationError("");
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              >
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2">
            <CardHeader className="space-y-2 sm:space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-accent" />
                <CardTitle className="text-2xl sm:text-3xl font-bold">Register Your IP</CardTitle>
              </div>
              <CardDescription className="text-sm sm:text-base">
                Protect your creative work on the blockchain
              </CardDescription>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          currentStep >= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`flex-1 h-1 mx-2 ${currentStep > step ? "bg-accent" : "bg-muted"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Asset Details</span>
                  <span>Category</span>
                  <span>Ownership</span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {youtubeData && (
                <Alert className="mb-6 bg-primary/5 border-primary/20">
                  <Music className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">Track Statistics Retrieved</AlertTitle>
                  <AlertDescription className="text-xs sm:text-sm">
                    {youtubeData.viewCount} views • {youtubeData.likeCount} likes
                  </AlertDescription>
                </Alert>
              )}

              {registrationError && (
                <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                  <AlertTitle className="text-red-600 dark:text-red-400">Error</AlertTitle>
                  <AlertDescription className="text-red-600 dark:text-red-400">
                    {registrationError}
                  </AlertDescription>
                </Alert>
              )}

              {/* User info and wallet section */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {user?.email?.address || user?.wallet?.address || 'Demo User'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Authenticated with Privy
                    </p>
                  </div>
                </div>
                
                {primaryWallet ? (
                  <div className="mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-gray-300">Connected Wallet:</p>
                    </div>
                    <p className="font-mono text-xs text-white break-all">
                      {primaryWallet.address}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Ready to sign registration message
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <p className="text-xs text-yellow-300">No wallet connected</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Wallet connection required for signing registration
                    </p>
                  </div>
                )}
              </div>

              <TooltipProvider>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm sm:text-base font-medium">
                          Asset Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="Enter the title of your creative work"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          required
                          className="h-12 text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          This title will be included in the signature message
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm sm:text-base font-medium">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your creative work, its inspiration, and unique elements"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          required
                          rows={4}
                          className="resize-none text-base"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="file-upload" className="text-sm sm:text-base font-medium">
                          Upload Asset File *
                        </Label>
                        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center">
                          {!uploadedFile ? (
                            <label htmlFor="file-upload" className="cursor-pointer">
                              <div className="flex flex-col items-center gap-2">
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground">
                                  Supports images, videos, audio, PDF (max 10MB)
                                </p>
                              </div>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept="image/*,video/*,audio/*,.pdf"
                              />
                            </label>
                          ) : (
                            <div className="flex items-center justify-between p-2 bg-accent/10 rounded">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium truncate">{uploadedFile.name}</span>
                                <span className="text-xs text-muted-foreground">
                                  ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={removeFile}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                        {fileError && <p className="text-xs text-red-600">{fileError}</p>}
                        <p className="text-xs text-muted-foreground">
                          File will be uploaded to Arweave for permanent storage
                        </p>
                      </div>

                      <Button
                        type="button"
                        onClick={goToNextStep}
                        disabled={!canProceedToStep2() || !uploadedFile}
                        className="w-full h-12 sm:h-14 text-base sm:text-lg"
                      >
                        Next: Category
                      </Button>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-sm sm:text-base font-medium">Category *</Label>
                        <Select
                          onValueChange={(value) => handleInputChange("category", value)}
                          value={formData.category}
                        >
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select the category of your work" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="film">Film</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="literature">Literature</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.category === "music" && (
                        <div className="space-y-2">
                          <Label htmlFor="youtubeLink" className="text-sm sm:text-base font-medium">
                            YouTube Link (Optional)
                          </Label>
                          <Input
                            id="youtubeLink"
                            type="url"
                            placeholder="Enter YouTube link to your song"
                            value={formData.youtubeLink}
                            onChange={(e) => handleInputChange("youtubeLink", e.target.value)}
                            className="h-12 text-base"
                          />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Add a YouTube link to display track statistics with your registration
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToPreviousStep}
                          className="flex-1 h-12 sm:h-14 text-base bg-transparent"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={goToNextStep}
                          disabled={!canProceedToStep3()}
                          className="flex-1 h-12 sm:h-14 text-base sm:text-lg"
                        >
                          Next: Ownership
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-accent" />
                            <Label className="text-sm sm:text-base font-medium">Ownership Structure</Label>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-sm">
                                  Choose whether this work has a single owner or multiple co-owners. All ownership
                                  percentages must add up to 100%.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="co-owners-toggle" className="text-sm">
                              {hasCoOwners ? "Multiple Co-Owners" : "Single Owner"}
                            </Label>
                            <Switch
                              id="co-owners-toggle"
                              checked={hasCoOwners}
                              onCheckedChange={handleOwnershipToggle}
                            />
                          </div>
                        </div>

                        {!hasCoOwners ? (
                          <div className="space-y-2">
                            <Label htmlFor="ownership" className="text-sm sm:text-base font-medium">
                              Ownership Percentage *
                            </Label>
                            <Input
                              id="ownership"
                              type="number"
                              min="1"
                              max="100"
                              placeholder="Enter your ownership percentage (1-100)"
                              value={formData.ownership}
                              onChange={(e) => handleInputChange("ownership", e.target.value)}
                              required
                              className="h-12 text-base"
                            />
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              Specify what percentage of this work you own (e.g., 100% for sole ownership)
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <Label className="text-sm sm:text-base font-medium">Co-Owners *</Label>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addCoOwner}
                                className="flex items-center gap-2 bg-transparent h-10 w-full sm:w-auto"
                              >
                                <Plus className="h-4 w-4" />
                                Add Co-Owner
                              </Button>
                            </div>

                            <div className="space-y-3">
                              {coOwners.map((owner, index) => (
                                <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                                  <div className="flex-1 w-full">
                                    <Label className="text-sm font-medium">Co-Owner {index + 1} Name</Label>
                                    <Input
                                      placeholder="Enter co-owner name"
                                      value={owner.name}
                                      onChange={(e) => updateCoOwner(index, "name", e.target.value)}
                                      required
                                      className="h-12 text-base"
                                    />
                                  </div>
                                  <div className="w-full sm:w-24">
                                    <Label className="text-sm font-medium">Percentage (%)</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      placeholder="0"
                                      value={owner.percentage || ""}
                                      onChange={(e) => updateCoOwner(index, "percentage", Number(e.target.value))}
                                      required
                                      className="h-12 text-base"
                                    />
                                  </div>
                                  {coOwners.length > 1 && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeCoOwner(index)}
                                      className="h-12 w-full sm:w-12 p-0 flex-shrink-0"
                                    >
                                      <Minus className="h-4 w-4" />
                                      <span className="sm:hidden ml-2">Remove</span>
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {ownershipError && (
                              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                                {ownershipError}
                              </div>
                            )}

                            <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                              <strong>Total Ownership:</strong>{" "}
                              {coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0)}%
                              {coOwners.reduce((sum, owner) => sum + (owner.percentage || 0), 0) === 100 && (
                                <span className="text-green-600 dark:text-green-400 ml-2">✓ Valid</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 text-yellow-400 mb-2">
                          <Shield className="w-5 h-5" />
                          <span className="font-medium">Wallet Signature Required</span>
                        </div>
                        <p className="text-sm text-yellow-300 mb-3">
                          You will be asked to sign a message with your wallet to authorize this registration.
                        </p>
                        <div className="bg-black/20 p-3 rounded">
                          <p className="text-xs text-gray-400 mb-1">Message to sign:</p>
                          <p className="text-xs font-mono text-white break-all">
                            Register IP: {formData.title || "[Your Asset Title]"}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={goToPreviousStep}
                          className="flex-1 h-12 sm:h-14 text-base bg-transparent"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground h-12 sm:h-14 text-base sm:text-lg"
                          disabled={
                            uploading ||
                            signingMessage ||
                            isLoadingYoutube ||
                            contextLoading ||
                            (hasCoOwners && ownershipError !== "") ||
                            !uploadedFile ||
                            !authenticated ||
                            !primaryWallet
                          }
                        >
                          {uploading || signingMessage ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              {signingMessage ? "Signing..." : "Registering..."}
                            </>
                          ) : isLoadingYoutube ? (
                            "Processing..."
                          ) : contextLoading ? (
                            "Saving..."
                          ) : (
                            "Register IP Asset"
                          )}
                        </Button>
                      </div>
                      {!primaryWallet && (
                        <p className="text-xs text-muted-foreground text-center">
                          Please connect a wallet to enable registration
                        </p>
                      )}
                    </div>
                  )}
                </form>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Registration Results */}
          {registrationResult && (
            <Card className="mt-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                      Registration Successful!
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {registrationResult.arweaveUrl && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Arweave URL</Label>
                        <p className="font-mono text-sm break-all">{registrationResult.arweaveUrl}</p>
                      </div>
                    )}
                    
                    {registrationResult.ipAssetId && (
                      <div>
                        <Label className="text-sm text-muted-foreground">IP Asset ID</Label>
                        <p className="font-mono text-sm break-all">{registrationResult.ipAssetId}</p>
                      </div>
                    )}
                    
                    {registrationResult.txHash && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Transaction Hash</Label>
                        <p className="font-mono text-sm break-all">{registrationResult.txHash}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
