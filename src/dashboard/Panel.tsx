import React, { useState, useEffect } from 'react'
import { useReplicant } from 'use-nodecg'

export function Panel() {
  const [countdownTimerActive, setCountdownTimerActive] = useReplicant<boolean>(
    'countdownTimerActive',
    false
  )
  const [countdownTimerEnd, setCountdownTimerEnd] = useReplicant<string>(
    'countdownTimerEnd',
    ''
  )
  const [countdownTime, setCountdownTime] = useState('')

  const validateAndSetCountdownTimer = () => {
    const timeParts = countdownTime.split(':')
    if (timeParts?.length !== 2) return

    const minutes = parseInt(timeParts[0])
    const seconds = parseInt(timeParts[1])

    if (minutes > 5) return
    if (seconds > 59) return

    const timerEndDate = new Date()
    timerEndDate.setMinutes(timerEndDate.getMinutes() + minutes)
    timerEndDate.setSeconds(timerEndDate.getSeconds() + seconds)

    setCountdownTimerActive(!countdownTimerActive)
    setCountdownTimerEnd(timerEndDate.toString())
  }

  return (
    <>
      <div>
        <div className='flex flex-row'>
          <input
            type='text'
            placeholder='5:00'
            name='aoe2cmDraft'
            className='w-3/5'
            value={countdownTime}
            onChange={(e) => setCountdownTime(e.currentTarget.value)}
          />
          <div className='px-16 w-2/5'>
            <button onClick={validateAndSetCountdownTimer}>
              {' '}
              {!countdownTimerActive ? 'Start Timer' : 'Stop Timer'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
