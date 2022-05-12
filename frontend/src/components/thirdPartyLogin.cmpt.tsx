import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/authentication.context';

const Google = () => {

    const auth = useAuth();

    return (
        <GoogleLogin 
            onSuccess={(res) => auth.methods.loginUsingGoogle(res.credential as string, "/")}
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