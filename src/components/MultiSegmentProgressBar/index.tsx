import React from 'react'
import './styles.scss'

type PercentSegment = {
  percent: number
  color: 'string'
}

type MultiSegmentProgressProps = {
  percentages: PercentSegment[]
}

const MultiSegmentProgress: React.FC<MultiSegmentProgressProps> = (props) => {
  const { percentages } = props
  return (
    <div className='multi-segment-progress'>
      {percentages.map((role) => (
        <div
          key={role.name}
          style={{
            width: `${role.percent}%`,
            backgroundColor: role.color
          }}
          className='multi-segment-progress__percent'
        ></div>
      ))}
    </div>
  )
}

export default MultiSegmentProgress
