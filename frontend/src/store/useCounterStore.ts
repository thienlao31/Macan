'user client'

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Counter {
    count:number;
    sqrt:number;
    increment: ()=> void;
    decrement: ()=> void;
    removeState: ()=> void;
    defineSqrt: ()=> void;
}

export const useCounterStore = create<Counter>() (
    persist(
        (set)=>({
            count:0,
            sqrt:0,
            increment: ()=> set((state)=> ({count: state.count + 2})),
            decrement: ()=> set((state)=> ({count: state.count - 4})),
            removeState: ()=> set({count:0, sqrt:0}),
            defineSqrt: ()=> set((state)=> ({sqrt: Math.sqrt(state.count)}))
        }),
        {
            name: "Counter-Store"
        }
    ))