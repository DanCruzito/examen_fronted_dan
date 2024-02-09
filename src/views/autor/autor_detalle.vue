<template>
    <h1>AUTOR: {{ autor.name }}</h1>
   <!-- <h5>{{ $route.params.id }}</h5>-->
   <h2 style="color: red;">LISTA DE LIBROS DEL AUTOR</h2>
   <ul>
        <li v-for="row in autor.libros" :key="row.id">
            
                {{ row.titulo }}
           
        </li>
    </ul>
 </template>
 <script>
 export default {
   data(){
    return {
        autor: {}
    }
   },created(){
    this.getAutor();
   },
   methods:{
    getAutor(){
        this.axios.get('http://127.0.0.1:8000/api/autor/'+this.$route.params.id)
          .then(response =>{
            console.log(response.data);
               this.autor = response.data
          })
          .catch(error => {
            console.log(error);
          })
    }
   }
 };
 </script>
 <style>
 </style>