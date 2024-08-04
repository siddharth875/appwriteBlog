import React from 'react'

function Button({
    children,
    type = 'button',
    textColour = 'text-white',
    bgColor = 'bg-blue-600',
    className = '',
    ...props
}) {
  return (
    <button
    type={type}
    className={`${textColour} ${bgColor} ${className} px-4 py-2 rounded-lg`}
    {...props}
    >
        {children}
    </button>
  )
}

export default Button