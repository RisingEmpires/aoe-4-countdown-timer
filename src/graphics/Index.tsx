import React, { useState, useEffect } from 'react'
import { useReplicant } from 'use-nodecg'
import { differenceInSeconds } from 'date-fns'

let interval: any
export function Index() {
  const [countdownTimerActive, setCountdownTimerActive] = useReplicant<boolean>(
    'countdownTimerActive',
    false
  )
  const [countdownTimerEnd, setCountdownTimerEnd] = useReplicant<string>(
    'countdownTimerEnd',
    ''
  )
  const [secondsRemaining, setSecondsRemaining] = useState(0)
  console.log('render')

  useEffect(() => {
    console.log('useEffect')

    if (!!interval) {
      interval = clearInterval(interval)
    }

    if (countdownTimerActive && !!countdownTimerEnd) {
      const now = new Date()
      const end = new Date(countdownTimerEnd)
      const totalSeconds = differenceInSeconds(end, now)
      setSecondsRemaining(totalSeconds)

      interval = setInterval(() => {
        console.log('setInterval')
        setSecondsRemaining((secondsRemaining) => secondsRemaining - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [countdownTimerActive, countdownTimerEnd])

  if (!countdownTimerActive) {
    return <></>
  }

  if (secondsRemaining <= 0) {
    interval = clearInterval(interval)
    return <>Initializing Overlay...</>
  }

  const minutes = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining - minutes * 60

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`

  return <>{formattedTime}</>
}
