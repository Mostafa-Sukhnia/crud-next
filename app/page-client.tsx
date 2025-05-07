"use client";

import React, { useActionState } from "react";
import { addUser, getServerResponse } from "./user-action";

export default function PageClient() {
  const [message1, action1] = useActionState(async () => {
    return await getServerResponse();
  }, "");

  const [message2, action2] = useActionState(async (prev, formData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    return await addUser({ name, email });
  }, "");

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
    </div>
  );
}
