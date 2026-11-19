
export const dynamic = "force-static"; 

export default function AboutPage() {
    const now = new Date().toLocaleTimeString();
  return (
    <div>
      <h1>This page is statically generated.</h1>
      <p>Current server time: {now}</p>
    </div>
  );
}
