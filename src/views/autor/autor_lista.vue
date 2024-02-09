<template>
  <div class="container">
    <h1>Listado de Autores</h1>
    <div class="card m-2">
        <div class="card body">
            <ul v-if="errors.length > 0">
        <li class="text-danger" v-for="error in errors" :key="error.id">
         {{ error }}
        </li>
    </ul>
    <form @submit.prevent="saveAutor">
      <div class="form-group m-3">
        <label for="name">Nombre del Autor</label><br />
        <input class="form-control" v-model="autor.name" type="text" id="name" />
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
              <th scope="col">Autor</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in autores" :key="row.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                {{ row.name }}
              </td>
              <td>
                <router-link
                  :to="{ name: 'autor_detalle', params: { id: row.id } }"
                  ><button class="btn btn-warning btn-sm mx-1">Ver autor</button></router-link
                >
                <router-link
                  :to="{ name: 'autor_edit', params: { id: row.id } }"
                >
                <button class="btn btn-primary btn-sm mx-1">Editar</button>
                  
                </router-link>
                <button
                  @click="deleteAutor(row.id)"
                  class="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
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
      autores: [],
      autor: {
        name: "",
      },
      errors:{}
    };
  },
  created() {
    this.getAutores();
  },
  methods: {
    getAutores() {
      this.axios
        .get("http://127.0.0.1:8000/api/autor")
        .then((response) => {
          console.log(response.data);
          this.autores = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveAutor() {
      //alert('jola')
      this.axios
        .post("http://127.0.0.1:8000/api/autor-registro", this.autor)
        .then((response) => {
          console.log(response.data);

          this.autores.push(response.data);
          this.autor = {
            name: "",
          };

          this.errors = [];
        })
        .catch((error) => {
          console.log(error);
          this.errors = Object.values(error.response.data.errors).flat();
         
        });
    },
    deleteAutor(id) {
      //alert(id);
      this.axios
        .get("http://127.0.0.1:8000/api/autor-eliminar/" + id)
        .then(() => {
          this.autores = this.autores.filter((autor) => autor.id != id);
        })
        .catch((error) => {
          console.log(error);
          
        });
    },
  },
};
</script>

<style>
</style>