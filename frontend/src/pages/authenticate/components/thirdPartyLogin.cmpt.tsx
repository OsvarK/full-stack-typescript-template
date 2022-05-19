import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../../contexts/authentication.context';

const Google = () => {
    const auth = useAuth();

    return (
        <GoogleLogin
            size='large'
            width='350px'
            onSuccess={(res) => auth.methods.loginUsingGoogle(res.credential as string, () => {
                window.location.href='/p';
            })}
            onError={() => {
                console.log('Failed')
            }}
        />
    );
}

const ThirdPartyLogin = () => {

  return (
    <>
        <Google />
    </>
  )
}

export default ThirdPartyLogin;