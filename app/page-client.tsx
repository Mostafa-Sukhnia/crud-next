"use client";

import React, { useActionState, useState, useEffect } from "react";
import {
  addUser,
  getServerResponse,
  getUsers,
  findUser,
  delUser,
  updateUser,
} from "./user-action";
import { User } from "./Types";

export default function PageClient() {
  const [message1, action1] = useActionState(async () => {
    return await getServerResponse();
  }, "");

  const [message2, action2] = useActionState(async (prev, formData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    return await addUser({ name, email });
  }, "");

  const [message3, action3] = useActionState(async (prev, formData) => {
    const id = formData.get("id") as string;
    if (!id) return "ID is required";

    const user: any = await findUser(Number(id));
    if (!user) return "User not found";
    else return user;
  }, "");

  const [message4, action4] = useActionState(async (prev, formData) => {
    updateUser(Number(formData.get("id")), formData.get("name") as string);
    return "User updated";
  }, "");

  const [deleteMessage, setDeleteMessage] = useState(""); // لحفظ رسالة الحذف
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id: number) => {
    await delUser(id);
    setDeleteMessage("User Deleted");

    await fetchUsers(); // تحديث قائمة المستخدمين
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      <form action={action1}>
        <button type="submit" className="bg-amber-300 rounded-xl p-3">
          Call Server Action
        </button>
      </form>
      <div>{message1}</div>

      <form action={action2}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border-2 border-black rounded-xl p-3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border-2 border-black rounded-xl p-3"
        />
        <button type="submit" className="bg-green-300 rounded-xl p-3">
          Add User
        </button>
      </form>
      <div>{message2}</div>

      <table className="border-2 border-black rounded-xl p-3">
        <thead>
          <tr>
            <th className="border-2 border-black rounded-xl p-3 text-start">
              ID
            </th>
            <th className="border-2 border-black rounded-xl p-3 text-start">
              Name
            </th>
            <th className="border-2 border-black rounded-xl p-3 text-start">
              Email
            </th>
            <th className="border-2 border-black rounded-xl p-3 text-start">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border-2 border-black p-3 text-start">
                {user.id}
              </td>
              <td className="border-2 border-black p-3 text-start">
                {user.name}
              </td>
              <td className="border-2 border-black p-3 text-start">
                {user.email}
              </td>
              <td className="border-2 border-black p-3 text-start">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white rounded px-3 py-1 cursor-pointer hover:bg-red-600"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteMessage && (
        <div className="text-red-500 font-semibold">{deleteMessage}</div>
      )}

      <div className="flex flex-col gap-4 p-6">
        <p className="bg-green-500 p-2 m-2">Find user</p>
        <form action={action4}>
          <input
            type="number"
            name="id"
            placeholder="ID"
            className="border-2 border-black rounded-xl p-3"
          />
          <button type="submit" className="bg-green-300 rounded-xl p-3">
            Find User
          </button>
          {typeof message3 === "string" ? (
            <p>{message3}</p>
          ) : (
            <div className="border-2 border-black rounded-xl p-3">
              <p>
                <strong>ID:</strong> {message3.id}
              </p>
              <p>
                <strong>Name:</strong> {message3.name}
              </p>
              <p>
                <strong>Email:</strong> {message3.email}
              </p>
            </div>
          )}
        </form>
        <div>
          <div>update user</div>
          <form action={action4}>
            <input
              type="number"
              name="id"
              placeholder="ID"
              className="border-2 border-black rounded-xl p-3"
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-2 border-black rounded-xl p-3"
            />
            <button type="submit" className="bg-green-300 rounded-xl p-3">
              Update User
            </button>
            <div>{message4}</div>
          </form>
        </div>
      </div>
    </div>
  );
}
