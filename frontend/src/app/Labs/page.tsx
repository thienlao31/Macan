"use client"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";
import { clearInterval } from "timers";

export default function Labs() {

    const [hello,helloState] = useState<string>("loading")
    const [temp, setTemp] = useState<string>("loading")
    const [wind, setWind] = useState<string>("loading")

    const fetching = async () => {
        const response = await axios.get("http://localhost:8000/cats/breed", {responseType:'text'})
        const data = response.data
        helloState(data)
    }

    const openmeteo = async ()=> {
        const response = await axios.get("https://api.open-meteo.com/v1/forecast?latitude=32.2217&longitude=-110.9265&current=temperature_2m,wind_speed_10m")
        const data = response.data.current.temperature_2m
        const data1 = response.data.current.wind_speed_10m
        setTemp(data)
        setWind(data1)
    }

    useEffect(()=> {
        fetching()
        openmeteo()

        const interval = setInterval(()=> {
            openmeteo()
        },10000)

        return ()=> clearInterval(interval)
    },[])

    return(
        <div>
            <h1>Here is Labs page</h1>
            <p>{hello}</p>
            <img src={`/img/${hello}.png`}/>
            <p>The current temparature in Tucson is {temp}</p>
            <p>The current wind speed in Tucson is {wind}</p>
        </div>
    );
}