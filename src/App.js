import React from 'react';
import './App.css';
import image1 from './search-icon.png'
import image2 from './cocktail-logo.jpg'
import { useState } from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function App() {
  const [timeoutid,settimeoutid]=useState( );
  const[recipeList,setrecipeList]=useState([]);
 const[details,setDetails]=useState([ ])
const[open1,setOpen1]=useState(false);
const[open2,setOpen2]=useState(false);
  const fetchRecipe=async(searchstring)=>{
   const response=await axios.get(`https://thecocktaildb.com/api/json/v1/1/filter.php?i=${searchstring}`)
    // console.log("Response", response)
    setrecipeList(response.data.drinks);
  }
const fetchIngredients=async(id)=>{
 const res=await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
console.log(res);
setDetails(res.data.drinks);
setOpen1(true);

}
const arrayLength = recipeList ? recipeList.length : 0;
const textChange=(event)=>{
    clearTimeout(timeoutid);
    const timeout=setTimeout(()=>fetchRecipe(event.target.value),500);
    settimeoutid(timeout);
  }
 
const fetchInstructions=async(id)=>{
  const res=await axios.get(`https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  console.log(res);
  setDetails(res.data.drinks);
  setOpen2(true);
}
  return (
    <>
  <Dialog open={open1}>
  <DialogTitle>INGREDIENTS</DialogTitle>
    <DialogContent>
  {details.map((ingre)=>
  <p>{ingre.strIngredient1}<br/>{ingre.strIngredient2}<br/>{ingre.strIngredient3}<br/>{ingre.strIngredient4}</p>)}
   </DialogContent>
   <DialogActions>
    <button onClick={() => setOpen1("")}>Close</button>
  </DialogActions>
</Dialog>
<Dialog open={open2}>
<DialogTitle>INSTRUCTIONS</DialogTitle>
  <DialogContent>
{details.map((instr)=>
  <p>{instr.strInstructions}</p>)}
  </DialogContent>
  <DialogActions>
    <button onClick={() => setOpen2("")}>Close</button>
  </DialogActions>
</Dialog>
    <div className='container'>
      <div>
      <div className='header'>
        <div className='appName'>
          <img className='image2' src={image2} alt="logo"/>
            Cocktail Recipe Finder
         </div>
         <div className='search'>
          <img className="image1" src={image1} alt="search"/>
          <input className='search-bar' onChange={textChange} placeholder='Search Your Cocktail Recipe' />
         </div>
      </div>
      </div>
      <div>
      <div className='recipeList'>
        {arrayLength>0 ?( recipeList.map((recipeObject)=>(
        <div recipeobject={recipeObject} key={recipeObject.idDrink} className='recipe'>
          <img className='cover' src={recipeObject.strDrinkThumb} alt="picture1" />
          <span className='recipeName'>{recipeObject.strDrink}</span>
              <span className='ingredient' onClick={()=>fetchIngredients(recipeObject.idDrink)} >Ingredient</span>
              <span className='instruction' onClick={()=>fetchInstructions(recipeObject.idDrink)}>instructions</span>
        </div>
        ))
        ):(
          <div>No recipes found</div>
        )}
       </div>
      </div> 
    </div>
    </>
  );
}

export default App;
