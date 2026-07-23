"use client";

import { useState } from "react";

export default function DashboardForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [software, setSoftware] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      title,
      category,
      software,
      description,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl bg-white p-10 shadow"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Dashboard Title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Category
        </label>

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Software
        </label>

        <select
          value={software}
          onChange={(e) => setSoftware(e.target.value)}
          className="w-full rounded-xl border p-3"
        >
          <option value="">Choose software</option>

          <option>Power BI</option>

          <option>Tableau</option>

          <option>Excel</option>

          <option>Python</option>

          <option>R</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          Description
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <button
        className="rounded-xl bg-[#071A3D] px-8 py-3 font-semibold text-white"
      >
        Save Dashboard
      </button>
    </form>
  );
}