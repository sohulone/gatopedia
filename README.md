# 🐱 Gatopedia - Cat Breeds Explorer

Una aplicación web moderna desarrollada en Angular que permite explorar y descubrir información detallada sobre diferentes razas de gatos. Utiliza The Cat API para obtener datos e imágenes de alta calidad.

## ✨ Características

- 🔐 **Sistema de autenticación** con registro y login
- 🏠 **Página de inicio atractiva** con descripción del sitio y navegación intuitiva
- 🔍 **Búsqueda avanzada** de razas por nombre, origen o temperamento
- 📱 **Diseño responsive** optimizado para dispositivos móviles y desktop
- 🎨 **Interfaz moderna** con Tailwind CSS y efectos glassmorphism
- 🖼️ **Carrusel de imágenes** con 10 fotos por raza
- 📊 **Información detallada** de cada raza (origen, temperamento, peso, esperanza de vida)
- 💾 **Caché inteligente** para optimizar llamadas a la API
- 🎭 **Animaciones suaves** y transiciones fluidas
- 🔖 **Historial de búsquedas** guardado en localStorage

## 🛠️ Tecnologías Utilizadas

- **Angular 21** - Framework principal
- **TypeScript 5.9** - Lenguaje de programación
- **Tailwind CSS 4** - Estilos y diseño
- **RxJS 7.8** - Programación reactiva
- **Embla Carousel** - Carrusel de imágenes
- **Vitest** - Testing unitario
- **The Cat API** - API de datos de razas de gatos

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm 10.9.3 o superior

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/sohulone/gatopedia.git
cd gatopedia
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea los archivos de configuración a partir de los ejemplos:

```bash
# Para desarrollo
cp src/environments/environment.development.example.ts src/environments/environment.development.ts

# Para producción
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edita los archivos creados y configura:

**The Cat API Key** - Obtén tu key en [The Cat API](https://thecatapi.com/):

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5273/api', // URL de tu backend
  catApi: {
    url: 'https://api.thecatapi.com/v1',
    key: 'TU_API_KEY_AQUI' // Obtén tu key en https://thecatapi.com/signup
  }
};
```

4. **Configurar el Backend**

La aplicación requiere un backend que implemente los siguientes endpoints de autenticación:

- `POST /api/users/register` - Registro de nuevos usuarios
- `POST /api/users/login` - Autenticación de usuarios

Por defecto, la aplicación espera que el backend esté en `http://localhost:5273/api`

## 🔐 API de Autenticación

### POST /api/users/register

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "favoriteBreed": "Persian",
  "avatar": "😺",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "favoriteBreed": "Persian",
    "avatar": "😺"
  }
}
```

### POST /api/users/login

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "favoriteBreed": "Persian",
    "avatar": "😺"
  }
}
```

## 💻 Uso

### Servidor de Desarrollo

```bash
npm start
# o
ng serve
```

Abre tu navegador en `http://localhost:4200/`

### Build de Producción

```bash
npm run build
```

Los archivos compilados estarán en el directorio `dist/`

### Ejecutar Tests

```bash
npm test
```

### Watch Mode para Desarrollo

```bash
npm run watch
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── carousel/        # Carrusel de imágenes
│   │   ├── navigation/      # Barra de navegación
│   │   ├── search-modal/    # Modal de búsqueda
│   │   ├── selector/        # Selector dropdown
│   │   └── user-menu/       # Menú de usuario
│   ├── guards/              # Guards de autenticación
│   │   └── auth.guard.ts    # Guard para rutas protegidas
│   ├── models/              # Modelos de datos
│   │   └── user.ts          # Modelo de usuario
│   ├── services/            # Servicios de la aplicación
│   │   ├── auth.ts          # Servicio de autenticación
│   │   └── cat-api.ts       # Servicio de integración con The Cat API
│   ├── views/               # Vistas principales
│   │   ├── home/            # Página de inicio
│   │   ├── login/           # Vista de login
│   │   ├── register/        # Vista de registro
│   │   └── breeds/          # Vista de razas (protegida)
│   │       └── components/  # Componentes específicos de breeds
│   │           ├── breed-selector/
│   │           ├── breed-images/
│   │           └── breed-info/
│   ├── app.config.ts        # Configuración de la app
│   ├── app.routes.ts        # Rutas de la aplicación
│   └── app.ts               # Componente raíz
├── environments/            # Configuraciones por entorno
└── styles.css              # Estilos globales
```

## 🎯 Funcionalidades Principales

### Autenticación
- Registro de nuevos usuarios con avatar personalizado
- Login con email y contraseña
- Protección de rutas con guards
- Gestión de sesión con tokens JWT
- Logout y limpieza de sesión

### Página de Inicio
- Bienvenida con descripción del sitio
- Tarjetas informativas sobre las características
- Botón de acceso directo a la vista de razas

### Vista de Razas
- Selector de razas con todas las opciones disponibles
- Carrusel con 10 imágenes de alta calidad
- Información detallada con iconos temáticos
- Diseño en grid responsive

### Búsqueda
- Modal de búsqueda accesible desde cualquier vista
- Búsqueda en tiempo real por nombre, origen o temperamento
- Historial de búsquedas recientes
- Miniaturas de cada raza en los resultados

## ⚡ Optimizaciones

- **Caché de razas**: El listado de razas se carga una sola vez por sesión
- **Lazy loading**: Carga diferida de imágenes
- **Imágenes optimizadas**: Uso de la imagen del listado para búsquedas
- **Memoización**: Uso de signals para gestión eficiente del estado

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y fue desarrollado como prueba técnica.

## 👤 Autor

Desarrollado por [sohulone](https://github.com/sohulone)

## 🔗 Enlaces

- [The Cat API Documentation](https://developers.thecatapi.com/)
- [Angular Documentation](https://angular.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

⭐ Si te gustó este proyecto, considera darle una estrella en GitHub
