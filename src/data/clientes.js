const Url = import.meta.env.VITE_API_URL;

export async function obtenerClientes() {
  const respuesta = await fetch(Url);
  const clientes = await respuesta.json();
  console.log(clientes)
  return clientes;
}

export async function obtenerCliente(id) {
  const respuesta = await fetch(`${Url}/${id}`);
  const cliente = await respuesta.json();
  return cliente;
}

export async function agregarCliente(cliente) {
  try {
    const respuesta = await fetch(Url, {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarCliente(id, data) {
  try {
    const respuesta = await fetch(`${Url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarCliente(id) {
  try {
    const respuesta = await fetch(`${Url}/${id}`, {
      method: "DELETE",
    });

    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

