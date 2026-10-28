import React, { useState } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonInput, IonButton, IonIcon, IonToast, useIonRouter } from '@ionic/react';
import { searchOutline, documentTextOutline, notificationsOutline, personOutline, heart } from 'ionicons/icons';
import { obtenerAnimales, alternarFavorito } from '../../services/animalesService';
import { estaAutenticado } from '../../services/authService';
import './Explorar.css';

const ANIMALS_DATA = obtenerAnimales();

const Explorar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const router = useIonRouter();

  // Animal actual y siguiente (usando operador módulo para hacer un ciclo infinito)
  const currentAnimal = ANIMALS_DATA[currentIndex];
  const nextAnimal = ANIMALS_DATA[(currentIndex + 1) % ANIMALS_DATA.length];

  const handleNextAnimal = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ANIMALS_DATA.length);
  };

  const handleFavorito = () => {
    if (!estaAutenticado()) {
      router.push('/login');
      return;
    }
    const agregado = alternarFavorito(currentAnimal.id);
    setMensaje(agregado ? `${currentAnimal.name} se agregó a tus favoritos` : `${currentAnimal.name} se quitó de tus favoritos`);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="explore-content">
        <IonGrid className="explore-grid">
          <IonRow className="explore-row">
            
            {/* --- BARRA LATERAL (Desktop) --- */}
            <IonCol size="12" sizeMd="3" sizeLg="2.5" className="sidebar">
              <div className="sidebar-header">
                <div className="logo">
                  <span className="dot"></span> PatitasGo
                </div>
                <span className="logo-subtitle">ADOPCIÓN Y RESCATE</span>
              </div>

              <div className="nav-menu">
                <div className="nav-item active" onClick={() => router.push('/catalogo')}>
                  <IonIcon icon={searchOutline} />
                  <span>Explorar</span>
                </div>
                <div className="nav-item" onClick={() => router.push('/usuario/postulaciones')}>
                  <IonIcon icon={documentTextOutline} />
                  <span>Postulaciones</span>
                </div>
                <div className="nav-item" onClick={() => router.push('/usuario/alertas')}>
                  <IonIcon icon={notificationsOutline} />
                  <span>Alertas</span>
                </div>
                <div className="nav-item" onClick={() => router.push('/usuario/perfil')}>
                  <IonIcon icon={personOutline} />
                  <span>Perfil</span>
                </div>
              </div>

              <div className="help-box">
                <h4>¿Necesitas ayuda?</h4>
                <p>Revisa preguntas frecuentes o contacta al refugio.</p>
                <IonButton expand="block" color="light" className="btn-help">
                  Centro de ayuda
                </IonButton>
              </div>
            </IonCol>

            {/* --- CONTENIDO PRINCIPAL --- */}
            <IonCol size="12" sizeMd="9" sizeLg="9.5" className="main-content">
              
              <div className="top-section">
                <div className="header-info">
                  <div>
                    <h1 className="page-title">Explorar animales</h1>
                    <p className="page-subtitle">Ficha completa y una siguiente opción, sin gestos de rechazo.</p>
                  </div>
                  <div className="location-badge">
                    {ANIMALS_DATA.length} animales • 25 km
                  </div>
                </div>

                <div className="search-filter-container">
                  <div className="search-bar">
                    <IonInput placeholder="Buscar por nombre, especie o refugio"></IonInput>
                  </div>
                  <IonButton fill="outline" color="dark" className="btn-filter">
                    Filtros
                  </IonButton>
                </div>
              </div>

              <div className="cards-layout">
                
                {/* --- TARJETA PRINCIPAL DINÁMICA --- */}
                <div className="main-animal-card">
                  <img 
                    src={currentAnimal.image} 
                    alt={currentAnimal.name} 
                    className="main-animal-img"
                  />
                  <div className="main-animal-details">
                    <span className="status-badge">{currentAnimal.status}</span>
                    <h2 className="animal-name">{currentAnimal.name}</h2>
                    <p className="animal-stats">
                      {currentAnimal.species} • {currentAnimal.gender} • {currentAnimal.age} • {currentAnimal.size}
                    </p>
                    
                    <div className="tags-container">
                      {currentAnimal.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>

                    <p className="animal-desc">
                      {currentAnimal.description}
                    </p>

                    <h4 className="section-subtitle">Refugio y ubicación</h4>
                    <p className="text-muted">{currentAnimal.shelter} • {currentAnimal.location} • {currentAnimal.distance}</p>
                    
                    <p className="text-muted">{currentAnimal.health}</p>

                    <IonButton expand="block" color="success" className="btn-postular" routerLink={`/animales/${currentAnimal.id}/postular`}>
                      Postular para adoptar
                    </IonButton>

                    <div className="action-buttons">
                      <IonButton fill="outline" color="dark" className="btn-secondary" onClick={handleFavorito}>
                        <IonIcon icon={heart} color="danger" slot="start" />
                        Añadir a favoritos
                      </IonButton>
                      <IonButton fill="outline" color="dark" className="btn-secondary" routerLink={`/animales/${currentAnimal.id}/apadrinar`}>
                        Apadrinar
                      </IonButton>
                    </div>
                  </div>
                </div>

                {/* --- TARJETA DE SIGUIENTE ANIMAL (Al hacer clic avanza) --- */}
                <div className="next-animal-card" onClick={handleNextAnimal} style={{ cursor: 'pointer' }}>
                  <span className="next-label">SIGUIENTE ANIMAL</span>
                  <img 
                    src={nextAnimal.image} 
                    alt={nextAnimal.name} 
                    className="next-animal-img"
                  />
                  <div className="next-animal-details">
                    <h3 className="animal-name-small">{nextAnimal.name}</h3>
                    <p className="animal-stats-small">{nextAnimal.species} • {nextAnimal.gender} • {nextAnimal.age}</p>
                    <p className="text-muted-small">{nextAnimal.shelter} • {nextAnimal.location} • {nextAnimal.distance}</p>
                    
                    <IonButton expand="block" fill="outline" color="dark" className="btn-ver-ficha" onClick={(e) => { e.stopPropagation(); router.push(`/animales/${nextAnimal.id}`); }}>
                      Ver ficha de {nextAnimal.name} →
                    </IonButton>
                  </div>
                </div>

              </div>
            </IonCol>

          </IonRow>
        </IonGrid>

        {/* --- BARRA DE NAVEGACIÓN INFERIOR (Solo para móviles) --- */}
        <div className="mobile-bottom-nav">
          <div className="nav-item-mobile active" onClick={() => router.push('/catalogo')}>
            <IonIcon icon={searchOutline} />
            <span>Explorar</span>
          </div>
          <div className="nav-item-mobile" onClick={() => router.push('/usuario/postulaciones')}>
            <IonIcon icon={documentTextOutline} />
            <span>Postulaciones</span>
          </div>
          <div className="nav-item-mobile" onClick={() => router.push('/usuario/alertas')}>
            <IonIcon icon={notificationsOutline} />
            <span>Alertas</span>
          </div>
          <div className="nav-item-mobile" onClick={() => router.push('/usuario/perfil')}>
            <IonIcon icon={personOutline} />
            <span>Perfil</span>
          </div>
        </div>

        <IonToast isOpen={mensaje !== ''} message={mensaje} duration={2000} onDidDismiss={() => setMensaje('')} />
      </IonContent>
    </IonPage>
  );
};

export default Explorar;