
# 🎵 Lyra — Donde las notas encuentran tu mood

Lyra es una aplicación ligera, visual y minimalista desarrollada con **React Native y Expo** que conecta tu estado emocional con la música que escuchas.

Agrega canciones, clasifícalas por *mood* (estado de ánimo) y construye tu propio mapa sonoro personal.

Está diseñada como una experiencia intuitiva y estética: una mezcla entre exploración emocional, organización musical y una interfaz centrada en la simplicidad.

-----

## 🌟 Características Principales

  * ✨ **Añadir canciones**: Busca por título o artista y selecciona la canción desde la vista previa.
  * 🎭 **Clasificación por Mood**: Elige entre *vibes* como *Relax, Focus, Energy* o cualquier *mood* personalizado para clasificar tu librería.
  * 💾 **Guardado Automático**: Toda tu librería se almacena de forma local y persistente con `AsyncStorage`.
  * 🎚 **Lista Dinámica**: Canciones ordenadas y filtrables instantáneamente según tu estado de ánimo.
  * 🔍 **Integración con la API de Apple Music (iTunes Search API)**:
      * Búsqueda de canciones,
      * Carátulas (artwork),
      * Metadatos,
      * **Previews de audio** (fragmentos de 30s).
  * 🎧 **Reproducción de audio nativa**: escucha un fragmento de cada canción usando `expo-av`

Lyra es ideal para explorar cómo suenan tus emociones a través de una interfaz simple, clara y personal.

-----

## ⚙️ Stack Tecnológico

El proyecto está construido usando el ecosistema de **React Native** con **Expo** para garantizar una ejecución fluida en iOS y Android.

| Categoría | Tecnología/Librería | Propósito |
| :--- | :--- | :--- |
| **Framework Base** | **React Native** | Desarrollo móvil multiplataforma. |
| **Entorno** | **Expo** (CLI) | Facilitar el desarrollo, *build* y testeo. |
| **Manejo de Audio** | `expo-av` | Reproducción de los fragmentos de audio de forma moderna y optimizada. |
| **Almacenamiento Local** | `@react-native-async-storage/async-storage` | Persistencia de la librería de canciones y *moods*. |
| **Íconos** | `react-native-vector-icons/Feather` | Íconos de *Play, Pause* y *Trash*. |
| **Filtros UI** | `@react-native-picker/picker` | Componente para selección de *moods* en el formulario. |
| **API Externa** | **iTunes Search API** | Búsqueda de metadatos y URLs de canciones. |

-----

## 🚀 Instalación y Ejecución

Sigue estos pasos para clonar el repositorio y ejecutar la aplicación en tu entorno local.

### Prerrequisitos

  * Node.js (LTS recomendado)
  * npm o Yarn
  * La CLI de Expo (`npm install -g expo-cli`)
  * Un dispositivo o emulador/simulador (iOS/Android) con la aplicación Expo Go instalada.

### Pasos

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Aniger31/Lyra.git
    cd lyra
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    # o si usas yarn:
    # yarn install
    ```

3.  **Configuración de Red (Crítica para iOS/Android):**
    Dado que las URLs de vista previa de Apple Music son HTTP, es necesario permitir el tráfico de texto sin cifrar. Asegúrate de que tu archivo **`app.json`** contenga:

    ```json
    {
      "expo": {
        "ios": {
          "infoPlist": {
            "NSAppTransportSecurity": {
              "NSAllowsArbitraryLoads": true
            }
          }
        },
        "android": {
          "usesCleartextTraffic": true
        }
      }
    }
    ```

4.  **Iniciar la aplicación:**

    ```bash
    npx expo start
    ```

    Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil o abre la aplicación en un simulador.

-----

## 📂 Estructura del Proyecto

La aplicación sigue una estructura clara con énfasis en la separación de componentes y *hooks* de lógica:

```
├── assets/
├── components/                 # Componentes reutilizables de UI y lógica:
│   ├── FilterBar.jsx           # Barra horizontal de filtros por mood.
│   ├── SongCard.jsx            # Tarjeta individual de canción con lógica de Play/Pause.
│   ├── SongForm.jsx            # Formulario para buscar en la API de iTunes y añadir canciones.
│   └── SongList.jsx            # Componente que renderiza la FlatList de canciones filtradas.
├── useAsyncStorage.js          # Custom Hook para manejo de persistencia con AsyncStorage.
├── moods.js                    # Arreglo de moods predefinidos (Relax, Energy, etc.).
├── App.js                      # Componente raíz con el manejo de estados principales y la función CRUD.
└── app.json                    # Archivo de configuración de Expo (donde se configura la red).
```

-----

## 📱 Vista Previa (Screenshots)

> *Agrega aquí tus imágenes/GIFs de la aplicación en acción.*

-----

## 🧑‍💻 Autor

  * **Regina Hernández Rodríguez (Aniger31)**

