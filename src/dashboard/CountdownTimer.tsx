import React, { useState, useEffect } from 'react'
import { useReplicant } from 'use-nodecg'
import { differenceInSeconds } from 'date-fns'
import { Tooltip as ReactTooltip } from "react-tooltip";


export function CountdownTimer() {
  let interval: any
  const [countdownTimerActive, setCountdownTimerActive] = useReplicant<boolean>(
    'countdownTimerActive',
    false
  )
  const [countdownTimerEnd, setCountdownTimerEnd] = useReplicant<string>(
    'countdownTimerEnd',
    ''
  )
  const [timerEndText, setTimerEndText] = useReplicant<string>(
    'timerEndText',
    ''
  )
  const [countdownTime, setCountdownTime] = useState('')

  const [errorMessage, setErrorMessage] = useState(<>&nbsp;</>)

  const [timer, setTimer] = useReplicant<string>(
    'timer',
    ''
  )

  const validateAndSetCountdownTimer = () => {
    // If countdown is currently active and the user just hit stop, ensure this happens regardless of if we have a valid time
    if (countdownTimerActive) {
      setCountdownTimerActive(!countdownTimerActive)
    }

    const timeParts = countdownTime.split(/[\sm:;.,]/)
    if (timeParts?.length !== 2) {
      setErrorMessageText("Missing Seperator (: . , ;)")
      return
    }

    const minutes = parseInt(timeParts[0])
    const seconds = parseInt(timeParts[1])

    if (minutes > 59 || isNaN(minutes)) {
      setErrorMessageText("59 Minutes is long enough...")
      return
    }
    if (seconds > 59 || isNaN(seconds)) {
      setErrorMessageText("Maybe make this a minute instead?")
      return
    }

    const timerEndDate = new Date()
    timerEndDate.setMinutes(timerEndDate.getMinutes() + minutes)
    timerEndDate.setSeconds(timerEndDate.getSeconds() + seconds)

    // Similar to above, don't provoke the react gods and ensure we only set this if we haven't already
    if (!countdownTimerActive) {
      setCountdownTimerActive(!countdownTimerActive)
    }
    setCountdownTimerEnd(timerEndDate.toString())
  }

  async function setErrorMessageText(msg: string) {
    setErrorMessage(<>{msg}</>)
    await new Promise(resolve => setTimeout(resolve, 4000));
    setErrorMessage(<>&nbsp;</>)
  }

  return (
    <div className='py-4'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-1xl'>Live Output</h1>
        <h1 className='text-5xl'>{countdownTimerActive ? timer : <span className='italic text-3xl'>Timer Hidden</span>}</h1>
        <h1 className='text-3xl text-red-600'>{errorMessage}</h1>
      </div>
      <div className='flex flex-row justify-evenly'>
        <div className='w-5/12 px-8'>
          <input
            type='text'
            placeholder='5:00'
            name='timerInputTextField'
            className='w-1/5 text-black timerInputTextField'
            value={countdownTime}
            onChange={(e) => setCountdownTime(e.currentTarget.value)}
          />
          <ReactTooltip
            anchorSelect=".timerInputTextField"
            id="tooltip1"
            place="bottom"
            //@ts-ignore
            content={<div className='text-xl'>Input Field for Timer. <br /> Valid formats are: | 1:05 | 1m05 | 1.05 | 1,05 | 1 05 | 1;05<br />All of these will result in a timer of 1 min 5 sec. 05 can be replaced with 5</div>}
          />
        </div>
        <button className={`${!countdownTimerActive ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700'} my-2 px-4 text-white w-5/12`} onClick={validateAndSetCountdownTimer}>
          {!countdownTimerActive ? 'Start Timer' : 'Stop Timer'}
        </button>
      </div>
      <hr />
      <div className='flex flex-col py-4 items-center'>
        <h1 className='text-2xl pb-2'>Time Presets</h1>
        <div className='flex flex-row justify-evenly w-full'>
          <button className='bg-blue-500 hover:bg-blue-700 mx-4 py-2' onClick={() => setCountdownTime('1:00')}>1 min</button>
          <button className='bg-blue-500 hover:bg-blue-700 mx-4 py-2' onClick={() => setCountdownTime('2:00')}>2 min</button>
          <button className='bg-blue-500 hover:bg-blue-700 mx-4 py-2' onClick={() => setCountdownTime('3:00')}>3 min</button>
          <button className='bg-blue-500 hover:bg-blue-700 mx-4 py-2' onClick={() => setCountdownTime('4:00')}>4 min</button>
          <button className='bg-blue-500 hover:bg-blue-700 mx-4 py-2' onClick={() => setCountdownTime('5:00')}>5 min</button>
        </div>
      </div>
      <hr />
      <div className='p-4 flex flex-col items-center justify-center'>
        <h1 className='text-2xl'>Timer End Text</h1>
        <input
          type='text'
          placeholder='Timer Done!'
          name='timerEndText'
          className=' text-black'
          value={timerEndText}
          onChange={(e) => setTimerEndText(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}
