const candidates = require("../models/black-candidates");
const candidatesModel = require("../models/black-candidates");

const allCandidates = (req, res) => {
  candidatesModel.find((err, candidatesList) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }
    res.status(200).send(candidatesList);
  });
};

const candidatesById = (req, res) => {
  const id = req.params.id;
  candidatesModel.findById(id, (err, candidate) => {
    if (err) {
      res.status(424).send({ message: err.message });
    } else if (candidate) {
      return res.status(200).send(candidate);
    }
    res.status(404).send("Candidate not found!");
  });
};

const candidatesByCity = (req, res) => {
  const city = req.params.cidade;
  candidates.findByCity(city, (err, candidatesRMRList) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    } else if (candidatesRMRList) {
      return res.status(200).send({
        nome: nomeSocial,
        movimento: movimentoSocial,
        candidatura: tipoCandidatura,
        partido: partido,
      });
    }
    res.status(404).send("City not found!");
  });
};

const createCandidate = (req, res) => {
  const newCandidate = new candidatesModel(req.body);
  newCandidate.save((err) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }
    res.status(201).send({
      message: "Successfully registered!",
      candidate: newCandidate,
    });
  });
};

const updateRegistration = (req, res) => {
  const id = req.params.id;
  const updateCandidate = req.body;

  candidatesModel.findByIdAndUpdate(id, updateCandidate, (err, candidate) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    } else if (candidate) {
      return res.status(200).send("Updated successfully!");
    }
    res.status(404).send("Register not found!");
  });
};

const removeCandidateByEmptyPopularMovement = (req, res) => {
  const params = req.query;
  candidatesModel.deleteMany(params, (err, popularMovement) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    } else if (popularMovement) {
      return res.status(200).send("Successfully removed!");
    }
    res.status(404).send("Register not found!");
  });
};

module.exports = {
  allCandidates,
  candidatesById,
  candidatesByCity,
  createCandidate,
  updateRegistration,
  removeCandidateByEmptyPopularMovement,
};
