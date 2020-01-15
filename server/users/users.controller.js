const userService = require("./user.service");
const User = require("../models/User_model");
function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Email or Password is incorrect" })
    )
    .catch(err => next(err));
}

async function getAll(req, res, next) {
  try {
    const user = await User.find();
    return res.json(user);
  } catch (e) {
    return next(e);
  }
}

async function create(req, res) {
  let user = await User.findOne({ email: req.body.email });
  
  if (user) {
    let returnData = {};
    returnData.status = 0;
     returnData.msg = "User already exists!";
     return res.status(200).json(returnData);
    // return res.json({msg: "That user already exisits!"});
  } else {
    user = new User({ email: req.body.email, password: req.body.password });
    user
      .save()
      .then(user => {
        res.status(200).json({
          msg: "User added successfully",
          status: 1
        });
      })
      .catch(err => {
        res.status(200).send({
          msg: "Adding new user failed",
          status: 0
        });
      });
  }
}
async function remove(req, res) {
  if (req.body.id) {
    let user = await User.deleteOne({ _id: req.body.id });
    console.log(user);
    return res.json(user);
  } else {
    console.log("User id is not comming from front end");
  }
}

function edit(req, res) {
    
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
}

async function update(req, res) {
  // check validation here
  const emailValid = req.body.email.match(
    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
  );
  if (!req.body.password) {
    let returnData = {};
    returnData.status = 6;
   
    return res.json(returnData);
  }
  if (!req.body.email) {
    let returnData = {};
    returnData.status = 4;
    return res.json(returnData);
  }
  let user = await User.findOne({ email: req.body.email, _id: { $ne: req.params.id  } });
  if(user) {
    let returnData = {};
    returnData.status = 0;
    returnData.msg = 'Email already exists'
    return res.json(returnData);
  }
  else if (emailValid) {
    User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      (error, data) => {
        if (error) {
          let returnData = {};
          returnData.status = 9;
          return res.json(returnData);
        } else {
          let returnData = {};
          returnData.status = 1;
          returnData.msg ='Sucessfully Updated'
          return res.json(returnData);
        }
      }
    );
  } else {
    let returnData = {};
    returnData.status = 3;
  
    return res.json(returnData);
  }

}

module.exports = {
  authenticate,
  getAll,
  create,
  remove,
  edit,
  update
};
