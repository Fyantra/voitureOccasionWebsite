import React, { useState, useEffect } from 'react';
import BarChart from "../chart/BarChart";

const UserDataComponent = ({date}) => {
  const [userData, setUserData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log(`${date.dateDebut} ou ${date.dateFin}`);
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:52195/VoitureDefiniStatView/liste/${date.dateDebut}/${date.dateFin}`);

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Mettez à jour l'état avec les données récupérées
          setChartData({
            labels: data.map((data) => `${data.nomMarque} - ${data.nomModele}`),
            datasets: [
            {
                label: "Statistique voiture le plus vendu",
                data: data.map((data) => data.nombre),
                backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2,
            },
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
                                <strong class="card-title">Statistique voiture</strong>
                          </div>
                          <div class="card-body">
                              <table id="bootstrap-data-table" class="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th>Marque</th>
                                    <th>Modele</th>
                                    <th>Nombre</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userData.map((user) => (
                                    <tr key={user.id}>
                                      <td>{user.nomMarque}</td>
                                      <td>{user.nomModele}</td>
                                      <td>{user.nombre}</td>
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

export default UserDataComponent;
