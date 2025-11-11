# Library React - Bootstrap Italia Components

Una libreria completa di componenti React basati su Bootstrap Italia, con sistema di gestione API integrato e componenti dinamici.

## Descrizione

Questo progetto fornisce una collezione riutilizzabile di componenti React per la creazione di applicazioni web moderne, seguendo le linee guida del design system italiano Bootstrap Italia.

### Caratteristiche principali

- **Componenti UI Bootstrap Italia**: Accordion, Alert, Badge, Button, Card, Form, Header, Footer, Hero, Modal, Tabs, e altro
- **Componenti dinamici con API**: Gestione automatica di chiamate API, loading states e error handling
- **Sistema di servizi**: Architettura service-based per interazioni con backend
- **Hooks personalizzati**: `useApi` e `useFetch` per gestione chiamate asincrone
- **Context API**: Provider globale per condivisione servizi
- **Page Builder Concept**: Sistema proof-of-concept per costruzione pagine dinamiche

## Struttura del progetto

```
library-react/
├── public/
│   ├── bootstrap-italia/        # Asset statici Bootstrap Italia (CSS, JS, fonts)
│   └── index.html               # Template HTML principale
├── src/
│   ├── components/              # Componenti UI Bootstrap Italia
│   │   ├── accordion.jsx
│   │   ├── alert.jsx
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── header.jsx
│   │   ├── footer.jsx
│   │   ├── modal.jsx
│   │   └── exampleTemplate.jsx  # Template di esempio completo
│   ├── componentsAPI/           # Componenti con integrazione API
│   │   ├── components/          # DynamicCard, DynamicForm, DynamicTable, DynamicDashboard
│   │   ├── services/            # ApiService, UserService, ProductService
│   │   ├── hooks/               # useApi, useFetch
│   │   ├── context/             # ApiContext, ApiProvider
│   │   └── README_API.md        # Documentazione dettagliata API
│   ├── pages/
│   │   └── PageBuilderConcept.jsx  # Proof of concept page builder
│   ├── App.js                   # Componente principale
│   └── index.js                 # Entry point
└── package.json
```

## Installazione

1. **Clona il repository**
   ```bash
   git clone <repository-url>
   cd library-react
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente** (opzionale)
   ```bash
   cp .env.example .env
   # Modifica .env con le tue configurazioni
   ```

## Comandi disponibili

### Sviluppo

```bash
npm start
```
Avvia l'app in modalità sviluppo su [http://localhost:3000](http://localhost:3000).
La pagina si ricarica automaticamente quando modifichi il codice.

### Build di produzione

```bash
npm run build
```
Crea una build ottimizzata per la produzione nella cartella `build/`.

### Test

```bash
npm test
```
Avvia il test runner in modalità interattiva.

### Linting

```bash
npm run lint        # Verifica il codice
npm run lint:fix    # Corregge automaticamente i problemi
```

## Utilizzo dei componenti

### Componenti UI Bootstrap Italia

Esempio di utilizzo dei componenti base:

```jsx
import { Button, Card, Alert, Modal } from './components';

function MyComponent() {
  return (
    <div>
      <Alert message="Benvenuto!" type="success" />

      <Card
        title="Titolo Card"
        text="Contenuto della card"
        category="Categoria"
        readMoreLink="/dettaglio"
      />

      <Button
        text="Clicca qui"
        variant="primary"
        icon="it-check"
        onClick={() => console.log('clicked')}
      />
    </div>
  );
}
```

Per un esempio completo, consulta `src/components/exampleTemplate.jsx`.

### Componenti con API

I componenti API gestiscono automaticamente chiamate HTTP, loading states e errori:

```jsx
import { DynamicCard, CardList, DynamicForm } from './componentsAPI';

// Carica e visualizza un singolo elemento
<DynamicCard
  apiEndpoint="/users"
  itemId="123"
  renderCard={(user) => <div>{user.name}</div>}
/>

// Lista con paginazione automatica
<CardList
  apiEndpoint="/products"
  filters={{ category: 'electronics' }}
  renderCard={(product) => <ProductCard {...product} />}
/>

// Form dinamico con validazione
<DynamicForm
  fields={[
    { name: 'email', type: 'email', required: true },
    { name: 'name', type: 'text', label: 'Nome completo' }
  ]}
  apiEndpoint="/users"
  onSuccess={(result) => console.log('Creato!', result)}
/>
```

### Hooks personalizzati

```jsx
import { useApi, useFetch } from './componentsAPI/hooks/useApi';

// Per chiamate manuali
function CreateUser() {
  const { data, loading, error, execute } = useApi(
    () => userService.createUser(formData)
  );

  return (
    <button onClick={execute} disabled={loading}>
      {loading ? 'Creazione...' : 'Crea Utente'}
    </button>
  );
}

// Per caricamento automatico
function UserList() {
  const { data, loading, error, refetch } = useFetch(
    () => userService.getUsers()
  );

  if (loading) return <div>Caricamento...</div>;
  if (error) return <div>Errore: {error.message}</div>;

  return data.map(user => <div key={user.id}>{user.name}</div>);
}
```

### Context API

Avvolgi la tua app con `ApiProvider` per accesso globale ai servizi:

```jsx
import { ApiProvider, useApiServices } from './componentsAPI/context/ApiContext';

// In App.js
function App() {
  return (
    <ApiProvider>
      <MyComponent />
    </ApiProvider>
  );
}

// In qualsiasi componente figlio
function MyComponent() {
  const { userService, productService } = useApiServices();

  const loadUsers = async () => {
    const users = await userService.getUsers();
    console.log(users);
  };

  return <button onClick={loadUsers}>Carica Utenti</button>;
}
```

## Documentazione

- **Componenti API**: Consulta `src/componentsAPI/README_API.md` per documentazione dettagliata
- **Bootstrap Italia**: [Documentazione ufficiale](https://italia.github.io/bootstrap-italia/)
- **Create React App**: [Documentazione CRA](https://create-react-app.dev/)

## Tecnologie utilizzate

- **React 19.1.0**: Framework UI
- **Bootstrap Italia 2.14.0**: Design system
- **React Testing Library**: Testing
- **Create React App**: Build toolchain

## Configurazione API

Per configurare le API, modifica il file `.env`:

```env
REACT_APP_API_BASE_URL=https://your-api.com/api
REACT_APP_API_TIMEOUT=10000
```

I servizi in `src/componentsAPI/services/` utilizzano automaticamente queste configurazioni.

## Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Note di sicurezza

Il progetto presenta alcune dipendenze con vulnerabilità note (principalmente in `react-scripts`).
Per ambienti di produzione, considera:

- Aggiornamento a versioni più recenti di `react-scripts` o migrazione a Vite
- Revisione delle dipendenze con `npm audit`
- Implementazione di Content Security Policy (CSP)

## Licenza

Questo progetto è stato creato a scopo educativo e dimostrativo.

## Supporto

Per domande o problemi, apri una issue nel repository.
