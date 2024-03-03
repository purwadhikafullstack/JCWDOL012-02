import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarProfileProps {
  url: string;
  name: string;
}

export default function AvatarProfile(props: AvatarProfileProps) {
  const { url, name } = props;
  const initialName = name?.charAt(0).toUpperCase();

  return (
    <Avatar className="border-2 border-gray-400">
      <AvatarImage src={url} alt={name} />
      <AvatarFallback>{initialName}</AvatarFallback>
    </Avatar>
  );
}
