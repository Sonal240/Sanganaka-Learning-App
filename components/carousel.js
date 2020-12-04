import React from 'react';
import Slider from "react-draggable-slider";
import { ScrollView, Text, Image } from 'react-native';

export default function SliderComp(props) {
    const sliderSettings = {
        data: props.list,
        speed: 1000,
        easing: "expo",
        bgColor: "rgba(255, 255, 255, 0.05)",
        buttonHref: "https://www.google.com",
        buttonTarget: "_self",
        buttonText: "View project",
        showButton: true,
    };
    return(
        <div>
            <Slider sliderSettings={sliderSettings} />
        </div>
    )
}