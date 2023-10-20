export async function  getSabates() {
    console.log("./data.json");
    const response = await fetch("./js/data.json");
    const peliculas = await response.json();
    return peliculas.zapatos_nike;
}