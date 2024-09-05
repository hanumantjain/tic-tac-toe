import React from 'react'

interface BlockProps {
  onClick: () => void
  value: string | null
  isWinningBlock?: boolean
}

const Block: React.FC<BlockProps> = ({ onClick, value, isWinningBlock }) => {
  const blockClass = value ? value.toLowerCase() : ''
  return (
    <div
      className={`block ${blockClass} ${isWinningBlock ? 'winning-block' : ''}`}
      onClick={onClick}
    >
      {value}
    </div>
  )
}

export default Block