import React from "react";
import { Link } from "react-router-dom";

export default () => (
    <div className="container vh-100 text-success d-flex align-items-center justify-content-center">
        <div className="card vw-10 vh-50">
            <div className="card-body">
                <h2 className="card-title text-danger">SOS-Recette</h2>
                <h6 className="card-subtitle mb-2 text-muted">Besoin d'une idée pour un repas ? Vous êtes au bon endroit</h6>
                <hr/>
                <Link
                    to="/recipes"
                    className="btn btn-lg btn-success"
                    role="button"
                    >
                    Voir les recettes
                </Link>            
            </div>
        </div>
    </div>

);