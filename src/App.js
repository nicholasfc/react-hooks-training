import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext(null);

const UserInfo = () => {
    const user = useContext(UserContext);
    return <div>{user ? `Welcome ${user.name}` : "Not logged in"}</div>;
};

const Repositories = () => {
    const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://api.github.com/users/facebook/repos"
            );
            const data = await response.json();
            setRepositories(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = repositories.filter((repo) => repo.favourite);
        document.title = `You have ${filtered.length} favourites`;
    }, [repositories]);

    const handleFavourite = (id) => {
        const newRepositories = repositories.map((repo) => {
            return repo.id === id
                ? { ...repo, favourite: !repo.favourite }
                : repo;
        });
        setRepositories(newRepositories);
    };

    return (
        <ul>
            {repositories.map((repo) => (
                <li key={repo.id}>
                    {repo.name} {repo.favourite && <span>(Favourite)</span>}
                    <button onClick={() => handleFavourite(repo.id)}>
                        Favourite
                    </button>
                </li>
            ))}
        </ul>
    );
};

function App() {
    // const [repositories, setRepositories] = useState([]);
    const [user, setUser] = useState(null);

    /* useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://api.github.com/users/facebook/repos"
            );
            const data = await response.json();
            setRepositories(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = repositories.filter((repo) => repo.favourite);
        document.title = `You have ${filtered.length} favourites`;
    }, [repositories]);

    const handleFavourite = (id) => {
        const newRepositories = repositories.map((repo) => {
            return repo.id === id
                ? { ...repo, favourite: !repo.favourite }
                : repo;
        });
        setRepositories(newRepositories);
    }; */

    return (
        <UserContext.Provider value={user}>
            <div>
                <button onClick={(event) => setUser({ name: "John" })}>
                    Login
                </button>
                <UserInfo />
            </div>
            {user === null ? " " : <Repositories />}
            {/* <ul>
                {repositories.map((repo) => (
                    <li key={repo.id}>
                        {repo.name} {repo.favourite && <span>(Favourite)</span>}
                        <button onClick={() => handleFavourite(repo.id)}>
                            Favourite
                        </button>
                    </li>
                ))}
            </ul> */}
        </UserContext.Provider>
    );
}

export default App;
