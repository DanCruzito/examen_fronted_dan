<template>
  <div class="container">
    <h1>Listado de Libros</h1>
    <div class="card m-2">
      <div class="card body">
        <ul v-if="errors.length > 0">
          <li class="text-danger" v-for="error in errors" :key="error.id">
            {{ error }}
          </li>
        </ul>
        <form @submit.prevent="saveLibro">
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
                  v-model="libro.descripcion"
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
              <th scope="col">Titulo</th>
              <th scope="col">Lote</th>
              <th scope="col">Descripción</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in libros" :key="row.id">
              <th scope="row">{{ row.id }}</th>
              <td>
                {{ row.titulo }}
              </td>
              <td>
                {{ row.lote }}
              </td>
              <td>{{row.description }}</td>
              <td>
                <router-link
                  :to="{ name: 'libro_detalle', params: { id: row.id } }"
                  ><button class="btn btn-warning btn-sm mx-1">
                    Ver libro
                  </button></router-link
                >
                <router-link
                  :to="{ name: 'libro_edit', params: { id: row.id } }"
                >
                  <button class="btn btn-primary btn-sm mx-1">Editar</button>
                </router-link>
                <button
                  @click="deleteLibro(row.id)"
                  class="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      juj
      {{ page }}
      <div class="justify-content-center">
        <ul class="pagination justify-content-center">
    <li v-for="pag_link in pagination_link" :key="pag_link.label" 
    class="page-item"
    :class="{
            'disabled' : pag_link.url == null,
            'active' : pag_link.active 
        }"
    >
        <a class="page-link"
        href="#"
        @click="changePage(pag_link.url)"
         v-html="pag_link.label" style="cursor: pointer;"></a></li>
    <!--<li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
    -->
  </ul>
      </div>
    </div>
    <nav aria-label="Page navigation example">
  
</nav>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      libros: [],
      autores: [],
      libro: {
        titulo: "",
        lote: "",
        descripcion: "",
        autor_id: "",
      },
      errors: {},
      pagination_link: []
    };
  },
  created() {
    this.getLibros();
    this.getAutores();
  },
  computed:{
   page(){
    return this.$route.query.page ?? 1;
   }
  },
  watch:{
    page(){
          this.getLibros();  
    }
  },
  methods: {
    getLibros() {
      this.axios
        .get("http://127.0.0.1:8000/api/libro?per_page=10" + '&page=' + this.page)
        .then((response) => {
          console.log(response.data.data);
          let res = response.data;
          this.libros = res.data;
          this.pagination_link = res.links;
        })
        .catch((error) => {
          console.log(error);
        });
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
    saveLibro() {
      //alert('jola')
      this.axios
        .post("http://127.0.0.1:8000/api/libro-registro", this.libro)
        .then((response) => {
          //console.log(this.libros);
          
          this.libros.push(response.data);
          
          this.libro = {
            titulo: "",
            lote: "",
            descripcion: "",
            autor_id: "" 
          };

          this.errors = [];
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
          this.errors = Object.values(error.response.data.errors).flat();
        });
    },
    deleteLibro(id) {
      //alert(id);
      this.axios
        .get("http://127.0.0.1:8000/api/libro-eliminar/" + id)
        .then(() => {
          this.libros = this.libros.filter((libro) => libro.id != id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changePage(url){
        //alert(url.split('page=')[1]);
       this.$router.replace({
        query:{
            page: url.split('page=')[1]
        }
       });
    }
  },
};
</script>
  
  <style>
</style>