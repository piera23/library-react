📋 Panoramica Componenti React da API

🔧 Servizi (Services)

ApiService.js
// Classe base per chiamate HTTP
const api = new ApiService();
await api.get('/users');     // GET request
await api.post('/users', data); // POST request

Cosa fa: Gestisce tutte le chiamate API con autenticazione automatica, gestione errori e headers standard.


UserService.js / ProductService.js
const userService = new UserService();
await userService.getUsers();        // Lista utenti
await userService.createUser(data);  // Crea utente

Cosa fa: Servizi specializzati che estendono ApiService per entità specifiche (utenti, prodotti).


🎣 Hooks Personalizzati
useApi.js
const { data, loading, error, execute } = useApi(apiCall);
const { data, loading, error, refetch } = useFetch(apiCall);
Cosa fa:
- useApi: Esegue chiamate API manuali con stati di loading/error
- useFetch: Auto-carica dati al mount del componente


🌐 Context Globale
ApiContext.js
<ApiProvider>
  <App /> {/* Tutti i figli accedono ai servizi */}
</ApiProvider>

const { userService, productService } = useApiServices();
Cosa fa: Fornisce accesso globale ai servizi API in tutta l'app senza prop drilling.

🧱 Componenti UI
DynamicCard 📄
<DynamicCard
  apiEndpoint="/users"
  itemId="123"
  renderCard={(user) => <div>{user.name}</div>}
/>
Cosa fa: Carica UN singolo elemento da API e lo renderizza con una funzione personalizzata.


CardList 📑
<CardList
  apiEndpoint="/products"
  filters={{ category: 'electronics' }}
  renderCard={(product) => <ProductCard {...product} />}
/>
Cosa fa: Carica e mostra una LISTA di elementi con paginazione automatica, filtri e ricerca.


DynamicForm 📝
<DynamicForm
  fields={[
    { name: 'email', type: 'email', required: true },
    { name: 'category', type: 'select', options: [...] }
  ]}
  apiEndpoint="/users"
  onSuccess={(result) => console.log('Creato!', result)}
/>
Cosa fa: Genera form automaticamente dalla configurazione e invia dati all'API.


DynamicTable 📊
<DynamicTable
  apiEndpoint="/orders"
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'amount', label: 'Importo', type: 'currency' },
    { key: 'status', label: 'Stato', type: 'badge' }
  ]}
  searchable={true}
  sortable={true}
  selectable={true}
/>
Cosa fa: Tabella completa con ordinamento, ricerca, selezione multipla, paginazione e azioni bulk.

DynamicModal 🪟
<DynamicModal
  isOpen={showModal}
  title="Modifica Utente"
  apiEndpoint="/users"
  itemId="123"  // Per edit, null per create
  fields={formFields}
  onSuccess={() => setShowModal(false)}
/>
Cosa fa: Modal che può creare NUOVI elementi o MODIFICARE esistenti, con caricamento automatico dei dati.

DynamicDashboard 📈
<DynamicDashboard
  widgets={[
    {
      id: 'sales',
      type: 'stat',
      title: 'Vendite Totali',
      apiEndpoint: '/analytics/sales',
      valueExtractor: (data) => data.total
    },
    {
      id: 'chart',
      type: 'chart',
      title: 'Trend Mensile',
      apiEndpoint: '/analytics/monthly'
    }
  ]}
  refreshInterval={30} // Auto-refresh ogni 30 secondi
/>
Cosa fa: Dashboard con widget configurabili (statistiche, grafici, liste, tabelle) che si aggiornano automaticamente.

DynamicFilter 🔍
<DynamicFilter
  filters={[
    { name: 'search', type: 'text', label: 'Cerca' },
    { name: 'category', type: 'select', optionsEndpoint: '/categories' },
    { name: 'dateRange', type: 'daterange', label: 'Periodo' }
  ]}
  onFilterChange={(filters) => updateResults(filters)}
  autoApply={true}
/>
Cosa fa: Sistema di filtri avanzato con vari tipi di input che può caricare opzioni da API.

🎯 Casi d'Uso Tipici
Pagina Lista Prodotti:
function ProductsPage() {
  return (
    <div>
      <DynamicFilter filters={productFilters} onFilterChange={setFilters} />
      <CardList 
        apiEndpoint="/products" 
        filters={filters}
        renderCard={ProductCard}
      />
    </div>
  );
}

Dashboard Admin:
function AdminDashboard() {
  return (
    <DynamicDashboard widgets={[
      { type: 'stat', title: 'Utenti Totali', apiEndpoint: '/stats/users' },
      { type: 'chart', title: 'Vendite', apiEndpoint: '/stats/sales' },
      { type: 'table', title: 'Ordini Recenti', apiEndpoint: '/orders/recent' }
    ]} />
  );
}

Gestione Utenti:
function UsersManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  return (
    <div>
      <DynamicTable
        apiEndpoint="/users"
        columns={userColumns}
        actions={[
          { label: 'Modifica', onClick: (user) => { setEditUserId(user.id); setShowModal(true); } },
          { label: 'Elimina', onClick: deleteUser, className: 'btn-danger' }
        ]}
      />
      
      <DynamicModal
        isOpen={showModal}
        apiEndpoint="/users"
        itemId={editUserId}
        fields={userFields}
        onSuccess={() => { setShowModal(false); refetchUsers(); }}
      />
    </div>
  );
}

⚡ Vantaggi Chiave

🚀 Velocità: Crea interfacce complesse con poche righe
🔄 Riutilizzo: Stessi componenti per entità diverse
📱 Responsivo: Tutti i componenti sono mobile-first
🛡️ Robusto: Gestione errori e loading automatica
🎨 Personalizzabile: Ogni aspetto è configurabile
📊 Completo: Dalla visualizzazione alla modifica dei dati