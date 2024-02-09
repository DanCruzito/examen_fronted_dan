<template>
  <div class="container">
    <h1>Listado de Clientes</h1>
    <div class="card m-2">
      <div class="card body">
        <ul v-if="errors.length > 0">
          <li class="text-danger" v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
        <form @submit.prevent="saveCliente">
          <div class="form-group m-3">
            <label for="name">Nombre del Autor</label><br />
            <input
              class="form-control"
              v-model="cliente.name"
              type="text"
              id="name"
            />
          </div>
          <div class="form-group m-3">
            <label for="email">Email</label><br />
            <input
              class="form-control"
              v-model="cliente.email"
              type="email"
              id="email"
            />
          </div>
          <div class="form-group m-3">
            <label for="celular">Celular</label><br />
            <input
              class="form-control"
              v-model="cliente.celular"
              type="text"
              id="celular"
            />
          </div>
          <br />
          <div>
            <button type="submit" class="btn btn-success">Registrar</button>
          </div>
        </form>
      </div>
    </div>

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
      clientes: [],
      cliente: {
        name: "",
        email: "",
        celular: "",
      },
      errors: {},
    };
  },
  created() {
    this.getClientes();
  },
  methods: {
    getClientes() {
      this.axios
        .get("http://127.0.0.1:8000/api/cliente")
        .then((response) => {
          console.log(response.data);
          this.clientes = response.data.data;
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