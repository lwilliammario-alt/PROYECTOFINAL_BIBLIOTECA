# BibliotecaSystem

BibliotecaSystem es una solución de software moderna y robusta diseñada para la gestión eficiente del catálogo de libros de una biblioteca. El sistema implementa una arquitectura desacoplada y limpia que separa completamente la interfaz de usuario de la lógica de negocio y la persistencia de datos.

---

## 🚀 Características Principales

- **Registro de Libros**: Interfaz intuitiva y adaptativa para agregar nuevos títulos al catálogo de la biblioteca.
- **Validaciones Avanzadas en Dos Capas**:
  - **Frontend (React)**: Validación en tiempo real campo por campo (obligatoriedad, longitud y rangos de datos) para ofrecer una experiencia de usuario fluida e interactiva.
  - **Backend (.NET Core)**: Validación formal mediante anotaciones de datos (`DataAnnotations`) y verificación de estado de modelo (`ModelState.IsValid`) que actúa como barrera definitiva para la integridad de los datos.
- **Micro-animaciones y UX Premium**: Estilos visuales pulidos con retroalimentación inmediata, bordes interactivos de error y animaciones de atención (`shakeIn`).
- **Arquitectura Limpia (Clean Architecture)**: Estricta separación de responsabilidades para garantizar la escalabilidad y mantenibilidad a largo plazo del código fuente.

---

## 🛠️ Stack Tecnológico

### Backend
- **Core**: ASP.NET Core 8.0 (C#)
- **Persistencia**: PostgreSQL con Entity Framework Core (EF Core)
- **API**: Controladores RESTful estructurados y soporte para Swagger / OpenAPI

### Frontend
- **Framework**: React.js (Vite)
- **CSS**: Vanilla CSS con variables de diseño personalizadas y soporte de modo oscuro adaptativo
- **Comunicación**: Consumo centralizado de API mediante servicios asíncronos (`fetch`)

---

## 📁 Estructura del Proyecto

El proyecto está organizado de forma lógica en dos grandes carpetas:

```
├── backend/                     # Solución del Backend (.NET Core)
│   ├── BibliotecaSystem.Domain       # Entidades y lógica del dominio puro
│   ├── BibliotecaSystem.Application  # Servicios del sistema, interfaces y DTOs
│   ├── BibliotecaSystem.Infrastructure # Persistencia de datos (EF Core, Repositorios)
│   └── BibliotecaSystem.API          # Controladores HTTP y punto de entrada de la API
│
└── frontend/                    # Aplicación del Frontend (React + Vite)
    ├── public/                       # Activos públicos del cliente
    └── src/                          # Código fuente de React
        ├── components/                   # Componentes visuales reutilizables (InputField, FormMessage)
        ├── pages/                        # Páginas principales del sistema (CreateLibro)
        └── services/                     # Servicios para el consumo de API (libroService)
```

---

## ⚙️ Instrucciones de Ejecución

### 1. Requisitos Previos
- [.NET SDK 8.0+](https://dotnet.microsoft.com/download/dotnet/8.0) instalado.
- [Node.js 18+](https://nodejs.org/) instalado.
- Servidor [PostgreSQL](https://www.postgresql.org/) en ejecución.

### 2. Configurar y Ejecutar el Backend
1. Navega al directorio del proyecto API:
   ```bash
   cd backend/BibliotecaSystem.API
   ```
2. Configura tu cadena de conexión a la base de datos PostgreSQL en `appsettings.json`.
3. Ejecuta la aplicación:
   ```bash
   dotnet run
   ```
4. Accede al panel interactivo de Swagger en: `http://localhost:5153/swagger` o `http://localhost:5240/swagger` (según tu puerto asignado).

### 3. Ejecutar el Frontend
1. Abre otra terminal y navega al directorio del cliente:
   ```bash
   cd frontend
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```
4. Abre tu navegador en la dirección indicada (usualmente `http://localhost:5173/`).

---

## 🛡️ Seguridad e Integridad de Datos

Para proteger el catálogo contra información incompleta o corrupta, el sistema implementa reglas estrictas:
- **Títulos**: Obligatorios, longitud entre 3 y 150 caracteres.
- **Autores**: Obligatorios, longitud entre 5 y 100 caracteres.
- **ISBN**: Código identificador obligatorio, longitud entre 10 y 13 dígitos.
- **Año de publicación**: Obligatorio, rango válido de publicación comprendido entre 1450 y 2100.