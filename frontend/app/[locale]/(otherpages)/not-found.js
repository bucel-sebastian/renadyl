import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative block pt-[90px] text-lg min-h-screen h-full checkout-background">
      <div>
        <h1>Not found – 404!</h1>
        <div>
          <Link href="/">Go back to Home</Link>
        </div>
      </div>
    </main>
  );
}
