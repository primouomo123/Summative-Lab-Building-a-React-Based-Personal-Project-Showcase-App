import NavBar from "../components/NavBar";
function ErrorPage() {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>404 - Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </main>
        </>
    );
}

export default ErrorPage;