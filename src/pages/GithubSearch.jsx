import { useState } from 'react';

function GithubSearch() {
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = () => {
        setError('');
        setUserInfo(null);

        if (!username) {
            setError('Please enter a username.');
            return;
        }

        fetch(`https://api.github.com/users/${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('User not found');
                }
                return response.json();
            })
            .then(data => {
                setUserInfo(data);
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div className="container pt-5">
            <h1 className="text-center text-light">GitHub User Search</h1>
            <div className="row">
                <div className="col-lg-4 mx-auto">
                    <div className="input-group my-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter GitHub username"
                            aria-label="GitHub username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={handleSearch} className="btn btn-primary">
                            Search
                        </button>
                    </div>
                    {error && <div className="text-danger text-center">{error}</div>}
                    {userInfo && (
                        <div className="card d-flex align-items-center justify-content-center py-4 mx-auto mt-5 text-center">
                            <img
                                className="rounded-circle shadow-sm border"
                                src={userInfo.avatar_url}
                                alt={`${userInfo.login}'s avatar`}
                                width="100"
                            />
                            <h2 className="text-success">{userInfo.login}</h2>
                            <p>Public Repositories: {userInfo.public_repos}</p>
                            <p>Followers: {userInfo.followers}</p>
                            <p>Following: {userInfo.following}</p>
                            <a href={userInfo.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                                View Profile
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GithubSearch;
