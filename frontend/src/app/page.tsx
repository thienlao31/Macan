"use client"

import axios, { Axios } from "axios";
import { useState } from "react";
import { useCounterStore } from "@/store/useCounterStore";
import { useColorStore } from "@/store/useColorState";

export default function Home() {
  const count = useCounterStore((state)=> state.count)
  const sqrt = useCounterStore((state)=> state.sqrt)
  const increment_zustand = useCounterStore((state)=> state.increment)
  const decrement_zustand = useCounterStore((state)=> state.decrement)
  const reset = useCounterStore((state)=> state.removeState)
  const defineSqrt = useCounterStore((state)=> state.defineSqrt)

  const colorIndex = useColorStore((state)=> state.ColorIndex)
  const colorChange = useColorStore((state)=> state.ColorChange)
  const setZero = useColorStore((state)=> state.SetZero)

  const color:string[] = ["bg-green-300","bg-blue-300","bg-white"]
  // const [index, setIndex] = useState<number>(0)


  const changeColor = () => {
    if (colorIndex < color.length-1) {
      colorChange()
    }
    else {
      setZero()
    }
  }


  return(
    <div className={`mt-4 flex flex-col min-h-screen gap-2 items-center justify-center ${color[colorIndex]}`}>
      <h1 className="text-[20px]">Hello world</h1>
      <h1 className="text-[20px]">{count}</h1>
      <h1 className="text-[20px]">Sqrt is equal to: {sqrt}</h1>
      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        <button className="w-[60px] h-[40px] bg-yellow-400 hover:bg-orange-500 rounded-xl" onClick={increment_zustand}>+</button>
        <button className="w-[60px] h-[40px] bg-yellow-400 hover:bg-orange-500 rounded-xl" onClick={decrement_zustand}>-</button>
        <button className="w-[60px] h-[40px] bg-red-400 hover:bg-red-500 rounded-xl" onClick={reset}>reset</button>
        <button className="w-[60px] h-[40px] bg-red-400 hover:bg-red-500 rounded-xl" onClick={defineSqrt}>Define sqrt</button>
      </div>      
      <button className="w-[120px] bg-yellow-400 hover:bg-orange-500 rounded-xl" onClick={changeColor}>Change color</button>
    </div>
  );
}
