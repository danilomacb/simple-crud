package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func update(w http.ResponseWriter, r *http.Request) {
	headers(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	vars := mux.Vars(r)
	id := vars["id"]

	idPrimitive, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		log.Println("Error on update, fail to transform id on primitive:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	var e element

	err2 := json.NewDecoder(r.Body).Decode(&e)
	if err2 != nil {
		log.Println("Error on update, fail to transform body on json:", err2)
		w.WriteHeader(http.StatusInternalServerError)
	}

	filter := bson.M{"_id": idPrimitive}
	update := bson.D{{"$set", bson.D{{"content", e.Content}}}}

	var updatedDocument bson.M
	err3 := collection.FindOneAndUpdate(ctx, filter, update).Decode(&updatedDocument)
	if err3 != nil {
		log.Println("Error on update, failt to find one and update:", err3)
		w.WriteHeader(http.StatusInternalServerError)
	}
}
