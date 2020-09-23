import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: {ingredients:"", tags:""}, similar: []};
  } 

  getSimilarRecipes(){
    this.setState({}, () => {
      const url = "/api/v0/recipes/search?limit=4&t=" + this.state.recipe.tags;
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ similar: response }))
    });
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v0/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        this.setState({ recipe: response }) 
        this.getSimilarRecipes()
      })
      .catch((e) => {
          this.props.history.push("/recipes")
        });
      
  }
  
  render() {
    const { recipe, similar } = this.state;
    let ingredientList = "Pas d'ingrédients fournis";
    let tagList = "Pas de mots clés"
    let colors = ["primary", "secondary", "success", "danger", "warning", "info", "light","dark"]

    if (recipe.tags.length > 0) {
        tagList = recipe.tags
          .map((tag, index) => (
            <span key={index} className={`badge badge-pill badge-${colors[index]}`}>{tag}</span>
          ));
      }
  
    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const similarRecipe = similar.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-3">
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


    return (
      <div className="">
        <div  style={{ backgroundImage: `url(${recipe.image})`, backgroundSize:"cover" }} className="position-relative d-flex align-items-center justify-content-center p-5">
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="row">
            <div className="col-6 text-center">
                Recette de: {recipe.author}
            </div>  
            <div className="col-6">
                {tagList}
            </div>
        </div>

        <div className="container py-5">
            <div className="row">
                <div className="col-sm-12 col-lg-2">
                    <Link to="/recipes" className="btn btn-primary">
                        Retour a l'index
                    </Link> 
                </div>
                <div className="col-sm-12 col-lg-4">
                    <h5 className="mb-2">Infos</h5>
                    <div className="row">
                        <div className="col-sm-6">
                            <b>Note :</b> {recipe.rate}/10
                        </div>
                        <div className="col-sm-6">
                            <b>Difficulté :</b> {recipe.difficulty}
                        </div>
                        <div className="col-sm-6">
                            <b>Prix :</b> {recipe.budget}
                        </div>
                        <div className="col-sm-6">
                            <b>Pour :</b> {recipe.people_quantity} {recipe.people_quantity > 1 ? "personnes" : "personne"}
                        </div>
                    </div>
                    <table className="table table-striped my-2">
                        <thead>
                            <tr>
                            <th scope="col">Temps de préparation</th>
                            <th scope="col">Temps de cuisson</th>
                            <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{recipe.prep_time}</td>
                                <td>{recipe.cook_time}</td>
                                <td>{recipe.total_time}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-12 col-lg-4">
                    <ul className="list-group">
                        <h5 className="mb-2">Ingredients</h5>
                        {ingredientList}
                    </ul>
                </div>
                <div className="col-sm-12 col-lg-2">
                    <button type="button" className="btn btn-danger">
                        Suprimer
                    </button>
                </div>
            </div>
            <div className="row">
              <h1>Recettes similaires</h1>
              <div className="row">
                {similarRecipe}
              </div>

            </div>
        </div>
      </div>
    );
  }

}

export default Recipe;