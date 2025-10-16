import { Form, Link } from "@remix-run/react";

interface EditViewProps {
  user: any;
}

export function EditView({ user }: EditViewProps) {
  return (
    <div className="container">
      <h1 className="main-title">Edit User</h1>

      <div className="create-form">
        <Form method="post">
          <input type="hidden" name="intent" value="update" />
          <input type="hidden" name="id" value={user.id} />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              defaultValue={user.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              defaultValue={user.email}
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Update User
            </button>
            <Link to="/users" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

