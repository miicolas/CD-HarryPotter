let lastVisited = "Serpentard";

const getLastVisited = (req, res) => {
  return res.json({ lastVisited: lastVisited });
};

const updateLastVisited = (req, res) => {
  lastVisited = req.body.lastVisited;
  return res.json({ lastVisited: lastVisited });
};

export { getLastVisited, updateLastVisited };
