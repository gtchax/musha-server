import {RequestHandler} from 'express'
import User from '../models/user'

export const signup: RequestHandler = async (req, res) => {

    const { password, email } = req.body;
    const user = await User.findOne({
        email,
      });
      if (!user) return res.status(403).json({ error: "Email/Password mismatch" });
    
      const matched = await user.comparePassword(password);
      if (!matched)
        return res.status(403).json({ error: "Email/Password mismatch" });
    

}