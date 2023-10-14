function formatTime(inputSeconds: number): string {
  const hours = Math.floor(inputSeconds / 3600)
  const minutes = Math.floor((inputSeconds % 3600) / 60)
  const seconds = Math.floor((inputSeconds % 3600) % 60)
  const secondsString = seconds < 10 ? `0${inputSeconds}` : inputSeconds
  const minutesString = minutes < 10 ? `0${minutes}` : minutes
  return `${hours}:${minutesString}:${secondsString}`
}

export { formatTime }
