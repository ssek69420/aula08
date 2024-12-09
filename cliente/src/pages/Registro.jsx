export default function Registrar() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const navigate = useNavigate()

  const regData = async (event) => {
    event.preventDefault()

    try {
      const ans = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name,
          email: email
        })
      })
      if (ans.ok) {
        navigate('/')
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      alert("Error: " + error.message);
      console.error(error);
    }
  }

  return (
    <main>
      <form onSubmit={regData}>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button>Register</button>
      </form>
    </main>
  );
}
