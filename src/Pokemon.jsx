import { useState } from "react";
import { useEffect } from "react";
import './index.css';
import { PokemonCards } from "./PokemonCards";
export const Pokemon = () => {

   const [Pokemon , setPokemon] = useState([]);
   const [loading , setLoading] = useState(true);
   const [error , setError] = useState(null);
   const [Search , setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=124"; // only 124 ,  we can say its raw json data 

  const fetchPokemon = async() => {
      
      try{
         const res = await fetch(API);
         const data = await res.json(); // systemetic json data 
        //  console.log(data);

        const detailedPokemonData = data.results.map( async(curPokemon) =>{
           
            const res = await fetch(curPokemon.url);
            const data = await res.json();
            // console.log(data);
             return data;
        });
        // console.log(detailedPokemonData);

        const detailedResponse = await Promise.all(detailedPokemonData);
            console.log(detailedResponse);  
            setPokemon(detailedResponse);
            setLoading(false);
      }
      catch (error){
        console.log(error);
        setLoading(false);
        setError(error);
      }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  // Search Functionality
  const searchData = Pokemon.filter((curPokemon) =>
     curPokemon.name.toLowerCase().includes(Search.toLowerCase())
  ); 

  if(loading){
    return <div>Loading...</div>
  }

  if(error){
    return <div>{error.message}</div> 
  }
  return (
    <>
      <section>
        <header>
          <h1>Let's Catch Pokemon</h1>
            <div className="pokemon-search">
            <input type="text" 
            placeholder="Search Pokemon" 
            value={Search} 
            onChange={(e)=> setSearch(e.target.value)}/>
          </div>
              </header>
            <div>
                <ul className="cards">
                    { searchData.map((curPokemon) =>{
                   return(
                     <PokemonCards key = {curPokemon.id} pokemonData = {curPokemon} />
                   )
                    })}
                </ul>
            </div>
      
      </section>
    </>
  );
};
