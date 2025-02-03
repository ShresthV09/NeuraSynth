"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Home() {
  const [theme, setTheme] = useState(false); // For dark/light theme
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isStateVisible, setIsStateVisible] = useState(false); // State for controlling state dropdown visibility


  const countries = ["India", "United States", "Canada", "Australia", "Germany"];
  const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"];

  const handleDateRange = (dateRange: { from: Date | undefined; to?: Date | undefined } | undefined) => {
    if (dateRange) {
      setStartDate(dateRange.from || null);
      setEndDate(dateRange.to || null);  // Will handle undefined gracefully
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };
  
  

  return (

    <div className={`p-8 min-h-screen ${theme ? "bg-gray-700 text-white" : "bg-white text-black"}`}>
      {/* Top bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-extrabold">AI BUILDER</h1>
        {/* Toggle Theme Switch */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{theme ? "Dark" : "Light"} Mode</span>
          <Switch checked={theme} onCheckedChange={(checked) => setTheme(checked)} />
        </div>
      </div>


      <div className="flex flex-row">

        <div className="relative">
          <Card className={`min-h-[53vh] w-[26vw] mt-5 ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
            <CardHeader>
              <CardTitle className="text-center" >Privious Prompt</CardTitle>
              <p >Content</p>
            </CardHeader>
          </Card>
          <Card className={`min-h-[23.5vh] w-[26vw] mt-3.5 ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
            <CardHeader>
              <CardTitle className="text-center">Recomondation</CardTitle>
              <p>Content</p>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col w-[60vw] m-5">
          {/* drop down */}
          <div className=" flex justify-between">
            {/* Dropdown Menu */}
            <div className="mb-6   ">
              <label className="block text-sm font-medium mb-2">
                {selectedCountry ? `Selected Country: ${selectedCountry}` : "Select Country:"}
              </label>

              {/* Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`text-left p-2 border rounded-md ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
                    {selectedCountry || "Select Country"}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose a Country</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setSelectedCountry("India")}>India</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCountry("Pakistan")}>Pakistan</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCountry("China")}>China</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedCountry("Nepal")}>Nepal</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                className={`${theme ? "bg-black text-white" : "bg-gray text-black"}`}
                id="state-switch"
                checked={isStateVisible}
                onCheckedChange={setIsStateVisible} // Toggle visibility of state dropdown
              />
              <Label htmlFor="state-switch">State</Label>
            </div>


            {/* Conditionally render the State Dropdown */}
            {isStateVisible && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {selectedState ? `Selected State: ${selectedState}` : "Select State:"}
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className={`w-full text-left p-2 border rounded-md ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
                      {selectedState || "Select State"}
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent>
                    <DropdownMenuLabel>Choose a State</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {states.map((state) => (
                      <DropdownMenuItem key={state} onClick={() => setSelectedState(state)}>
                        {state}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            {/* <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {selectedState ? `Selected State: ${selectedState}` : "Select State:"}
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-full text-left p-2 border rounded-md">
                    {selectedState || "Select Country"}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Choose a State</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => setSelectedState("Bihar")}>Bihar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedState("Gujarat")}>Gujarat</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedState("Rajasthan")}>Rajasthan</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedState("Maharashtra")}>Maharashtra</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Start Date:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`w-full ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
                    {startDate ? format(startDate, "dd/MM/yyyy") : "Select Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                <Calendar
                    mode="range"
                    selected={{ from: startDate || undefined, to: endDate || undefined }}
                    onSelect={handleDateRange}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-2">End Date:</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={`w-full ${theme ? "bg-gray text-white" : "bg-white text-black"}`}>
                    {endDate ? format(endDate, "dd/MM/yyyy") : "Select End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="range"
                    selected={{ from: startDate || undefined, to: endDate || undefined }}
                    onSelect={handleDateRange}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Textarea for Prompt */}
          <div className="mb-10 mr-6px absolute bottom-0 w-[60%]">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Enter your prompt:
            </label>
            <Textarea id="prompt" placeholder="Type your prompt here..." className={`w-full h-40 ${theme ? "bg-gray-700 text-white" : "bg-white text-black"}`} />
          </div>
        </div>
      </div>
    </div>
  );
}