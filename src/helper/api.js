export const updateData = async (data) => {
  const res = await fetch(`/api/update`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const dt = res.json();
  return dt;
};

export const createData = async (data) => {
  const res = await fetch(`/api/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const dt = res.json();
  return dt;
};

export const deleteData = async (data) => {
  const res = await fetch(`/api/delete`, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  });

  const dt = res.json();
  return dt;
};

export const getData = async () => {
  const res = await fetch("http://localhost:3000/api/get");
  const data = await res.json();
  return data;
};
