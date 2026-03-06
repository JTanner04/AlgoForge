type Props = { bioFromUser: string };

export default function UnsafeRender({ bioFromUser }: Props) {
  return <div dangerouslySetInnerHTML={{ __html: bioFromUser }} />;
}

