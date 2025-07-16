import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton} from "@clerk/nextjs";
import {auth} from "@clerk/nextjs/server"
import Link from "next/link"
import { LogIn } from "lucide-react";

export default async function Home() {

  const {userId} = await auth()
  const isAuth = !!userId
  return (
   <div className="w-screen min-h-screen bg-gradient-to-r from-teal-100 to-blue-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">
              Talk To Your Documents
            </h1>
            <UserButton afterSignOutUrl="/"></UserButton>
          </div>
          <div className="flex mt-2">
            {isAuth && <Button className="mt-3">Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">Designed for students & professionals — chat with your PDFs and uncover insights instantly.</p>
          <div className="w-full mt-4">
            {isAuth ?(<h1>file upload</h1>):(
            <Link href="/sign-in">
              <Button>Login To Get Started
                <LogIn className="h-2 w-2 ml-2"></LogIn>
              </Button>
            </Link>) }
          </div>
        </div>
      </div>
   </div>
  );
}
