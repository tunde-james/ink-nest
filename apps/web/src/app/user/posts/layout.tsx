interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

function PostsLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

export default PostsLayout;
