export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">MenuPro</h1>
        <p className="text-2xl text-gray-600 mb-8">Sistema de Menu y Pedidos para Restaurantes</p>
        <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
          MenuPro es una aplicacion full-stack multi-tenant para gestionar menus, pedidos y pagos de restaurantes.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a href="/menu" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-orange-600 mb-2">Menu Publico</h2>
            <p className="text-gray-600">Ver menu de categorias e items</p>
          </a>
          
          <a href="/dashboard/categories" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-orange-600 mb-2">Administracion</h2>
            <p className="text-gray-600">Gestionar categorias y items</p>
          </a>
          
          <a href="https://github.com/Redmulfi/menupro-nextjs" className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-orange-600 mb-2">GitHub</h2>
            <p className="text-gray-600">Ver codigo fuente</p>
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Caracteristicas</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Multi-tenant: Multiples instancias independientes</li>
            <li>✅ Full-stack: Next.js + Supabase + Tailwind CSS</li>
            <li>✅ API REST completa: Categories, Items, Orders, Payments, Tables</li>
            <li>✅ Paginas publicas y dashboard privado</li>
            <li>✅ Context Provider para gestion de tenant_id</li>
            <li>✅ Auto-deploy desde GitHub a Vercel</li>
            <li>✅ Production-ready: Lista para multiples clientes</li>
          </ul>
        </div>

        <div className="mt-12 text-gray-600 text-sm">
          <p>MenuPro v1.0 | Desarrollado con Next.js 14+, Supabase y Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
}
