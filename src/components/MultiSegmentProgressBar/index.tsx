import React from 'react'
import './styles.scss'

type PercentSegment = {
  percent: number
  color: string
}

type MultiSegmentProgressProps = {
  percentages: PercentSegment[]
}

const MultiSegmentProgress: React.FC<MultiSegmentProgressProps> = (props) => {
  const { percentages } = props
  return (
    <div className='multi-segment-progress'>
      {percentages.map((p, index) => (
        <div
          key={index}
          style={{
            width: `${p.percent}%`,
            backgroundColor: p.color
          }}
          className='multi-segment-progress__percent'
        ></div>
      ))}
    </div>
  )
}

export default MultiSegmentProgress
