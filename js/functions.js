import { getSabates } from "./communicatonManagar.js";

const { createApp } = Vue

createApp({
    data() {
        return {
            sabates: [],
            carrito: localStorage.getItem("carrito")!=null?JSON.parse(localStorage.getItem("carrito")):[],
            nCompra: 0,
        }
    },
    methods: {
        afegir(zapato) {
            const index = this.carrito.findIndex(element => element.modelo === zapato.modelo);

            if (index == -1) {
                zapato.cantidad = 1;
                this.carrito.push(zapato);
            } else {
                this.carrito[index].cantidad++;
            }
            localStorage.setItem("carrito", JSON.stringify(this.carrito));

        },
        eliminar(zapato) {
            const index = this.carrito.findIndex(element => element.modelo === zapato.modelo);
            this.carrito[index].cantidad--;
            if (this.carrito[index].cantidad == 0){
                this.carrito.splice(index,1);
            }
            localStorage.setItem("carrito", JSON.stringify(this.carrito));

        },
        checkout(){
            if (this.carrito.length == 0){
                alert("Carrito vacio");
            }else{
                let total = 0;
                for (let index = 0; index < this.carrito.length; index++) {
                    const element = this.carrito[index];
                    total += element.precio * element.cantidad;

                }
                document.getElementById("total").innerHTML += total+"€";

                document.getElementById("btnCheckout").className = "hidden";
                document.getElementById("lista").className ="hidden";
                document.getElementById("carrito").className ="hidden";
                document.getElementById("checkout").className = "";
                localStorage.clear();
            }
        }
    },
    created() {
       
        
        getSabates().then(sabates => {
            this.sabates = sabates;
            console.log(this.sabates);
            console.log("aa");
        })

    }
}).mount("#app")
