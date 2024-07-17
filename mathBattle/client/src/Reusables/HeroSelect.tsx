import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { characters } from "../Interfaces/Characters";
import { CalcType } from "../Interfaces/CalcType";
import { useState } from "react";

interface HeroSelectProperties {
    calcType: CalcType, 
    onChange: (newCalcType: CalcType) => void
}

export function HeroSelect(props: HeroSelectProperties) {
    function handleCalcTypeChange(event: any, value: any): void {
        props.onChange(value == undefined || value == null ? props.calcType : value);
    }
    return (<ToggleButtonGroup
        value={props.calcType}
        exclusive
        color="primary"
        onChange={handleCalcTypeChange}
        aria-label="Your hero"
    >
        {
            [CalcType.ADD, CalcType.SUBTRACT, CalcType.MULTIPLICATE, CalcType.DIVIDE].map((calc: CalcType) =>
                <ToggleButton value={calc} key={calc}
                    style={{ maxWidth: "18vw" }}>
                    <img src={characters.get(calc)} style={{ maxHeight: "10vh" }}></img>
                </ToggleButton>
            )
        }
    </ToggleButtonGroup>);
}