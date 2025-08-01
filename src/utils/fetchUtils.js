const HOST_NAME = import.meta.env.VITE_API_URL;

export const fetchGet = async (route, options) => {
  const { signal, token } = options;
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "GET",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    signal,
  });
};

export const fetchPost = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "POST",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};

export const fetchPut = async (route, body, token) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "PUT",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    mode: "cors",
    body: JSON.stringify(body),
  });
};

export const fetchDelete = async (route, signal) => {
  return await fetch(`${HOST_NAME}/${route}`, {
    method: "DELETE",
    mode: "cors",
    signal,
  });
};
