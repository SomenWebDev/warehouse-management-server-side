module.exports.getInventories = (req, res, next) => {
  res.send("inventory found");
};

module.exports.saveInventory = (req, res) => {
  res.send("inventory added");
};

module.exports.getInventoryDetail = (req, res) => {
  res.send("Inventory detail found");
};
