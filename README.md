# MenuPro - Sistema de Menú y Pedidos Multiusuario

## Descripción
MenuPro es una aplicación web moderna construida con Next.js 14+, Supabase y Tailwind CSS para gestionar menús de restaurantes, pedidos y mesas de forma eficiente.

## 🚀 Características
- ✅ Dashboard completo para gestionar el restaurante
- ✅ Gestión de categorías y items del menú
- ✅ Sistema de órdenes/pedidos en tiempo real
- ✅ Gestión de mesas
- ✅ Menú público accesible por código QR
- ✅ Arquitectura multitusuario escalable
- ✅ Base de datos Supabase con aislamiento por tenant
- ✅ Interfaz responsiva con Tailwind CSS

## 📋 Requisitos Previos
- Node.js 18+
- npm o yarn
- Cuenta en Supabase (https://supabase.com)
- Cuenta en Vercel (https://vercel.com)

## 🔧 Instalación Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/Redmulfi/menupro-nextjs.git
cd menupro-nextjs

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.local.example .env.local

# 4. Agregar tus credenciales de Supabase en .env.local
NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_aqui

# 5. Ejecutar en desarrollo
npm run dev

# 6. Abrir en navegador
# http://localhost:3000
```

## 🌐 Deployment en Vercel

### Opción 1: Deployment Automático (Recomendado)
1. Ir a https://vercel.com/new
2. Conectar tu repositorio GitHub
3. Agregar variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clickear "Deploy"

### Opción 2: Deployment Manual
```bash
npm install -g vercel
vercel
```

## 📁 Estructura del Proyecto

```
app/
├── layout.tsx           # Layout raíz
├── page.tsx             # Página de inicio
├── globals.css          # Estilos globales
├── dashboard/
│   ├── layout.tsx       # Layout del dashboard
│   └── page.tsx         # Dashboard principal
├── api/                 # Rutas de API (próximamente)
└── menu/                # Menú público (próximamente)

lib/
├── supabase.ts          # Cliente de Supabase
└── [utilities]          # Funciones auxiliares

public/                 # Archivos estáticos
package.json            # Dependencias
```

## 🗄️ Base de Datos - Tablas Creadas en Supabase

1. **menu_categories** - Categorías del menú
2. **menu_items** - Items/platos del menú
3. **menu_tables** - Mesas del restaurante
4. **orders** - Órdenes/pedidos
5. **guest_sessions** - Sesiones de clientes
6. **payments** - Registros de pagos
7. **webhook_endpoints** - Configuración de webhooks
8. **capture_config** - Configuración de captura de pagos

## 🎯 Pasos para Comenzar a Usar

### 1. Acceder al Dashboard
- Ir a `https://tu-app.vercel.app/dashboard`
- El dashboard está completamente listo para usar

### 2. Crear Primeras Categorías
- Ir a "Categorías" en el menú lateral
- Hacer click en "Agregar Categoría"
- Rellenar nombre y descripción
- Guardar

### 3. Agregar Items del Menú
- Ir a "Items" en el menú lateral
- Crear items con foto, precio y descripción
- Asignar a una categoría

### 4. Configurar Mesas
- Ir a "Mesas" en el menú lateral
- Crear las mesas de tu restaurante
- Generar códigos QR para cada mesa

### 5. Publicar Menú Público
- El menú público está disponible en `/menu`
- Cada mesa tiene un código QR único
- Los clientes pueden ver el menú y hacer pedidos

## 🔐 Seguridad y Row Level Security (RLS)

Todas las tablas en Supabase tienen RLS habilitado:
- Cada restaurante solo ve sus propios datos
- Los clientes solo ven el menú de su mesa
- Datos completamente aislados por tenant_id

## 📞 Soporte y Próximas Características

- Sistema de pagos integrado
- Reportes y analytics
- Integraciones con sistemas de delivery
- App móvil nativa

## 📝 Licencia
Proyecto privado - Uso comercial permitido

## 🤝 Contacto
Para preguntas o soporte, contactar a: support@menupro.app
