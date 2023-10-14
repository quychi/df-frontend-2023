export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-[calc(100%-50px-80px)] py-5 px-2.5 bg-gray-cultured">
      {children}
    </main>
  )
}
