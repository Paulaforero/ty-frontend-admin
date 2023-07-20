import { motion } from 'framer-motion'
import { EarthScene } from '../3d/scenes/earth-scene'
import { useEffect, useState } from 'react'
import { Paper, Typography } from '@mui/material'
import { ecologicalQuotes } from '@/data/ecological-quotes'

export default function Earth() {
  const [isOn, setIsOn] = useState(false)
  const [currentQuote, setCurrentQuote] = useState('')

  const getRandomQuote = ecologicalQuotes => {
    const randomIndex = Math.floor(Math.random() * ecologicalQuotes.length)
    return ecologicalQuotes[randomIndex]
  }

  useEffect(() => {
    if (isOn) setCurrentQuote(getRandomQuote(ecologicalQuotes))
  }, [isOn])

  return (
    <motion.div className="fixed bottom-0 -right-10 w-full flex flex-row justify-end overflow-hidden">
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: isOn ? 0 : 200, opacity: isOn ? 1 : 0 }}
        className="flex items-center w-[50%]"
      >
        <Paper
          elevation={10}
          className="w-full text-center bg-secondary px-2"
          variant="elevation"
        >
          <Typography
            variant="h6"
            className="text-white italic font-extralight text-opacity-70"
          >
            &ldquo;{currentQuote}&rdquo;
          </Typography>
        </Paper>
      </motion.div>

      <motion.div>
        <EarthScene isOn={isOn} setIsOn={setIsOn} />
      </motion.div>
    </motion.div>
  )
}
