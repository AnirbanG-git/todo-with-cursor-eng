export default function Footer() {
  return (
    <footer className="bg-muted py-4 border-t">
      <div className="container max-w-2xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Todo List App</p>
        <p>Built with React and Next.js</p>
      </div>
    </footer>
  )
}

