import { useEffect, useState } from "react";
import {jsPDF} from 'jspdf'
import "jspdf-autotable"
import { Link } from "react-router-dom";
import Alterar from "./Alterar";

export default function Home() {

  const [users, setusers] = useState([]);

  useEffect(() => {
    const searchUser = async () => {
      try {
        const answer = await fetch("http://localhost:3000/users");
        const dataS = await answer.json();
        setusers(dataS);
      } catch {
        alert('An error ocurred on the app.');
      }
    }
    searchUser();
  }, [])

  const pdfExport = () => {
    
    const doc = new jsPDF()
    const dataTable = users.map((user) => [
      user.name,
      user.email,
    ])

    doc.text("User List", 10, 10)
    doc.autoTable({
      head: [["Name", "E-mail"]],
      body: dataTable,
    })

    doc.save("studentsIFMS.pdf")
  }


  return (
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
      </tr>
      {users.map((user) =>
        <tr key={user.id}>
          <td>{user.nome}</td>
          <td>{user.email}</td>
        <td>Link to={'/alterar/' + user.id}</td>
        <button>Alterar</button>
        </tr>
      )}
    </table>
  );
}