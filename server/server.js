import { Hasher } from "../utils/utils.js";

export default class ExpressServer {
  //apiRouter: ApiRouter = Container.get(ApiRouter);

  constructor() {
    /*   const root = path.normalize(__dirname + "/../..");
    app.set("appPath", root + "client");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
    app.use(fileUpload(fileUploadConfig)); */
  }

  async init() {
    //connection DB
    const oldDateObj = new Date();

    console.log("oldDateObj", oldDateObj);

    const nowDateObj = Date.now();

    console.log("nowDateObj", nowDateObj);

    let newDateObj = new Date(oldDateObj.getTime() + 5 * 60000);

    console.log("newDateObj", newDateObj);

    console.log("TOKEN ?", Hasher.token());
  }

  /* async configurePassport(): Promise<void> {
		await passportConfigureStrategy();
		app.use(passport.initialize());
	}

	async router(): Promise<void> {
		const routes = (app: Application): void => {
			app.use('/api/v1', this.apiRouter.router);
		};
		await swaggerify(app, routes);
	}
 */
  /*   listen(p = env.PORT) {
    const welcome = (port) => () =>
      logger.info(
        `up and running in ${
          process.env._NODE_ENV || "development"
        } @: ${os.hostname()} on port: ${port}}`
      );
    http.createServer(app).listen(p, welcome(p));
    return app;
  } */
}
