import { GoogleLogin } from '@react-oauth/google';

const Google = () => {
    return (
        <GoogleLogin 
            onSuccess={(res) => {
                console.log(res);
            }}
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