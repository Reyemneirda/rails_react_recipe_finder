
import React from "react";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner'
import { map } from "jquery";

class Recipes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      recipes: [],
      term: '',
      autoCompleteResults: [],
      itemSelected: {},
      showItemSelected: false
    };
  }
  getAutoCompleteResults(e){
    this.setState({
      term: e.target.value,
      loading:true
    }, () => {
      const url = "/api/v0/recipes/search?q=" + this.state.term;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ autoCompleteResults: response, recipes: response, loading: false  }))
    });
  }

  render() {
    const { recipes, loading } = this.state;
    const rating = (rating) => {
      const n = rating;
      [...Array(n)].map((e, i) => (<i className="fas fa-star text-warning" key={i}>♦</i>))
    }
    const loader = (<div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
    <Loader type="ThreeDots" color="#e4d14" height="100" width="100" /></div>)

    const allRecipes = recipes.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          {recipe.image ? <img
              src={recipe.image}
              className="card-img-top"
              alt={`${recipe.name} image`}
            /> : "" }
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            
            
            <ul>
              {recipe.tags.map((number, index) =>
                <li key={index}>{number}</li>
              )}
            </ul>

            <Link to={`/recipe/${recipe.id}`} className="btn btn-success">
              Voir
            </Link>
          </div>
        </div>
      </div>
    ));
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          Pas de recettes à afficher, faites une recherche d'abord
        </h4>
      </div>
    );

    return (
      <>
        <div className="row p-3 bg-light">
          <div className="col-md-6">
            <div className="text-left">
                <Link to="/recipe" className="btn btn-outline-secondary">
                  Nouvelle recette
                </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-right">
                  <Link to="/" className="btn btn-outline-dark">
                  Accueil
                </Link>
            </div>
          </div>
        </div>
        <section className="text-center bg-light">
          <div className="container py-3">
            <h1 className="display-4">Trouvez la recette qui vous correspond</h1>
            <div>
              <input ref={ (input) => { this.searchBar = input } } value={ this.state.term } onChange={ this.getAutoCompleteResults.bind(this) } type='text'placeholder='Search...' />
            </div>
          </div>
        </section>
        <div className="py-5">
          <main className="container">
            <div className="row">
              {loading ? loader : recipes.length > 0 ? allRecipes : noRecipe}
            </div>
            
          </main>
        </div>
      </>
    );
  }
}

export default Recipes;