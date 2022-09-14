import jwt from "jsonwebtoken";
import { authType } from '../../../../types/sharedTypes';
const bcrypt = require('bcryptjs');
const User = require('../../auth/routes/models/User');

export const authMiddleware = async (req: any, res: any, next: any) => {
  console.log('Hello from authMiddleware');

  try {
    const authDetails: authType = req.body.auth;
    const { email, password, userId, token } = authDetails;
    console.log('authDetails: ', authDetails);
    const user = await User.findOne({ email });
    const isLoggedIn = await bcrypt.compare(password, user.password);
    
    const isAdmin = await (async () => {
      const adminUser = await User.findOne({ email: 'admin@gmail.com' });
      console.log('adminUser: ', adminUser);
      const isMatch = await bcrypt.compare(password, adminUser.password);
      console.log('password: ', password);

      if (isMatch) {
        return true;
      }
      
      return false;
    })();

    // const isAdmin = checkIfIsAdmin();

    const auth = {
      isLoggedIn,
      isAdmin,
    };

    console.log('auth: ', auth);

    // const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // const userId = decodedToken.userId;
    // if (req.body.userId && req.body.userId !== userId) {
    //   throw 'Invalid user ID';
    // }
    next(req, res, auth);
  } catch {
    // res.status(401).json({
    //   error: new Error('Invalid request!')
    // });
  }
};

// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };