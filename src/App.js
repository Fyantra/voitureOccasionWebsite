import React, { useState } from 'react';
import Formulaire from './composant/Formulaire.js';
import Login from './composant/formulaire/Login.js';
import FormulaireRevenueUtilisateur from './composant/formulaire/FormulaireRevenueUtilisateur.js';
import FormulaireStatVoitureDefinie from './composant/formulaire/FormulaireStatVoitureDefinie.js';
import FormulaireStatVenteUtilisateur from './composant/formulaire/FormulaireStatVenteUtilisateur.js'
import AllAnnonce from './composant/annonce/AllAnnonce.js';

import './App.css';
import RightPanel from './composant/templateadmin/RightPanel .js';


const boiteDeVitesse = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}></Formulaire></div>;
const puissance = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}></Formulaire></div>;
const modele = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}/></div>;
const marque = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}/></div>;
const carburant = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}/></div>;
const comission = ({ formulaireName }) => <div><Formulaire formulaireName={formulaireName}/></div>;
const login = ({ setIsConnected }) => <div><Login setIsConnected={setIsConnected} /></div>;
const formulaireRevenueUtilisateur = () => <div><FormulaireRevenueUtilisateur /></div>;
const formulaireStatVoitureDefinie = () => <div><FormulaireStatVoitureDefinie /></div>
const formulaireStatVenteUser = () => <div><FormulaireStatVenteUtilisateur /></div>
const allAnnonce = () => <div className="conten"><AllAnnonce /></div>;


export default function App(params) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentComponent, setCurrentComponent] = useState('boiteDeVitesse');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isConnected, setIsConnected] = useState(true);
  const authToken = localStorage.getItem('authToken');

    if(authToken==null){
      setIsConnected(false)
    }

  const components = {
    boiteDeVitesse: boiteDeVitesse,
    puissance: puissance,
    modele: modele,
    login: login,
    formulaireRevenueUtilisateur: formulaireRevenueUtilisateur,
    allAnnonce: allAnnonce,
    formulaireStatVoitureDefinie: formulaireStatVoitureDefinie, 
    formulaireStatVenteUser : formulaireStatVenteUser,
    comission : comission,
    marque : marque,
    carburant: carburant,
  };

  const handleClick = async (componentKey,checkToken) => {
    setCurrentComponent(componentKey);

    const authToken = localStorage.getItem('authToken');

    if(authToken==null){
      setIsConnected(false)
    }
    else if(checkToken==true){
      try {
        const response = await fetch(`http://localhost:52195/Utilisateurs/isTokenValide`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const boolean = data; // Assurez-vous d'adapter cela à la structure de la réponse du service webi
          console.log('componentKey: ',boolean);

          if(boolean==false){
              setIsConnected(false);
          }

          // Stockage dans le localStorage
          localStorage.setItem('authToken', authToken);
        } else {
          console.error('Erreur lors de l\'authentification');
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    }
  };

  const deconnection = async (componentKey) => {
    setCurrentComponent(componentKey);

    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:52195/Utilisateurs/deconnection`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const boolean = data; // Assurez-vous d'adapter cela à la structure de la réponse du service webi
        console.log('componentKey: ',boolean);

        if(boolean==false){
            setIsConnected(false);
        }

        // Stockage dans le localStorage
        localStorage.setItem('authToken', authToken);
      } else {
        console.error('Erreur lors de l\'authentification');
      }
    } catch (error) {
      console.error('Erreur lors de la requête HTTP:', error);
    }
    
    setIsConnected(false);
  };

  const renderComponent = () => {
    if (isConnected) {
      const ComponentToRender = components[currentComponent];
      switch (currentComponent) {
        case 'boiteDeVitesse':
          return <ComponentToRender formulaireName={'boiteDeVitesse'} />;
        case 'puissance':
          return <ComponentToRender formulaireName={'puissance'} />;
        case 'modele':
          return <ComponentToRender formulaireName={'modele'} />;
        case 'formulaireRevenueUtilisateur':
          return <ComponentToRender />;
        case 'allAnnonce':
            return <ComponentToRender />;
        case 'formulaireStatVoitureDefinie':
          return <ComponentToRender />;
        case 'formulaireStatVenteUser':
          return <ComponentToRender />;
        case 'marque':
          return <ComponentToRender formulaireName={'marque'}/>;
        case 'carburant':
          return <ComponentToRender formulaireName={'carburant'}/>;
        case 'comission':
          return <ComponentToRender formulaireName={'comission'}/>;
        default:
          return <ComponentToRender formulaireName={'comission'}/>;
      }
    } else {
      // Si l'utilisateur n'est pas connecté, afficher le composant de connexion
      return <Login setIsConnected={setIsConnected} />;
    }
  };

  return (
    <div>
      {isConnected && (

        <div>
          <RightPanel />  {/*Header*/}
          <aside id="left-panel" className="left-panel">
            <nav className="navbar navbar-expand-sm navbar-default">
              <div id="main-menu" className="main-menu collapse navbar-collapse">
                  <ul className="nav navbar-nav">
                      <li className="active">
                          <a href="#" onClick={() => deconnection('login')}><i className="menu-icon fa fa-laptop"></i>Deconnexion </a>
                      </li>
                      <li className="menu-title">Title</li>
                      <li className="menu-item-has-children dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-table"></i>Insertion</a>
                          <ul className="sub-menu children dropdown-menu">
                              <li><i className="fa fa-table"></i><a href="" onClick={() => handleClick('boiteDeVitesse',true)}>Insertion boite de vitesse</a></li>
                              <li><i className="fa fa-table"></i><a href="#" onClick={() => handleClick('puissance',true)}>Insertion puissance</a></li>
                              <li><i className="fa fa-table"></i><a href="#" onClick={() => handleClick('marque',true)}>Insertion marque</a></li>
                              <li><i className="fa fa-table"></i><a href="#" onClick={() => handleClick('comission',true)}>Insertion commission</a></li>
                              <li><i className="fa fa-table"></i><a href="#" onClick={() => handleClick('carburant',true)}>Insertion carburant</a></li>
                              <li><i className="fa fa-table"></i><a href="#" onClick={() => handleClick('modele',true)}>Insertion modele</a></li>
                          </ul>
                      </li>

                      <li className="menu-item-has-children dropdown">
                          <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="menu-icon fa fa-th"></i>Statistique</a>
                          <ul className="sub-menu children dropdown-menu">
                              <li><i className="menu-icon fa fa-th"></i><a href="#" onClick={() => handleClick('formulaireStatVoitureDefinie',true)}>Statistique voiture</a></li>
                              <li><i className="menu-icon fa fa-th"></i><a href="#" onClick={() => handleClick('formulaireRevenueUtilisateur',true)}>Statistique revenue utilisateurr</a></li>
                              <li><i className="menu-icon fa fa-th"></i><a href="#" onClick={() => handleClick('formulaireStatVenteUser',true)}>Statistique rang de vente utilisateur</a></li>
                              <li><i className="menu-icon fa fa-th"></i><a href="#" onClick={() => handleClick('allAnnonce',true)}><i className="menu-icon fa fa-th"></i>validation annonce </a></li>

                          </ul>
                      </li>
                      <li>
                          <a href="#" onClick={() => handleClick('allAnnonce',true)}><i className="menu-icon fa fa-th"></i>validation annonce </a>
                      </li>
                  </ul>
              </div>
            </nav>
          </aside>
        </div>
      )}
      
      {renderComponent()}
    </div>
  );
}
