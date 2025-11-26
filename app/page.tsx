export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white">MenuPro</h1>
            <p className="text-xl text-slate-300">Restaurant Menu & Order Management System</p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-8 max-w-md space-y-6 border border-slate-700">
            <p className="text-slate-200">Coming Soon</p>
            <p className="text-sm text-slate-400">The MenuPro dashboard is being prepared. Features include:</p>
            <ul className="text-left text-slate-300 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Menu Management</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Order Tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Real-time Analytics</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Multi-tenant Support</span>
              </li>
            </ul>
          </div>
          
          <div className="text-sm text-slate-400">
            <p>Built with Next.js + Supabase</p>
            <p>Scalable for thousands of restaurants</p>
          </div>
        </div>
      </div>
    </main>
  )
}
