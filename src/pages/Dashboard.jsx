import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import sheets from "../axios/axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const [eventos, setEventos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function getDados() {
      try {
        const responseEventos = await sheets.getEvents();
        const responseUsuarios = await sheets.getUsers();
        setEventos(responseEventos.data.eventos);
        setUsuarios(responseUsuarios.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    getDados();
  }, []);

  //processar os dados para o gráfico de eventos por organizador
  const eventosPorOrganizador = {};
  eventos.forEach((evento) => {
    //Liga o id do organizador do evento atual a orgId
    const orgId = evento.fk_id_organizador;
    //para cada id no objeto, adicione 1 ao guardado, ou 1 a 0 se não existir
    eventosPorOrganizador[orgId] = (eventosPorOrganizador[orgId] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(eventosPorOrganizador),
    datasets: [
      {
        label: "Eventos Por Organizador",
        data: Object.values(eventosPorOrganizador),
        backgroundColor: "rgba(190,206,24, 0.6)",
      },
    ],
  };

  // Dados para gráfico de usuários por mês de nascimento
  const usuariosPorMes = {};
  usuarios.forEach((u) => {
    const mes = new Date(u.data_nascimento).getMonth() + 1;
    usuariosPorMes[mes] = (usuariosPorMes[mes] || 0) + 1;
  });

  const meses = [
    "Nenhum",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const pieData = {
    labels: Object.keys(usuariosPorMes).map((m) => meses[m]),
    datasets: [
      {
        data: Object.values(usuariosPorMes),
        backgroundColor: [
          "#FF6384",
          "#36EBA2",
          "#FFCE56",
          "#BECE18",
          "#FF9800",
          "#9C27B0",
          "#6384FF",
          "#A2EB36",
          "#CE56FF",
          "#CE18BE",
          "#9800FF",
          "#27B09C",
        ],
      },
    ],
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboards:</h2>
      <div style={{ width: "600px", marginBottom: 40 }}>
        <Bar data={barData} />
      </div>
      <div>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Dashboard;