import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col bg-muted">
      <div className="pt-10 text-center">
        <Link href="/" className="font-soria text-xl text-foreground">
          appointly
        </Link>
      </div>

      <main className="flex flex-1 items-start justify-center px-4 pt-12 pb-16">
        {children}
      </main>

      <footer className="pb-8 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Appointly
      </footer>
    </div>
  );
}
