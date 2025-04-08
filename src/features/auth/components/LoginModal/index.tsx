import { Button } from 'antd'
import { FaSteam } from 'react-icons/fa'

import RegisterForm from '../LoginForm'
import './styles.scss'
import AppLogo from '@/assets/Logo.png'
import LoginModalThumbnailImg from '@/assets/login-thumbnail.jpeg'

export default function LoginModal() {
  return (
    <div className='login-modal'>
      <div className='login-modal__thumbnail'>
        <img src={LoginModalThumbnailImg} alt='login modal thumbnail' />
      </div>

      <div className='login-modal__login-section'>
        <img src={AppLogo} alt='User Avatar' className='login-section__logo' />
        <p className='login-section__description'>
          Join us and get more benefits. We promise to keep your data safely.
        </p>
        <Button icon={<FaSteam size={20} />} size='large' block className='login-section__steam-login-btn'>
          Sign in with Steam
        </Button>
        <p className='login-section__login-seperator'>or you can</p>
        <RegisterForm />
        <p className='login-section__already-have-account'>
          Already have an Account?
          <a href='' className='login_section__sign-up-link'>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  )
}
