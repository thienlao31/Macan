"user client"

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ImageState {
    imageUrl:string;
    setImageUrl: () => void;
}

export const useImageStore = create<ImageState>() (
    persist(
        (set)=>({
            imageUrl:"/img/Macan.jpg",
            setImageUrl: ()=> set((state)=> ({imageUrl: state.imageUrl === "/img/Macan.jpg" ? "/img/dotaOneLove.jpg" : "/img/Macan.jpg"}))
        }),
        {
            name: "Image-Store"
        }
    )
)