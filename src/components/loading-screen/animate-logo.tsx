import { m } from 'framer-motion'
import { Logo } from './logo'

type AnimateLogo1Props = {
  logo?: JSX.Element
  className?: string
}

export function AnimateLogo1({
  logo,
  className = '',
  ...other
}: AnimateLogo1Props) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-[120px] h-[120px] ${className}`}
      {...other}
    >
      <m.div
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="inline-flex"
      >
        {logo ?? <Logo disableLink width={64} height={64} />}
      </m.div>

      <m.div
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        className="absolute w-[calc(100%-20px)] h-[calc(100%-20px)] border border-primary animate-pulse"
      />

      <m.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        className="absolute w-full h-full border-8 border-primary animate-ping"
      />
    </div>
  )
}

type AnimateLogo2Props = {
  logo?: JSX.Element
  className?: string
}

export function AnimateLogo2({
  logo,
  className = '',
  ...other
}: AnimateLogo2Props) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-[96px] h-[96px] ${className}`}
      {...other}
    >
      {logo ?? <Logo className="z-9" />}

      <m.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: 'linear', repeat: Infinity }}
        className="absolute w-full h-full opacity-16 rounded-full"
        style={{
          background:
            'linear-gradient(135deg, transparent 50%, var(--color-primary) 100%)',
        }}
      />
    </div>
  )
}
