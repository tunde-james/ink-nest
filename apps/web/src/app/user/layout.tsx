interface Props {
  children: React.ReactNode;
}

function PostLayout({ children }: Props) {
  return (
    <div className="pt-24 flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default PostLayout;
