"user client"

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Colors {
    ColorIndex:number;
    navbarColor:string;
    setNavbarColor: () => void;
    ColorChange: () => void;
    SetZero: () => void;
}

export const useColorStore = create<Colors>() (
    persist(
        (set)=>({
            ColorIndex:0,
            navbarColor:"red",
            setNavbarColor: ()=> set((state)=> ({navbarColor: state.navbarColor === "red" ? "blue" : "red"})),
            ColorChange: ()=> set((state)=> ({ColorIndex: state.ColorIndex + 1})),
            SetZero: ()=> set({ColorIndex:0})
        }),
        {
            name: "Color-Store"
        }
    )
)