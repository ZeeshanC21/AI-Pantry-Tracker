// withAuth.js
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { CircularProgress } from '@mui/material';

const withAuth = (Component) => {
  return (props) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) {
      return <CircularProgress />;
    }

    if (!user) {
      router.push('/');
      return null;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
