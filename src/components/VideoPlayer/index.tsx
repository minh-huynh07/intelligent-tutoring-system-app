import { useRef, useEffect, useState, FC } from 'react'
import * as dashjs from 'dashjs'
import { Select } from 'antd'

interface DashResolutionPlayerProps {
  mpdUrl: string
}

interface VideoRepresentation {
  id: number
  bandwidth: number
  width: number
  height: number
}

// Extend the dash.js player with the missing methods
// @ts-ignore
interface DashPlayerExtended extends dashjs.MediaPlayerClass {
  getRepresentationsByType(type: 'video'): VideoRepresentation[]
  getCurrentRepresentationForType(type: 'video'): VideoRepresentation | null
  setRepresentationForTypeById(type: 'video', id: number, forceReplace: boolean): void
}

const DashResolutionPlayer: FC<DashResolutionPlayerProps> = ({ mpdUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<DashPlayerExtended | null>(null)
  const [reps, setReps] = useState<VideoRepresentation[]>([])
  const [selectedId, setSelectedId] = useState<number>()

  useEffect(() => {
    if (!videoRef.current) return

    // 1. Create & disable auto‐ABR for video
    const player = dashjs.MediaPlayer().create() as unknown as DashPlayerExtended
    player.updateSettings({
      streaming: {
        abr: { autoSwitchBitrate: { audio: true, video: false } }
      }
    }) // turn off auto-switching for video

    // 2. Initialize playback
    player.initialize(videoRef.current, mpdUrl, true)

    // 3. Once initialized, grab all reps & current one
    const onInit = () => {
      const available = player.getRepresentationsByType('video')
      setReps(available)

      const current = player.getCurrentRepresentationForType('video')
      setSelectedId(current?.id ?? available[0].id)
    }

    player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, onInit)
    playerRef.current = player

    return () => {
      player.off(dashjs.MediaPlayer.events.STREAM_INITIALIZED, onInit)
      player.reset()
      playerRef.current = null
    }
  }, [mpdUrl])

  // 4. User picks a new resolution
  const handleChange = (value: number) => {
    setSelectedId(value)
    playerRef.current?.setRepresentationForTypeById('video', value, true)
  }

  console.log('🚀 ~ reps:', reps)
  console.log('🚀 ~ selectedId:', selectedId)
  return (
    <div>
      {reps.length > 0 && selectedId != null && (
        <Select<number>
          value={selectedId}
          //@ts-ignore
          onChange={handleChange}
          style={{ width: 240, marginTop: 12 }}
          options={reps.map((r) => ({
            label: `${r.width}×${r.height} @ ${Math.round(r.bandwidth / 1000)} kbps`,
            value: r.id
          }))}
        />
      )}
      <video ref={videoRef} controls style={{ width: '100%' }} />
    </div>
  )
}

export default DashResolutionPlayer
