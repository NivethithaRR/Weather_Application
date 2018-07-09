let controller = require("./controller.js");
const router = require("express").Router();

router.get("/:city", (req, res) => {
  try {
    controller.getWeather(
      req.params.city,
      result => {
        res.status(200).send(result);
      },
      err => {
        res.status(500).json({
          errorResponse: err,
          error: "Retrieving weather(s) failed"
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
