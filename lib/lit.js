import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient({
    litNetwork: 'cayenne',
})
  
class Lit {
    async connect() {
      await client.connect()
      this.litNodeClient = client
    }
}
  export default new Lit()