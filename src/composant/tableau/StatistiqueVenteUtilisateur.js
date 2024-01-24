import React, { useState, useEffect } from 'react';
import BarChart from "../chart/BarChart";

const StatistiqueVenteUtilisateur = ({date}) => {
  const [userData, setUserData] = useState([]);

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log(`${date.dateDebut} ou ${date.dateFin}`);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:52195/Vuestatistiquevente/findByStatVenteUserBy2Date?date1=${date.dateDebut}&date2=${date.dateFin}`);

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Mettez à jour l'état avec les données récupérées
          setChartData({
            labels: data.map((data) => data.email),
            datasets: [
            {
                label: "Statistique de vente de voiture par utilisateur",
                data: data.map((data) => data.nombredeventes),
                backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },1
            ],
        })
        } else {
          console.error('Erreur lors de la requête HTTP:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la requête HTTP:', error);
      }
    };

    fetchData();
  }, []); // Le tableau vide en tant que dépendance signifie que cette requête sera effectuée une seule fois lors du montage du composant.

  return (
    <div>
      
      {/* <div style={{ width: 700 }}>
      {
        chartData &&
        <BarChart chartData={chartData} />
      }
      </div> */}
      
      <div class="content"/>
            <div class="animated fadeIn">
                <div class="row">

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <strong class="card-title">Data Table</strong>
                            </div>
                            <div class="card-body">
                                <table id="bootstrap-data-table" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Email Utilisateur</th>
                                            <th>Nombre de vente</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {userData.map((user) => (
                                          <tr key={user.idutilisateur}>
                                              <td>{user.nomutilisateur}</td>
                                              <td>{user.email}</td>
                                              <td>{user.nombredeventes}</td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                              </div>
                        </div>
                    </div>
              </div>
          </div>
      </div>
  );
};

export default StatistiqueVenteUtilisateur;
