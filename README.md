# Mapa de Locais Favoritos

Aplicacao web interativa para busca, visualizacao e gerenciamento de locais favoritos em um mapa. O usuario pode pesquisar enderecos, clicar em pontos no mapa, salvar locais com nomes personalizados e navegar ate eles a qualquer momento.

Desenvolvido como desafio tecnico para o processo seletivo de Front-end na **IVARE**.

DEMO: https://desafio-ivare-one.vercel.app/

## Funcionalidades

- **Busca de enderecos** com resultados em tempo real via Mapbox Geocoding API
- **Clique no mapa** para selecionar qualquer ponto e ver coordenadas + endereco
- **Favoritar/Desfavoritar** com caixa de dialogo para nomear o local
- **Editar nome** de locais ja salvos
- **Navegar ate favoritos** com animacao flyTo no mapa
- **Persistencia** dos favoritos no localStorage (dados mantidos ao recarregar)
- **Prevencao de duplicatas** via comparacao de coordenadas com tolerancia
- **Design responsivo** mobile-first com layout adaptativo

## Tecnologias

| Tecnologia | Versao | Finalidade |
|------------|--------|------------|
| [React](https://react.dev) | 19 | Biblioteca de UI com componentes funcionais e hooks |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Tipagem estatica com modo strict |
| [Vite](https://vite.dev) | 7 | Build tool com HMR via SWC |
| [Mapbox GL](https://docs.mapbox.com/mapbox-gl-js/) | 3 | Renderizacao do mapa interativo (WebGL) |
| [react-map-gl](https://visgl.github.io/react-map-gl/) | 8 | Wrapper React para Mapbox GL |
| [Mapbox Geocoding API v6](https://docs.mapbox.com/api/search/geocoding-v6/) | v6 | Busca de enderecos (forward) e coordenadas (reverse) |
| [Zustand](https://zustand.docs.pmnd.rs) | 5 | Gerenciamento de estado global |
| [TanStack React Query](https://tanstack.com/query) | 5 | Cache e gerenciamento de requisicoes assincronas |
| [TailwindCSS](https://tailwindcss.com) | 4 | Estilizacao utility-first |
| [React Icons](https://react-icons.github.io/react-icons/) | 5 | Icones (Font Awesome) |
| [Biome](https://biomejs.dev) | 2 | Linter e formatter |

## Requisitos Atendidos

### 3.1 - Mapa Interativo
- Mapa renderizado com **Mapbox GL** via `react-map-gl`
- Posicao inicial centralizada em **Uberlandia-MG**
- Navegacao com zoom, arraste e rotacao

### 3.2 - Busca de Local
- Campo de busca com input e botao
- Resultados listados abaixo do campo
- Ao clicar em um resultado, o mapa centraliza no local com animacao `flyTo`
- Marcador (Marker) e popup exibidos no ponto selecionado

### 3.3 - Selecao no Mapa
- Clique em qualquer ponto do mapa exibe um marcador
- Popup mostra **coordenadas** (latitude/longitude) e **endereco** via reverse geocoding
- Opcao de **favoritar** (com caixa de dialogo para nome) ou **desfavoritar**

### 3.4 - Locais Favoritos
- Cada favorito armazena: **Nome**, **Latitude**, **Longitude** e **Endereco**
- Persistencia via **localStorage** (usando middleware `persist` do Zustand)
- Dados mantidos entre sessoes do navegador

### 3.5 - Lista de Locais Salvos
- Painel lateral exibe todos os locais favoritados
- Cada item mostra nome, endereco e coordenadas
- Botoes de acao: **Navegar** (centraliza mapa), **Editar** (renomear) e **Remover**

### 3.6 - Gerenciamento de Estado
- **Zustand** para estado global:
  - `useFavoriteStore` - favoritos (add, remove, edit) com persist
  - `useMapStore` - posicao do mapa e ponto selecionado

### 3.7 - Requisicoes
- **TanStack React Query** para todas as chamadas a API
  - `useSearch` - busca de enderecos (forward geocoding)
  - `useReverseGeocode` - endereco a partir de coordenadas
  - Cache de 5 minutos (`staleTime`) para evitar requisicoes repetidas
  - Estados de **loading** (Skeleton) e **erro** tratados na UI

### 3.8 - Interface
- **TailwindCSS 4** com design responsivo mobile-first
- Layout adaptativo: coluna no mobile, lado a lado no desktop
- Componente `Skeleton` reutilizavel para estados de carregamento
- Caixa de dialogo nativa (`<dialog>`) para nomear e editar favoritos
- Hierarquia semantica de headings (h1 > h2 > h3)
- Atributos `aria-label` em botoes com icone

## Arquitetura do Projeto

```
src/
├── components/              # Componentes React
│   ├── Layout.tsx           # Layout principal (sidebar + mapa)
│   ├── MapView.tsx          # Mapa interativo com marcadores e popup
│   ├── SearchBar.tsx        # Campo de busca com resultados
│   ├── FavoriteList.tsx     # Lista de locais favoritos
│   ├── FavoriteItem.tsx     # Card individual de favorito
│   ├── NameDialog.tsx       # Dialog reutilizavel para nome do local
│   └── Skeleton.tsx         # Componente de loading skeleton
├── hooks/                   # Custom hooks (React Query)
│   ├── useSearch.ts         # Hook para busca de enderecos
│   └── useReverseGeocode.ts # Hook para geocoding reverso
├── services/                # Camada de servicos (API)
│   └── mapboxGeocoding.ts   # Funcoes de chamada a Mapbox API v6
├── stores/                  # Estado global (Zustand)
│   ├── useFavoriteStore.ts  # Store de favoritos com persistencia
│   └── useMapStore.ts       # Store de estado do mapa
├── types/                   # Tipos TypeScript
│   └── index.ts             # LatLng, Location, FavoriteLocation, MapViewState
├── utils/                   # Funcoes utilitarias
│   └── isSameLocation.ts    # Comparacao de coordenadas com tolerancia
├── App.tsx                  # Componente raiz com QueryClientProvider
├── main.tsx                 # Ponto de entrada da aplicacao
└── index.css                # Estilos globais (Tailwind + ajustes Mapbox)
```

### Fluxo de Dados

```
Mapbox Geocoding API
        |
   services/ (fetch + tipagem)
        |
   hooks/ (React Query: cache, loading, error)
        |
   components/ (UI)
        |
   stores/ (Zustand: estado global + localStorage)
```

### Tipos Principais

```typescript
interface LatLng {
  lat: number
  lng: number
}

interface Location extends LatLng {
  address: string
}

interface FavoriteLocation extends Location {
  id: string        // UUID gerado com crypto.randomUUID()
  createdAt: number  // timestamp
  name: string       // nome personalizado do local
}
```

## Como Executar

### Pre-requisitos

- [Node.js](https://nodejs.org) v18+
- [npm](https://www.npmjs.com) v9+
- Token de acesso do [Mapbox](https://account.mapbox.com/access-tokens/)

### Instalacao

```bash
# 1. Clone o repositorio
git clone https://github.com/vitorhvieira/desafio-ivare
cd desafio-ivare

# 2. Instale as dependencias
npm install

# 3. Configure o token do Mapbox
cp .env.example .env
# Edite o arquivo .env e adicione seu token:
# VITE_MAPBOX_TOKEN=pk.seu_token_aqui

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173`.

### Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR |
| `npm run build` | Verifica tipos TypeScript e gera build de producao |
| `npm run preview` | Visualiza o build de producao localmente |
| `npm run lint` | Executa o Biome (linter + formatter) |

## Decisoes Tecnicas

### Mapbox GL
Mapbox GL oferece renderizacao via WebGL com melhor performance, animacoes nativas (flyTo) e uma API de geocoding propria, eliminando a necessidade de servicos externos.

### Zustand
Zustand oferece uma API mais simples que Context + useReducer, sem necessidade de providers aninhados, com middleware de persistencia integrado e sem re-renders desnecessarios.

### TanStack React Query para requisicoes
Gerenciamento automatico de cache, estados de loading/error, deduplicacao de requisicoes e staleTime configuravel - eliminando a necessidade de useEffect + useState para chamadas assincronas.

### Elemento nativo `<dialog>` para modais
Utiliza o elemento HTML nativo `<dialog>` com `showModal()`, que fornece backdrop, foco trap e acessibilidade sem dependencias externas.

### Biome como linter/formatter
Ferramenta unica que substitui ESLint + Prettier com configuracao minima e execucao mais rapida.

### Comparacao de coordenadas com tolerancia
A funcao `isSameLocation` usa uma tolerancia de 0.0002 graus (~22m) para comparar coordenadas, pois o geocoding forward e reverse podem retornar valores ligeiramente diferentes para o mesmo local.
