import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LoginCardProps {
  title?: string
  description?: string
  signUpTitle?: string
  signUpDescription?: string
}

export function LoginCard({
  title = "Employee Login",
  description = "Sign in to the employee portal",
  signUpTitle = "Create Account",
  signUpDescription = "Enter your details to get started",
}: LoginCardProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-2xl border-0 shadow-xl">
      <div className="bg-gray-800 px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-extrabold text-white">
              {isSignUp ? signUpTitle : title}
            </CardTitle>
            <CardDescription className="mt-1 text-gray-400">
              {isSignUp ? signUpDescription : description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-amber-400 hover:text-amber-300 hover:bg-white/10"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Login" : "Sign Up"}
          </Button>
        </div>
      </div>
      <CardContent className="px-6 py-8">
        <form>
          <div className="flex flex-col gap-5">
            {isSignUp && (
              <div className="grid gap-1.5">
                <Label htmlFor="name" className="text-gray-800 font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="border-gray-300 bg-white focus-visible:ring-amber-500"
                  required
                />
              </div>
            )}
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-gray-800 font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                className="border-gray-300 bg-white focus-visible:ring-amber-500"
                required
              />
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-gray-800 font-semibold">
                  Password
                </Label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="ml-auto text-sm text-gray-500 underline-offset-4 hover:text-gray-800 hover:underline"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                className="border-gray-300 bg-white focus-visible:ring-amber-500"
                required
              />
            </div>
            {isSignUp && (
              <div className="grid gap-1.5">
                <Label htmlFor="confirm-password" className="text-gray-800 font-semibold">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="border-gray-300 bg-white focus-visible:ring-amber-500"
                  required
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="px-6 pb-8 pt-0">
        <Button
          type="submit"
          className="w-full bg-gray-800 text-white font-bold hover:bg-gray-900"
        >
          {isSignUp ? "Create Account" : "Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}
