import Counter from "./components/Counter";
import SlowComponent from "./components/SlowComponent";
import { Suspense } from "react";

export default function Page() {
  const now = new Date().toLocaleTimeString();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Dashboard</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <SlowComponent />
        </Suspense>
      </div>

      <p>Current server time: {now}</p>

      <div>
        <h1>Counter</h1>
        <Counter />
      </div>
    </div>
  );
}
