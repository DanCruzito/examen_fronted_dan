<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h1>TITULO: {{ libro.titulo }}</h1>
        <h1>LOTE: {{ libro.lote }}</h1>
        <h1>DESCRIPCIÓN: {{ libro.description }}</h1>
        <!-- <h5>{{ $route.params.id }}</h5>-->
        <h2 style="color: red">AUTOR: {{ autor.name }}</h2>
      </div>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      libro: {},
      autor: {},
    };
  },
  created() {
    this.getLibro();
  },
  methods: {
    getLibro() {
      this.axios
        .get("http://127.0.0.1:8000/api/libro/" + this.$route.params.id)
        .then((response) => {
          console.log(response.data.autor.name);
          this.libro = response.data;
          this.autor = response.data.autor;
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