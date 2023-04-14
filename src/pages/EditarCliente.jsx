import {  useNavigate, Form, useActionData, redirect, useLoaderData } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error";

const Url = import.meta.env.VITE_API_URL;

export async function loader({ params }) {
  const cliente = await obtenerCliente(params.id);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No se encontro el usuario",
    });
  }

  return cliente;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const datos = Object.fromEntries(formData);
    const email = formData.get("email");
  
    //Validacion
  
    const errores = [];
    if (Object.values(datos).includes("")) {
      errores.push("Todos los campos son obligatorios");
    }
  
    let regex = new RegExp(
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
    );
      if(!regex.test(email)){
          errores.push("El email no es valido");
      }
  
    //Retornar los errores
  
    if (Object.keys(errores).length) {
      return errores;
    }
  
    await actualizarCliente(params.id, datos);
  
    return redirect("/");
}


function EditarCliente() {

    const navigate = useNavigate();
    const data = useLoaderData();
    const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Modifica los datos del cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">
        <Form method="post" noValidate>
          <Formulario cliente={data}/>
          {errores?.length &&
            errores.map((error, i) => <Error key={i}>{error}</Error>)}
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Actualizar Cliente"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
