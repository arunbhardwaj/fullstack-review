import React from 'react';

const RepoList = ({repos}) => {

  const formatString = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: '2-digit', minute: '2-digit'}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <table className="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>User</th>
            <th>Size</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => {
            console.log(repo);
            return (
              <tr className="card">
                <td className="card header">
                  <a href={repo.url}>{repo.name}</a>
                </td>
                <td className="card body">
                  {repo.owner.username}
                </td>
                <td>
                  {repo.size}
                </td>
                <td>
                  {formatString(repo.date.created_at)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RepoList;

/*
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
              </div>
              </div>
            )
          })}
*/