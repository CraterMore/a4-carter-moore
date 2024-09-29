
function Login() {
    return (
        <div>
            <header>
            <h1 style={{textAlign: "center"}}>
                Welcome to Book Tracker
            </h1>
            <p style={{textAlign: "center"}}>
                Carter Moore
            </p>
            </header>
            <main className="container" style={{textAlign: "center"}}>
                <a href={import.meta.env.VITE_REACT_APP_SERVER_API_URL + "/auth/github"}> Login with Github </a>
            </main>
        </div>
    )
}

export default Login;