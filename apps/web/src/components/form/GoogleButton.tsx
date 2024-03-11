import { Button } from '@/components/ui/button';
import { useSessionStore } from '@/utils/SessionProvider';
import { FaGoogle } from 'react-icons/fa6';

export default function GoogleButton() {
  const { socialAuth } = useSessionStore((state) => state);

  const googleAuth = () => {
    socialAuth(true);
    window.open(`${process.env.NEXT_PUBLIC_BASE_API_URL}auth/google`, '_self');
  };

  return (
    <Button onClick={googleAuth} variant="outline" className="py-0 gap-6 w-full font-medium text-gray-800">
      <FaGoogle size={20} />
      Continue with Google
    </Button>
  );
}
