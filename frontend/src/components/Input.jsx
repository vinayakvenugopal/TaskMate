import { forwardRef } from 'react'
import cn from 'classnames'


const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
    {...rest}
    ref={ref}
    className={cn(
      'w-full px-5 py-2 bg-transparent border-2 outline-none border-zinc-600 rounded-xl placeholder:text-zinc-500 focus:border-white',
      className,
    )}
  />
  )
  
  
})

export default Input
