const express = require("express");

const router = express.Router();

// willl work with /api/hubs
const Hubs = require("./hubs-model");

router.get("/", (req, res) => {
  console.log("Query", req.query);
  Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hubs"
      });
    });
});

router.get("/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "Hub not found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub"
      });
    });
});

router.post("", (req, res) => {
  Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub"
      });
    });
});

router.delete("/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub"
      });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub"
      });
    });
});

router.get("/:id/messages", (req, res) => {
  const { id } = req.params;
  Hubs.findHubMessages()
    .then(results => {
      if (id) {
        res.status(200).json({
          results
        });
      } else {
        res.status(404).json({
          error: "Not Hub Found"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.post("/:id/messages", async (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };

  try {
    const savedMessage = await Hubs.addMessage(messageInfo);
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
