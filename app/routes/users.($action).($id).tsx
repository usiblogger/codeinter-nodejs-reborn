// Users Controller (Combined - One File)
import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BaseModel } from "~/models/BaseModel";
import { IndexView } from "~/views/users/IndexView";
import { EditView } from "~/views/users/EditView";

// ✅ Create BaseModel instance directly in route, pass table name
const userBase = new BaseModel('users');

// Loader - handles GET requests
export async function loader({ params }: LoaderFunctionArgs) {
  const { action, id } = params;
  
  // ✅ /users/edit/1 → Edit mode
  if (action === 'edit' && id) {
    const user = userBase.getById(id);
    if (!user) {
      throw new Response("Not Found", { status: 404 });
    }
    return json({ user, users: null, isEdit: true });
  }
  
  // ✅ /users → List mode
  const users = userBase.getAll();
  return json({ users, user: null, isEdit: false });
}

// Action - handles POST/PUT/DELETE requests
export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  // Handle update
  if (intent === "update") {
    const id = formData.get("id");
    const name = formData.get("name");
    const email = formData.get("email");

    if (id && typeof name === "string" && typeof email === "string") {
      userBase.update(id, { name, email });
    }
    return redirect("/users");
  }

  // Handle delete
  if (intent === "delete") {
    const id = formData.get("id");
    if (id) {
      userBase.delete(id);
    }
    return redirect("/users");
  }

  // Handle create
  if (intent === "create") {
    const name = formData.get("name");
    const email = formData.get("email");

    if (typeof name === "string" && typeof email === "string") {
      userBase.create({ name, email });
    }
    return redirect("/users");
  }

  return null;
}

// Component - renders the view
export default function UsersController() {
  const { users, user, isEdit } = useLoaderData<typeof loader>();
  
  // ✅ Edit mode
  if (isEdit && user) {
    return <EditView user={user} />;
  }
  
  // ✅ List mode
  return <IndexView users={users || []} />;
}
