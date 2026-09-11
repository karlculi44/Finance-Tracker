import { animate, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type AnimatedNumberProps = {
  value: number;
  formatter: (value: number) => string;
  className?: string;
};

function AnimatedNumber({
  value,
  formatter,
  className,
}: AnimatedNumberProps) {
  const previousValue = useRef(value);
  const animatedValue = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);
  const [direction, setDirection] = useState<"up" | "down">("up");

  useEffect(() => {
    setDirection(value >= previousValue.current ? "up" : "down");
    previousValue.current = value;
    const controls = animate(animatedValue.current, value, {
      duration: 0.4,
      ease: "easeOut",
      onUpdate: (latestValue) => {
        animatedValue.current = latestValue;
        setDisplayValue(latestValue);
      },
    });

    return () => controls.stop();
  }, [formatter, value]);

  return (
    <motion.span
      className={className}
      animate={{
        y: direction === "up" ? [2, 0] : [-2, 0],
        opacity: [0.86, 1],
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {formatter(displayValue)}
    </motion.span>
  );
}

export default AnimatedNumber;
