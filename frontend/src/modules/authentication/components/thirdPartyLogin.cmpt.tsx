import { GoogleLogin } from '@react-oauth/google';
import { FC } from 'react';
import { useAuth } from '../../../contexts/authentication.context';

const Google: FC = () => {
    const auth = useAuth();

    return (
        <GoogleLogin
            size='large'
            width='350px'
            onSuccess={(res) => auth.loginUsingGoogle(res.credential as string, () => {
                window.location.href='/p';
            })}
            onError={() => {
                console.log('Failed')
            }}
        />
    );
}

const ThirdPartyLogin: FC = () => {

  return (
    <>
        <Google />
    </>
  )
}

export default ThirdPartyLogin;