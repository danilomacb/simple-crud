package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func add(w http.ResponseWriter, r *http.Request) {
	headers(&w, r)
	if (*r).Method == "OPTIONS" {
		return
	}

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println("Error on add, fail to read request body:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	var element element
	element.ID = primitive.NewObjectID()

	err2 := json.Unmarshal(reqBody, &element)
	if err2 != nil {
		log.Println("Error on add, fail to convert json to element:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}

	_, err3 := collection.InsertOne(ctx, element)
	if err3 != nil {
		log.Println("Error on add, fail to insert one:", err)
		w.WriteHeader(http.StatusInternalServerError)
	}
}
