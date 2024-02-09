<template>
    <div class="container">
      <h1>Listado de Libros vencidos</h1>
  
      <div class="card">
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cliente</th>
                <th scope="col">Email</th>
                <th scope="col">Celular</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in clientes" :key="row.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  {{ row.name }}
                </td>
                <td>
                  {{ row.email }}
                </td>
                <td>
                  {{ row.celular }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
    
    <script>
  export default {
    data() {
      return {
        libros: [],
      };
    },
    created() {
      this.getLibros();
    },
    methods: {
      getLibros() {
        this.axios
          .get("http://127.0.0.1:8000/api/libros-vencidos")
          .then((response) => {
            console.log(response.data);
            this.libros = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      saveCliente() {
        //alert('jola')
        this.axios
          .post("http://127.0.0.1:8000/api/cliente-registro", this.cliente)
          .then((response) => {
            console.log(response.data);
  
            this.clientes.push(response.data);
            this.cliente = {
              name: "",
              email: "",
              celular: "",
            };
  
            this.errors = [];
          })
          .catch((error) => {
            console.log(error);
            this.errors = Object.values(error.response.data.errors).flat();
          });
      },
    },
  };
  </script>
    
    <style>
  </style>