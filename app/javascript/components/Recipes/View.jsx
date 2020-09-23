import React from "react";
import { Link } from "react-router-dom";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: {ingredients:"", tags:""}};
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
      .then(response => this.setState({ recipe: response }))
      .catch((e) => {
          console.log(JSON.stringify(e));
        //   this.props.history.push("/recipes")
        });
  }

  render() {
    const { recipe } = this.state;
    let ingredientList = "Pas d'ingrédients fournis";
    let tagList = "Pas de mots clés"
    let colors = ["primary", "secondary", "success", "danger", "warning", "info", "light","dark"]
    console.log(recipe);
    // if (recipe.tags.length > 0 ) {
    //     tagList = recipe.tags.map((tag, i)=>{
    //         <span key={i} className={`badge badge-pill badge-${colors[i]}`}>{tag}</span>     
    //     });
    // }
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
          
        </div>
      </div>
    );
  }

}

export default Recipe;