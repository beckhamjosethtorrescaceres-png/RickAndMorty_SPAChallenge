# Rick and Morty SPA

Una **Single Page Application** construida con JavaScript Vanilla que consume la [API pública de Rick and Morty](https://rickandmortyapi.com/), implementando routing del lado del cliente, arquitectura modular y componentes reutilizables — sin ningún framework.

---

## Demo rápido

```bash
git clone https://github.com/tu-usuario/RickAndMorty_SPAChallenge.git
cd RickAndMorty_SPAChallenge
cp .env.example .env
npm install
npm run dev
```

---

## Requisitos previos

- Node.js `>= 18.0.0`
- npm

---

## Instalación

**1. Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/RickAndMorty_SPAChallenge.git
cd RickAndMorty_SPAChallenge
```

**2. Crear el archivo de entorno**
```bash
# .env
VITE_API_URL=https://rickandmortyapi.com/api
VITE_CONTENT_TYPE=application/json
VITE_TIME_OUT=5000
```

**3. Instalar dependencias**
```bash
npm install
```

**4. Ejecutar en desarrollo**
```bash
npm run dev
```

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build de producción |

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Listado de personajes |
| `/episode` | Listado de episodios |
| `/location` | Listado de locaciones |
| `/contacts` | Formulario de contacto |
| `/about` | Quiénes somos |

---

## Arquitectura

```
RickAndMorty_SPAChallenge/
│
├── index.html                  # Entry point HTML
├── package.json
├── .env                        # Variables de entorno (no commitear)
│
└── assets/
    ├── css/
    │   └── styles.css
    │
    └── js/
        ├── app.js              # Inicialización y navegación SPA
        ├── router.js           # Router client-side
        │
        ├── services/
        │   ├── api.js          # Llamadas a la API de Rick and Morty
        │   └── httpClient.js   # Instancia Axios configurada
        │
        ├── components/
        │   ├── navbar.js       # Barra de navegación
        │   ├── characterCard.js
        │   ├── episodeCard.js
        │   └── locationCard.js
        │
        ├── pages/
        │   ├── home.js
        │   ├── episode.js
        │   ├── location.js
        │   ├── contacts.js
        │   └── about.js
        │
        ├── views/              # Templates HTML parciales
        │   ├── home.html
        │   ├── episode.html
        │   ├── location.html
        │   ├── contacts.html
        │   └── about.html
        │
        └── utils/
            └── helpers.js      # loadHTML y utilidades generales
```

---

## API consumida

Todos los datos provienen de la [Rick and Morty API](https://rickandmortyapi.com/) (REST, pública, sin autenticación).

| Endpoint | Uso |
|----------|-----|
| `GET /character` | Personajes (Home) |
| `GET /episode` | Episodios |
| `GET /location` | Locaciones |

---

## Tecnologías

| Tecnología | Versión | Rol |
|------------|---------|-----|
| JavaScript ES6+ | — | Lenguaje principal |
| Vite | ^6.3.5 | Bundler / dev server |
| Axios | ^1.9.0 | HTTP client |
| HTML5 / CSS3 | — | Estructura y estilos |

---

## Contribuir

1. Hacer fork del repositorio
2. Crear una rama: `git checkout -b feature/mi-feature`
3. Commitear los cambios: `git commit -m 'feat: agrego mi feature'`
4. Push a la rama: `git push origin feature/mi-feature`
5. Abrir un Pull Request

---

## Autor

**Devis M**

---

## Licencia

Este proyecto es de uso privado.
