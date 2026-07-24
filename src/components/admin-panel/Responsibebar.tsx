/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sheet,  SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

import Menu from "./Menu";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "./sidebar-context";

import logo from "@/assets/logo/pickaboo.svg";
import responsiveLogo from "@/assets/logo/respomsive_logo.webp";import { cn } from "@/lib/utils";
const Responsibebar = () => {
  

  const [open, setOpen] = useState(false);
 const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
             <div className='w-8 cursor-pointer h-8 md:hidden bg-blue-600 rounded-lg flex items-center justify-center'>
          <span className='text-white font-bold text-sm'>S</span>
          </div>
        </SheetTrigger>

        <SheetContent side="left" className={cn(
        "fixed md:hidden  top-0 left-0  z-50 bg-[#1C2C3F]  h-screen border-r dark:bg-zinc-950 shadow-md transition-all duration-300",
        isOpen ? "!w-64" : "!w-20",
      )}>
         <aside
      className={cn(
        "fixed  top-0 left-0  z-50 bg-[#1C2C3F]  h-screen border-r dark:bg-zinc-950 shadow-md transition-all duration-300",
        isOpen ? "w-64" : "w-20",
      )}
    >
      {/* HEADER AREA */}
      <div className="relative  flex items-center justify-center py-2 border-b border-[#ffffff1f]">
        <Link href="/dashboard" className="">
          <div
            className={`flex items-center  justify-center bg-[#1C2C3F] 
            ${isOpen ? "pt-4.5" : "pt-4.25"} transition-all duration-200 ease-in-out  relative z-50`}
          >
            {isOpen ? (
              <Image
                src={logo}
                alt="Logo"
                width={500}
                height={500}
                className="w-32 h-auto mb-5"
                priority
              />
            ) : (
              <Image
                src={responsiveLogo}
                alt="responsiveLogo"
                width={300}
                height={300}
                className="w-10 h-auto mb-5"
              />
            )}
          </div>
        </Link>

        {/* TOGGLE BUTTON */}
        <button
          onClick={toggleSidebar}
          className={`  ${isOpen ? "-right-4 top-5 p-1" : "-right-3 top-4 p-0.5 rotate-180"} absolute  bg-secondary text-primary rounded border border-primary/20 transition`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* MENU AREA */}
      <div
     onClick={() => setOpen(true)}
        className={` ${isOpen ? "h-[calc(100vh-80px)]" : "h-screen pb-12"} overflow-y-auto custom-scrollbar pt-4`}
      >
      
        <Menu isOpen={isOpen} />
        
      </div>
    </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Responsibebar;
