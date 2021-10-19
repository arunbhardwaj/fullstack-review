import React from 'react';

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
      {repos.map((repo) => {
        console.log(repo);
        return (
          <div className="card">
            <div className="card header">
              <a href={repo.url}>
                {repo.name}
              </a>
            </div>
            <div className="card body">
              {/* {repo.owner.username} */}
            </div>
          </div>
        )
      })}
  </div>
)

export default RepoList;