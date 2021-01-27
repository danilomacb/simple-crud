package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func remove(w http.ResponseWriter, r *http.Request) {
	headers(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	idPrimitive, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error on remove, fail to transform id on primitive:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	filter := bson.M{"_id": idPrimitive}

	res, err := collection.DeleteOne(ctx, filter)
	if err != nil {
		log.Println("Error on remove, fail to remove one:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	if res.DeletedCount == 0 {
		log.Println("Error on remove, no tasks were removed")
	}
}
