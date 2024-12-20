import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const searchUser = async () => {
      try {
        const answer = await fetch("http://localhost:3000/users");
        const dataS = await answer.json();
        setusers(dataS);
      } catch {
        alert("An error occurred on the app.");
      }
    };
    searchUser();
  }, []);

  const pdfExport = () => {
    const doc = new jsPDF();
    const dataTable = users.map((user) => [user.name, user.email]);

    doc.text("User List", 10, 10);
    doc.autoTable({
      head: [["Name", "E-mail"]],
      body: dataTable,
    });

    doc.save("studentsIFMS.pdf");
  };

  return (
    <div>
      <button onClick={pdfExport}>Export to PDF</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/alterar/${user.id}`}>
                  <button>Alterar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}