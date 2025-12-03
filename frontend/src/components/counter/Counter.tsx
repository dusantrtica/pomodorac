import { formatTime } from "./utils";

export const Counter = ({ value }: { value: number }) => {
  const formattedTime = formatTime(value); 
  return <div>{formattedTime}</div>
}
