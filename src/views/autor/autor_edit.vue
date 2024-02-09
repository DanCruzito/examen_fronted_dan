<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h5>Editar Autor</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateAutor">
          <div class="form-group">
            <label for="name">Nombre del Autor</label><br />
            <input
              class="form-control"
              v-model="autor.name"
              type="text"
              id="name"
            />
          </div>
          <br />
          <div>
            <button type="submit" class="btn btn-success">Registrar</button>
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
      autor: {},
    };
  },
  created() {
    this.getAutor();
  },
  methods: {
    getAutor(){
        this.axios.get('http://127.0.0.1:8000/api/autor/'+this.$route.params.id)
          .then(response =>{
            console.log(response.data);
               this.autor = response.data
          })
          .catch(error => {
            console.log(error);
          })
    },
    updateAutor() {
      this.axios
        .put("http://127.0.0.1:8000/api/autor-edit/" + this.$route.params.id,this.autor)
        .then((response) => {
          console.log(response.data);
          this.$router.push({name: 'autor_detalle',params:{id: this.$route.params.id}});
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