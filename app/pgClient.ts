import {Client, Pool} from "pg";

class PGClient {
  private static instance: PGClient;
  private static client: Client;
  private static pool: Pool;

  private constructor(isPool:boolean = false){
    if(isPool){
      console.log("Creating pool");
      
      PGClient.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 15000,
        connectionTimeoutMillis: 3000
      });
      this.connectPool();
    }else{
      PGClient.client = new Client({connectionString : process.env.DATABASE_URL})
      this.connect();
    }


  }

  private async connect(){
    console.log("[Server]: Connecting to the DATABASE");
    await PGClient.client.connect();
    PGClient.client.on("error",(err)=>{
      console.error("[Server]: Something has happend when trying to connect to the database!",err.stack)
    })
  }

  private async connectPool(){
    console.log("[Server]: Connecting to the DATABASE");
    await PGClient.pool.connect();
    PGClient.pool.on("error",(err)=>{
      console.error("[Server]: Something has happend when trying to connect to the database!",err.stack)
    })
  }

   async end(){
    console.log("[Server]: Closing connection.");
    await PGClient.client.end();
  }

  public static getInstance(){
    if(!PGClient.client){
      PGClient.instance = new PGClient();
    }

      return PGClient.client;
  }

  public static getInstancePool(){
    if(!PGClient.pool){
      PGClient.instance = new PGClient(true);
    }

      return PGClient.pool;
  }

}

export default PGClient;

