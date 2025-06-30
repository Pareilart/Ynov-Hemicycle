const mongoose = require("mongoose");

const deputeSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    prenom: {
      type: String,
      required: true,
    },
    parti: {
      type: String,
      required: true,
    },
    circonscription: {
      type: String,
      required: true,
    },
    dateNaissance: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    mandats: [
      {
        debut: Date,
        fin: Date,
        type: String,
      },
    ],
    contact: {
      email: String,
      telephone: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Depute", deputeSchema);
