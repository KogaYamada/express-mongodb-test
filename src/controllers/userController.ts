// controllerはModelとリクエストを仲介します。
import express from 'express';
import User from '../Models/user';

export default {
  // ユーザーを一人返す
  show: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const username: string = req.params.username;
      const user = await User.findOne().findByUserName(username);
      res.status(200).json({ user });
    } catch (e) {
      next(e);
    }
  }, // ユーザーを作成する
  create: async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json({ user });
    } catch (e) {
      next(e);
    }
  },
};
