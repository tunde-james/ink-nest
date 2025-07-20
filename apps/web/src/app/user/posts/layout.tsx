interface Props {
  children: React.ReactNode;
}

function PostLayout({ children }: Props) {
  return <div className="pt-24">{children}</div>;
}

export default PostLayout;
