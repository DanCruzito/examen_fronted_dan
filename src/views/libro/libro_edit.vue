<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h5>Editar Libro</h5>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateLibro">
            <div class="row">
            <div class="col-md-6">
              <div class="form-group m-3">
                <label for="titulo">Titulo</label>
                <input
                  class="form-control"
                  v-model="libro.titulo"
                  type="text"
                  id="titulo"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group m-3">
                <label for="lote">Lote</label><br />
                <input
                  class="form-control"
                  v-model="libro.lote"
                  type="text"
                  id="lote"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group m-3">
                <label for="descripcion">Descripción</label><br />
                <input
                  class="form-control"
                  v-model="libro.description"
                  type="text"
                  id="descripcion"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group m-3">
                <label for="autor_id">Autor</label><br />
                <select class="form-control" v-model="libro.autor_id" id="autor_id">
                    <option value="" selected disabled>Seleccione una opción</option>
                  <option v-for="row in autores" :key="row.id" :value="row.id">
                    {{ row.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div>
            <button type="submit" class="btn btn-success">Actualizar</button>
          </div>
        </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        libro: {},
        autores: [],
      };
    },
    created() {
      this.getLibro();
      this.getAutores();
    },
    methods: {
      getLibro(){
          this.axios.get('http://127.0.0.1:8000/api/libro/'+this.$route.params.id)
            .then(response =>{
              console.log(response.data);
                 this.libro = response.data
            })
            .catch(error => {
              console.log(error);
            })
      },
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
      updateLibro() {
        this.axios
          .put("http://127.0.0.1:8000/api/libro-edit/" + this.$route.params.id,this.libro)
          .then((response) => {
            console.log(response.data);
            this.$router.push({name: 'libro_detalle',params:{id: this.$route.params.id}});
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