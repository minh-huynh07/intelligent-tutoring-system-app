import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spin } from 'antd'
import './styles.scss'
import { useUser } from '@/contexts/UserContext'

const LoginSuccessPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setUser } = useUser()

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const steamid = query.get('steamid')
    const account_id = query.get('account_id')

    if (steamid && account_id) {
      // Gọi OpenDota API để lấy thông tin người dùng
      fetch(`https://api.opendota.com/api/players/${account_id}`)
        .then(res => res.json())
        .then(data => {

          const userData = {
            profile: data.profile,
            rank_tier: data.rank_tier,
            leaderboard_rank: data.leaderboard_rank
          }
          
          localStorage.setItem('user', JSON.stringify(userData))
          setUser(userData)
          navigate('/my-account/stats')
        })
        .catch(err => {
          console.error("OpenDota error", err)
          navigate('/login-failed')
        })
    } else {
      navigate('/authentication') // fallback nếu thiếu query
    }
  }, [location, navigate])

  return (
    <div className='login-success-page__loading'>
      <Spin size='large' tip='Logging in... Please wait.' />
    </div>
  )
}

export default LoginSuccessPage
