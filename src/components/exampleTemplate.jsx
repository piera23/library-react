import React, { useState } from 'react';

// Template di esempio che utilizza tutti i componenti
const ExampleTemplate = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: '',
    servizio: ''
  });
  
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Servizi", href: "/servizi" },
    { label: "Chi siamo", href: "/chi-siamo" },
    { label: "Contatti", href: "/contatti" }
  ];
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Servizi", href: "/servizi" },
    { label: "Dettaglio Servizio", active: true }
  ];
  
  const accordionItems = [
    { 
      title: "Come funziona il servizio?", 
      content: "Il nostro servizio è progettato per essere semplice e intuitivo. Segui questi passaggi per iniziare..." 
    },
    { 
      title: "Quali sono i costi?", 
      content: "Offriamo diverse opzioni di prezzo per adattarsi alle tue esigenze. Contattaci per un preventivo personalizzato." 
    },
    { 
      title: "Tempi di consegna", 
      content: "I tempi di consegna variano in base al tipo di servizio richiesto. In media, completiamo i progetti entro 5-10 giorni lavorativi." 
    }
  ];
  
  const tabsData = [
    { 
      label: "Descrizione", 
      content: <p>Questa è la descrizione dettagliata del nostro servizio principale.</p> 
    },
    { 
      label: "Caratteristiche", 
      content: (
        <ListGroup 
          items={[
            { text: "Supporto 24/7", icon: "it-check" },
            { text: "Garanzia soddisfatti o rimborsati", icon: "it-check" },
            { text: "Aggiornamenti gratuiti", icon: "it-check" }
          ]}
        />
      )
    },
    { 
      label: "Recensioni", 
      content: <p>I nostri clienti sono molto soddisfatti del servizio. Valutazione media: 4.8/5</p> 
    }
  ];
  
  const footerLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Termini di servizio", href: "/termini" },
    { label: "Cookie Policy", href: "/cookie" }
  ];
  
  const socialLinks = [
    { label: "Facebook", icon: "it-facebook", href: "https://facebook.com" },
    { label: "Twitter", icon: "it-twitter", href: "https://twitter.com" },
    { label: "LinkedIn", icon: "it-linkedin", href: "https://linkedin.com" }
  ];
  
  const handleFormSubmit = () => {
    console.log("Form data:", formData);
    setShowModal(true);
  };
  
  return (
    <div>
      <Header 
        title="La Mia Azienda"
        subtitle="Innovazione e qualità dal 1990"
        menuItems={menuItems}
        variant="primary"
        sticky={true}
      />
      
      <Hero 
        title="Benvenuti nel nostro sito"
        subtitle="Scopri i nostri servizi e prodotti di alta qualità"
        height="500px"
        ctaButton={{
          text: "Scopri di più",
          onClick: () => console.log("CTA clicked")
        }}
      />
      
      <div className="container my-5">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="row mt-4">
          <div className="col-12 mb-4">
            <Alert 
              message="Promozione speciale: 20% di sconto su tutti i servizi fino alla fine del mese!"
              type="warning"
              dismissible={true}
            />
          </div>
        </div>
        
        <div className="row mb-5">
          <div className="col-md-4 mb-4">
            <Card 
              title="Servizio Premium"
              text="Il nostro servizio di punta con tutte le funzionalità avanzate incluse."
              category="Servizi"
              readMoreLink="/servizio-premium"
            />
          </div>
          <div className="col-md-4 mb-4">
            <Card 
              title="Servizio Standard"
              text="Perfetto per le piccole e medie imprese che cercano qualità e convenienza."
              category="Servizi"
              readMoreLink="/servizio-standard"
            />
          </div>
          <div className="col-md-4 mb-4">
            <Card 
              title="Servizio Base"
              text="Ideale per chi vuole iniziare con le funzionalità essenziali."
              category="Servizi"
              readMoreLink="/servizio-base"
            />
          </div>
        </div>
        
        <div className="row mb-5">
          <div className="col-md-8">
            <h2 className="mb-4">Informazioni dettagliate</h2>
            <Tabs tabs={tabsData} />
          </div>
          <div className="col-md-4">
            <h3 className="mb-3">Progresso del progetto</h3>
            <div className="mb-3">
              <p className="mb-1">Analisi completata</p>
              <Progress value={100} variant="success" />
            </div>
            <div className="mb-3">
              <p className="mb-1">Sviluppo in corso</p>
              <Progress value={65} variant="primary" striped animated />
            </div>
            <div className="mb-3">
              <p className="mb-1">Testing</p>
              <Progress value={30} variant="info" />
            </div>
          </div>
        </div>
        
        <div className="row mb-5">
          <div className="col-12">
            <h2 className="mb-4">Domande frequenti</h2>
            <Accordion items={accordionItems} />
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title mb-4">Contattaci</h3>
                
                <FormInput
                  label="Nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Inserisci il tuo nome"
                  required
                />
                
                <FormInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="tua@email.com"
                  required
                />
                
                <FormSelect
                  label="Servizio di interesse"
                  value={formData.servizio}
                  onChange={(e) => setFormData({...formData, servizio: e.target.value})}
                  options={[
                    { value: "premium", label: "Servizio Premium" },
                    { value: "standard", label: "Servizio Standard" },
                    { value: "base", label: "Servizio Base" }
                  ]}
                />
                
                <FormTextarea
                  label="Messaggio"
                  value={formData.messaggio}
                  onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                  rows={5}
                  placeholder="Scrivi il tuo messaggio..."
                  required
                />
                
                <Button 
                  text="Invia messaggio" 
                  onClick={handleFormSubmit}
                  variant="primary"
                  icon="it-mail"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Messaggio inviato"
        footer={
          <Button 
            text="Chiudi" 
            onClick={() => setShowModal(false)}
            variant="secondary"
          />
        }
      >
        <p>Il tuo messaggio è stato inviato con successo. Ti risponderemo al più presto!</p>
      </Modal>
        <Footer 
        companyName="La Mia Azienda SRL"
        links={footerLinks}
        socialLinks={socialLinks}
        copyright="© 2025 La Mia Azienda SRL - Tutti i diritti riservati"
        variant="dark"
      />
    </div>
  );
};
export default ExampleTemplate;