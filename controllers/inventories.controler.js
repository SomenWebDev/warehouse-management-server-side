let inventories = [
  { id: 1, name: "Yamaha" },
  { id: 2, name: "Yamaha2" },
  { id: 3, name: "Yamaha3" },
];
module.exports.getInventories = (req, res, next) => {
  const { limit, page } = req.query;
  console.log(limit, page);
  res.json(inventories);
};

module.exports.saveInventory = (req, res) => {
  inventories.push(req.body);

  res.send(inventories);
};

module.exports.getInventoryDetail = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const foundInventory = inventories.find(
    (inventory) => inventory.id === Number(id)
  );
  res.status(200).send({
    success: true,
    messages: "Success",
    data: foundTool,
  });
};

module.exports.updateInventory = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const newData = inventories.find((inventory) => inventory.id === Number(id));
  newData.id = id;
  newData.name = req.body.name;
  res.send(newData);
};

module.exports.deleteInventory = (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  inventories = inventories.filter((inventory) => inventory.id !== Number(id));
  res.send(inventories);
};
