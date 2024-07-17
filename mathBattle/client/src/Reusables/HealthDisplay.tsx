
interface HealthProps {
    maxHealth: number,
    curHealth: number
}

export function HealthDisplay(props: HealthProps) {
    return (
        <>{
            [...Array(props.maxHealth).keys()].map((position) =>
                position < props.curHealth ? (
                    <img src="/public/heart.svg" style={{ width: "5em" }} />
                ) : (
                    <img src="/public/heart-lost.svg" style={{ width: "5em" }} />
                )
            )
        }</>)
}