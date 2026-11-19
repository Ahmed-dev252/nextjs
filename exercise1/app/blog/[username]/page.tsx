interface BlogDetailProps {
  params: Promise<{
    username: string;
  }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const { username } = await params;

  return (
    <div>blog detail page for {username}</div>
  );
};

export default BlogDetail;
