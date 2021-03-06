import _ from "underscore";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import iotClient from "../../lib/iotClient";

const _validateCredentialsFields = credentials =>
  !_.isUndefined(credentials.username) && !_.isUndefined(credentials.password);

const getToken = async (req, res) => {
  const credentials = req.body;
  if (_validateCredentialsFields(credentials)) {
    try {
      await iotClient.authService.checkAuth(credentials);
      const token = jwt.sign({ username: credentials.username }, process.env.JWT_SECRET);
      res.status(httpStatus.OK).json({ token });
    } catch (err) {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  } else {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }
};

export default { getToken };
