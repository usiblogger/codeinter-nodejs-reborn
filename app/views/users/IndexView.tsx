import { Form, Link } from "@remix-run/react";

interface IndexViewProps {
  users: any[];
}

export function IndexView({ users }: IndexViewProps) {
  return (
    <div className="container">
      <h1 className="main-title">Users Management</h1>

      <div className="create-form">
        <h2>Create New User</h2>
        <Form method="post">
          <input type="hidden" name="intent" value="create" />
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create User</button>
        </Form>
      </div>

      <div className="items-list">
        <h2>Users</h2>
        {users.length === 0 ? (
          <p className="text-muted">No users yet.</p>
        ) : (
          <div>
            {users.map((user) => (
              <div key={user.id} className="item-card d-flex justify-content-between align-items-center">
                <div className="item-content flex-grow-1">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  {user.created_at && (
                    <small className="text-muted">
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </small>
                  )}
                </div>
                <div className="item-actions">
                  <Link to={`/users/edit/${user.id}`} className="btn btn-secondary">
                    Edit
                  </Link>
                  <Form method="post" style={{ display: "inline" }}>
                    <input type="hidden" name="intent" value="delete" />
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </Form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

